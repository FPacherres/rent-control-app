import React, { useState, useEffect } from 'react'
import { SafeAreaView, SectionList, StyleSheet, Alert } from 'react-native'
import Constants from 'expo-constants'
import CardTenant from '../components/CardTenant'
import Title from '../components/Title'

import app from '../firebase'
import { getFirestore, collection, getDocs, setDoc, doc } from 'firebase/firestore'

import colors from '../res/colors'

// const typeUser = 'SuperAdmi'
const typeUser = 'Admi'

export default function Payments() {
    const [data, setData] = useState([
        {
            title: 'Pagos',
            data: []
        }
    ])

    const [currentUser, setCurrentUser] = useState({})

    const [state, setState] = useState({
        name: '',
        dni: '',
        phone: '',
        email: '',
        password: '',
        number: '',
        apartament: '',
        key: null,
        debet: false,
        forgotPassword: false,
        typeUser: "Normal"
    })
    
    const userEdit = async (id) => {
        const user = data[0].data.find(d=> d.id === id)
        setCurrentUser({...user, debet: false})
        await updateUser()
    }

    const db = getFirestore(app)

    const getUsers = async () => {
        try {
            const users = await getDocs(collection(db, "users"));
            setData([
                {
                    title: 'Pagos',
                    data: users.docs.map(doc => {
                        let obj = doc.data()
                        const key = doc._document.key.path.segments[6]
                        return {...obj, key: key}
                    })
                }
            ]);
        } catch (error) {
            console.log(error);
            Alert.alert(error.message);
        }
    }

    async function updateUser() {
        try {
            await setDoc(doc(db, "users", `${currentUser.key}`), currentUser);
            Alert.alert("Usuario actualizado")
            getUsers()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUsers()
        return () => setData([])
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <SectionList
                sections={data}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <CardTenant data={item} view={"payments"} userEdit={userEdit} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Title title={title} />
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        marginTop: Constants.statusBarHeight,
        paddingBottom: 50,
        marginTop: 0,
        paddingTop: 20,
        backgroundColor: colors.primary
    }
})
