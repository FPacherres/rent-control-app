import React, {useState, useEffect} from 'react'
import { StyleSheet, Dimensions, Text, Alert, TouchableHighlight, View, ScrollView, TextInput } from 'react-native'
import Constants from 'expo-constants'
import Title from '../components/Title'


import app from '../firebase'
import { getFirestore, collection, getDoc, setDoc, doc } from 'firebase/firestore'

// import colors from '../res/colors'

let ScreenHeight = Dimensions.get("window").height

import colors from '../res/colors'

export default function Settings() {
    const db = getFirestore(app)
    const KEY = "G7gZkLu8zrQd0Xtl4Al4"
    const [data, setData] = useState({
        name: '',
        dni: '',
        phone: '',
        email: '',
        provincia: '',
        distrito: '',
        totalNumber: 0,
        totalApartament: 0,
        typeUser: "Admi"
    })
    const handleChangeText = (property, value) => {
        setData({ ...data, [property]: value })
    }
    const getUser = async () => {
        try {
            const docRef = doc(collection(db, "superUsers"), KEY);
            const userDoc = await getDoc(docRef);

            if (userDoc.exists()) {
                setData(userDoc.data());
            } else {
                console.log("El documento no existe");
            }
        } catch (error) {
            console.log(error);
            Alert.alert(error.message);
        }
    }
    const updatedUser = async () => {
        try {
            if (validationForm(data)) {
                const docRef = doc(collection(db, "superUsers"), KEY)
                await setDoc(docRef, data)
                Alert.alert("Indormación Actualizada")
            }
        } catch (error) {
            console.log(error);
            Alert.alert(error.message);
        }
    }
    useEffect(() => {
        getUser()
        return () => setData({})
    }, [])

    const validationForm = (obj) => {
        if (obj.password.length < 6) {
            Alert.alert('Falta ingresar la contraseña con mas de 6 caraccteres.')
            return false
        }
        return true
    }

    return (
        <ScrollView style={[styles.container, { paddingHorizontal: 20 }]}>
            <Title title={"Configuración"} noPadX={true} />
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Correo</Text>
                <TextInput style={styles.input} disabled={true} placeholder='Correo' value={data.email} />
            </View>
            <View style={styles.inputGroup}>
                            <Text style={styles.label}>Contraseña</Text>
                            <TextInput style={styles.input} placeholder='Contraseña' value={data.password} onChangeText={(value) => handleChangeText('password', value)} />
                        </View>
            <TouchableHighlight style={styles.saveBtn}
                underlayColor={colors.btn}
                onPress={() => {
                    updatedUser()
                }}>
                <Text style={styles.txtBtn}>Guardar</Text>
            </TouchableHighlight>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        marginTop: 0,
        paddingTop: 20,
        backgroundColor: colors.primary
    },
    title: {
        fontSize: 44,
        textAlign: 'center',
        paddingVertical: 20,
        color: "#FFF"
    },
    inputGroup: {
        marginVertical: 10
    },
    input: {
        backgroundColor: colors.secondary,
        paddingHorizontal: 20,
        paddingVertical: 8,
        marginTop: 10,
        borderRadius: 8,
        fontFamily: 'Light',
        color: "#FFF"
    },
    label: {
        fontFamily: 'Regular',
        color: "#FFF"
    },
    saveBtn: {
        marginTop: 30,
        marginBottom: 50,
        backgroundColor: colors.btn,
        paddingVertical: 15,
        borderRadius: 10
    },
    txtBtn: {
        fontFamily: 'Regular',
        fontSize: 24,
        textAlign: 'center',
        color: "#FFF"
    }
})
