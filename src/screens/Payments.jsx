import React, { useState } from 'react'
import { SafeAreaView, SectionList, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import CardTenant from '../components/CardTenant'
import Title from '../components/Title'

import app from '../firebase'
import { getFirestore, collection, getDocs } from 'firebase/firestore'


// const typeUser = 'SuperAdmi'
const typeUser = 'Admi'

export default function Payments() {
    const [data, setData] = useState([
        {
            title: 'Pagos',
            data: []
        }
    ])

    const db = getFirestore(app)

    const getUsers = async () => {
        try {
            const users = await getDocs(collection(db, "users"));
            setData([
                {
                    title: 'Pagos',
                    data: users.docs.map(doc => doc.data())
                }
            ]);
        } catch (error) {
            console.log(error);
            Alert.alert(error.message);
        }
    }

    // getUsers()

    return (
        <SafeAreaView style={styles.container}>
            <SectionList
                sections={data}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <CardTenant data={item} view={"payments"} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Title title={title} />
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: Constants.statusBarHeight,
        paddingBottom: 50
    }
})
