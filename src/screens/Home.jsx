import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, Text, ScrollView, TouchableHighlight, TextInput, Alert } from 'react-native'
import Constants from 'expo-constants'
import Title from '../components/Title'
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline"

import colors from "../res/colors"

import app from '../firebase'
import { getFirestore, collection, getDoc, getDocs, setDoc, doc } from 'firebase/firestore'


import { useSelector } from 'react-redux';

let ScreenHeight = Dimensions.get("window").height

export default function Home() {

    const typeUser = useSelector(state => state.auth.typeUser)

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
    if (typeUser === 'Admi') {
        const db = getFirestore(app)
        const KEY = "G7gZkLu8zrQd0Xtl4Al4"
        const [data, setData] = useState({
            name: '',
            dni: '',
            phone: '',
            email: '',
            password: '',
            typeUser: "Admi"
        })
        const [showPassword, setShowPassword] = useState(false)
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
        useEffect(() => {
            getUser()
            return () => setData({})
        }, [])
        return (
            <ScrollView style={[styles.container, { paddingHorizontal: 20 }]}>
                <Title title={"Informacion Básica"} noPadX={true} />
                <View style={[styles.inputGroup, styles.textContainer]}>
                    <Text style={styles.label}>Nombre</Text>
                    <Text style={styles.value}>{data.name}</Text>
                </View>
                <View style={[styles.inputGroup, styles.textContainer]}>
                    <Text style={styles.label}>DNI</Text>
                    <Text style={styles.value}>{data.dni}</Text>
                </View>
                <View style={[styles.inputGroup, styles.textContainer]}>
                    <Text style={styles.label}>Telefono</Text>
                    <Text style={styles.value}>{data.phone}</Text>
                </View>
                <View style={[styles.inputGroup, styles.textContainer]}>
                    <Text style={styles.label}>Correo</Text>
                    <Text style={styles.value}>{data.email}</Text>
                </View>
                <View style={[styles.inputGroup, styles.textContainer]}>
                    <Text style={styles.label}>Contraseña</Text>
                    <View style={styles.passwordContainer}>
                        <Text style={styles.value}>{showPassword ? data.password : "*********"}</Text>
                        <TouchableHighlight
                            style={styles.btnPassword}
                            onPress={() => {
                                setShowPassword(!showPassword)
                            }}>
                            {
                                showPassword
                                    ?
                                    <EyeSlashIcon color="#FFFFFF" fill="transparent" size={24} />
                                    :
                                    <EyeIcon color="#FFFFFF" fill="transparent" size={24} />
                            }
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
        )
    }
    if (typeUser === 'Normal') {
        const uid = useSelector(state => state.auth.idUser)
        const [usersStore, setUsersStore] = useState([
            {
                title: 'Inquilinos',
                data: []
            }
        ])

        const db = getFirestore(app)
        const [KEY, setKEY] = useState("")
        const [data, setData] = useState({
            name: '',
            dni: '',
            phone: '',
            email: '',
            password: '',
            number: '',
            apartament: '',
            typeUser: "Normal"
        })
        const getUsers = async () => {
            try {
                const users = await getDocs(collection(db, "users"));
                setUsersStore([
                    {
                        title: 'Inquilinos',
                        data: users.docs.map(doc => {
                            let obj = doc.data()
                            const key = doc._document.key.path.segments[6]
                            return { ...obj, key: key }
                        })
                    }
                ]);
            } catch (error) {
                console.log(error);
                // Alert.alert(error.message);  
            }
        }
        const [showPassword, setShowPassword] = useState(false)
        const getUser = async () => {
            try {
                const docRef = doc(collection(db, "users"), KEY);
                const userDoc = await getDoc(docRef);
                
                if (userDoc.exists()) {
                    setData(userDoc.data());
                } else {
                    console.log("El usuario no existe");
                }
            } catch (error) {
                console.log(error);
                // Alert.alert(error.message);
            }
        }

        async function getKey(){
            setKEY(usersStore[0].data.find(u => u.id === uid).key)
        }

        setTimeout(() => getUsers(), 400)
        setTimeout(() => getKey(), 300)
        setTimeout(() => getUser(), 300)
        // getUsers()
        // getKey()
        // getUser()
        // useEffect(() => {
        //     // getUser()
        //     return () => setData({})
        // }, [])

        return (
            <ScrollView style={[styles.container, { paddingHorizontal: 20 }]}>
                <Title title={"Informacion Básica"} noPadX={true} />
                <View style={[styles.inputGroup, styles.textContainer]}>
                    <Text style={styles.label}>Nombre</Text>
                    <Text style={styles.value}>{data.name}</Text>
                </View>
                <View style={[styles.inputGroup, styles.textContainer]}>
                    <Text style={styles.label}>DNI</Text>
                    <Text style={styles.value}>{data.dni}</Text>
                </View>
                <View style={[styles.inputGroup, styles.textContainer]}>
                    <Text style={styles.label}>Telefono</Text>
                    <Text style={styles.value}>{data.phone}</Text>
                </View>
                <View style={[styles.inputGroup, styles.textContainer]}>
                    <Text style={styles.label}>N° de Piso/N° de Departamento</Text>
                    <Text style={styles.value}>{data.number}/{data.apartament}</Text>
                </View>
                <View style={[styles.inputGroup, styles.textContainer]}>
                    <Text style={styles.label}>Correo</Text>
                    <Text style={styles.value}>{data.email}</Text>
                </View>
                <View style={[styles.inputGroup, styles.textContainer]}>
                    <Text style={styles.label}>Contraseña</Text>
                    <View style={styles.passwordContainer}>
                        <Text style={styles.value}>{showPassword ? data.password : "*********"}</Text>
                        <TouchableHighlight
                            style={styles.btnPassword}
                            onPress={() => {
                                setShowPassword(!showPassword)
                            }}>
                            {
                                showPassword
                                    ?
                                    <EyeSlashIcon color="#FFFFFF" fill="transparent" size={24} />
                                    :
                                    <EyeIcon color="#FFFFFF" fill="transparent" size={24} />
                            }
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={[styles.Container, {backgroundColor: !data.debet ? "#395065" : "#7F2020"}]}>
                    <Text style={styles.Text1}>{!data.debet ? 'Felicidades' : 'Cuidado'}!</Text>
                    <Text style={styles.Text2}>{!data.debet ? 'No tiene deudas' : 'Tiene deudas'}</Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // width: '100%',
        height: ScreenHeight,
        marginTop: Constants.statusBarHeight,
        backgroundColor: colors.primary,
        marginTop: 0,
        paddingTop: 20
    },
    inputGroup: {
        marginVertical: 10,
        borderBottomColor: "#175e8cAA",
        borderBottomWidth: 1
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
        fontFamily: 'Regular',
        color: "#FFF"
    },
    value: {
        fontFamily: 'Medium',
        fontSize: 22,
        textAlign: "right",
        color: "#FFF"
    },
    title: {
        fontSize: 44,
        textAlign: 'center',
        paddingVertical: 20,
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
    },
    textContainer: {
        width: "100%",
        marginBottom: 45,
        paddingBottom: 15
    },
    Container: {
        backgroundColor: "#FF0000",
        paddingVertical: 15,
        marginHorizontal: 20,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        marginBottom: 40
    },
    Text1: {
        fontSize: 24,
        fontFamily: "Medium"
    },
    Text2: {
        fontSize: 28,
        fontFamily: "Regular"
    },
    passwordContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    btnPassword: {
        paddingLeft: 10
    }
})
