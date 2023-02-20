import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, SectionList, StyleSheet, Dimensions, Text, ScrollView, TouchableHighlight, TextInput, Alert } from 'react-native'
import Constants from 'expo-constants'
import InputCustom from '../components/InputCustom'
import TextInfo from '../components/TextInfo'
import MainBtn from '../components/MainBtn'
import Title from '../components/Title'
import MessageStatusTenant from '../components/MessageStatusTenant'


import app from '../firebase'
import { getFirestore, collection, getDoc, setDoc, doc } from 'firebase/firestore'

let ScreenHeight = Dimensions.get("window").height

const typeUser = 'SuperAdmi'
// const typeUser = 'Admi'
// const typeUser = 'Normal'

export default function Home() {
    if (typeUser === 'SuperAdmi') {
        const db = getFirestore(app)
        const KEY = "9c2e16PGBWxfALDhzHN7"
        const [data, setData] = useState({
            name: '',
            ruc: '',
            phone: '',
            departamento: '',
            provincia: '',
            distrito: '',
            totalNumber: 0,
            totalApartament: 0,
            typeUser: "SuperAdmi"
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
            if (obj.ruc.trim().length !== 11) {
                Alert.alert('Falta ingresar el dni con 11 caracteres.')
                return false
            }
            if (obj.phone.trim().length !== 9) {
                Alert.alert('Falta ingresar el número de teléfono con 9 caracteres.')
                return false
            }
            if (obj.departamento.trim() === '') {
                Alert.alert('Falta ingresar el departamento.')
                return false
            }
            if (obj.provincia.trim() === '') {
                Alert.alert('Falta ingresar la provincia.')
                return false
            }
            if (obj.distrito.trim() === '') {
                Alert.alert('Falta ingresar el distrito.')
                return false
            }
            if (obj.totalNumber.trim() === '') {
                Alert.alert('Falta ingresar el n° de pisos.')
                return false
            }
            if (obj.totalApartament.trim() === '') {
                Alert.alert('Falta ingresar el n° de departamento.')
                return false
            }
            return true
        }

        return (
            <ScrollView style={[styles.container, { paddingHorizontal: 20 }]}>
                <Title title={"Informacion Básica"} noPadX={true} />
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nombre</Text>
                    <TextInput style={styles.input} placeholder='Nombre' value={data.name} onChangeText={(value) => handleChangeText('name', value)} />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>RUC</Text>
                    <TextInput style={styles.input} placeholder='Ruc' value={data.ruc} onChangeText={(value) => handleChangeText('ruc', value)} />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Teléfono</Text>
                    <TextInput style={styles.input} placeholder='Telefono' value={data.phone} onChangeText={(value) => handleChangeText('phone', value)} />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Departamento</Text>
                    <TextInput style={styles.input} placeholder='Departamento' value={data.departamento} onChangeText={(value) => handleChangeText('departamento', value)} />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Provincia</Text>
                    <TextInput style={styles.input} placeholder='Provincia' value={data.provincia} onChangeText={(value) => handleChangeText('provincia', value)} />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Distrito</Text>
                    <TextInput style={styles.input} placeholder='Distrito' value={data.distrito} onChangeText={(value) => handleChangeText('distrito', value)} />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>N° de Pisos</Text>
                    <TextInput style={styles.input} placeholder='number' value={data.totalNumber} onChangeText={(value) => handleChangeText('totalNumber', value)} />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>N° de Departamentos</Text>
                    <TextInput style={styles.input} placeholder='Departamento' value={data.totalApartament} onChangeText={(value) => handleChangeText('totalApartament', value)} />
                </View>
                <TouchableHighlight style={styles.saveBtn}
                    onPress={() => {
                        updatedUser()
                    }}>
                    <Text style={styles.txtBtn}>Guardar</Text>
                </TouchableHighlight>
            </ScrollView>
        )
    }
    // if (typeUser === 'Admi') {
    //     const DATA = [
    //         {
    //             title: 'Información Básica',
    //             action: 'Guardar',
    //             data: [
    //                 { id: '0', label: "Nombre", value: "Eduardo Garcia" },
    //                 { id: '1', label: "ruc", value: "87654321" },
    //                 { id: '2', label: "Teléfono", value: "987 654 321" },
    //                 { id: '3', label: "Correo", value: "egarcia@gmail.com" }
    //             ]
    //         }
    //     ]
    //     return (
    //         <SafeAreaView style={styles.container}>
    //             <SectionList
    //                 sections={DATA}
    //                 keyExtractor={(item, index) => item + index}
    //                 renderItem={({ item }) => <TextInfo label={item.label} value={item.value} />}
    //                 renderSectionHeader={({ section: { title } }) => (
    //                     <Title title={title} />
    //                 )}
    //             />
    //         </SafeAreaView>
    //     )
    // }
    // if (typeUser === 'Normal') {
    //     const DATA = [
    //         {
    //             title: 'Información Básica',
    //             action: 'Guardar',
    //             data: [
    //                 { id: '0', label: "Nombre", value: "Eduardo Garcia" },
    //                 { id: '1', label: "ruc", value: "87654321" },
    //                 { id: '2', label: "Teléfono", value: "987 654 321" },
    //                 { id: '3', label: "Correo", value: "egarcia@gmail.com" },
    //                 { id: '4', label: "N° Piso / N° de Dpto", value: "Piso 2 / Dpto 402" }
    //             ],
    //             status: true
    //         }
    //     ]
    //     return (
    //         <SafeAreaView style={styles.container}>
    //             <SectionList
    //                 sections={DATA}
    //                 keyExtractor={(item, index) => item + index}
    //                 renderItem={({ item }) => <TextInfo label={item.label} value={item.value} />}
    //                 renderSectionHeader={({ section: { title } }) => (
    //                     <Title title={title} />
    //                 )}
    //                 renderSectionFooter={({ section: { status } }) => (
    //                     <MessageStatusTenant status={status} />
    //                 )}
    //             />
    //         </SafeAreaView>
    //     )
    // }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // height: ScreenHeight,
        marginTop: Constants.statusBarHeight,
    },
    inputGroup: {
        marginVertical: 10
    },
    input: {
        backgroundColor: "#000000",
        paddingHorizontal: 20,
        paddingVertical: 8,
        marginTop: 10,
        borderRadius: 8,
        fontFamily: 'Light'
    },
    label: {
        fontFamily: 'Regular'
    },
    title: {
        fontSize: 44,
        textAlign: 'center',
        paddingVertical: 20
    },
    saveBtn: {
        marginTop: 30,
        marginBottom: 50,
        backgroundColor: "#295065",
        paddingVertical: 15,
        borderRadius: 10
    },
    txtBtn: {
        fontFamily: 'Regular',
        fontSize: 24,
        textAlign: 'center'
    },
})
