import React, { useState, useEffect } from 'react'
import { ScrollView, TouchableHighlight, Text, View, StyleSheet, TextInput, Alert } from 'react-native'
import Title from '../components/Title'

import colors from '../res/colors'

import app from '../firebase'
import { getFirestore, collection, getDoc, setDoc, doc } from 'firebase/firestore'

export default function Administrator() {
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
            if (validationFormNewUser(data)) {
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

    const validationFormNewUser = (obj) => {
        if (obj.name.trim() === '') {
            Alert.alert('Falta ingresar el nombre.')
            return false
        }
        if (obj.dni.trim().length !== 8) {
            Alert.alert('Falta ingresar el dni con 11 caracteres.')
            return false
        }
        if (obj.phone.trim().length !== 9) {
            Alert.alert('Falta ingresar el número de teléfono con 9 caracteres.')
            return false
        }
        if (obj.password.length < 6) {
            Alert.alert('Falta ingresar la contraseña con mas de 6 caraccteres.')
            return false
        }
        return true
    }

    return (
        <ScrollView style={[styles.container, { paddingHorizontal: 20 }]}>
            <Title title={"Administrador"} noPadX={true} />
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Nombre</Text>
                <TextInput style={styles.input} placeholder='Nombre' value={data.name} onChangeText={(value) => handleChangeText('name', value)} />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>DNI</Text>
                <TextInput style={styles.input} placeholder='DNI' value={data.dni} onChangeText={(value) => handleChangeText('dni', value)} />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Teléfono</Text>
                <TextInput style={styles.input} placeholder='Telefono' value={data.phone} onChangeText={(value) => handleChangeText('phone', value)} />
            </View>
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
        paddingVertical: 20
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
        fontFamily: 'Light'
    },
    label: {
        fontFamily: 'Regular'
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
        textAlign: 'center'
    }
})
