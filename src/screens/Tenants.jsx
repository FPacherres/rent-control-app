import React, { useState, useEffect } from 'react'
import { SafeAreaView, SectionList, StyleSheet, View, Text, Alert, Modal, TouchableHighlight } from 'react-native'
import Constants from 'expo-constants'
import CardTenant from '../components/CardTenant'
import { useFonts } from 'expo-font'
import Title from '../components/Title'
import { ScrollView, TextInput } from 'react-native-gesture-handler'

import colors from '../res/colors'

import app from '../firebase'
import { getFirestore, collection, addDoc, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useSelector } from 'react-redux';

export default function Tenants() {

    const typeUser = useSelector(state => state.auth.typeUser)

    const [data, setData] = useState([
        {
            title: 'Inquilinos',
            data: []
        }
    ])

    const [showModal, setShowModal] = useState(false)
    const [typeAction, setTypeAction] = useState('newUser')
    const [currentKey, setCurrentKey] = useState('')

    const [isDisabled, setIsDisabled] = useState(false);
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
        debet: true,
        forgotPassword: false,
        typeUser: "Normal"
    })

    const auth = getAuth(app)

    const db = getFirestore(app)

    const getUsers = async () => {
        try {
            const users = await getDocs(collection(db, "users"));
            setData([
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
            Alert.alert(error.message);
        }
    }

    getUsers()
    // useEffect(() => {
    //     return () => setData([])
    // }, [])

    const handleChangeText = (property, value) => {
        setState({ ...state, [property]: value })
    }

    const handleChangeTextEdit = (property, value) => {
        setCurrentUser({ ...currentUser, [property]: value })
    }

    const userEdit = (id) => {
        const user = data[0].data.find(d => d.id === id)
        setTypeAction('editUser')
        setCurrentUser(user)
        console.log()
        getUsers()
        setShowModal(true)
    }

    const deleteAccount = async (id) => {
        try {
            const userRef = app.auth().user(id)
            await userRef.delete()
            console.log('Usuario eliminado con ??xito')
        } catch (error) {
            console.log('Error al eliminar el usuario', error)
        }
    }

    const userDelete = async (key) => {
        setCurrentKey(key)
        try {
            const itemRef = doc(collection(db, 'users'), key)
            // await deleteAccount(key)
            await deleteDoc(itemRef)
            Alert.alert("Usuario eliminado.")
            getUsers()
            console.log(`Item with ID ${key} has been deleted`);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    }

    async function updateCurrentUser() {
        try {
            console.log(currentUser)
            await setDoc(doc(db, "users", currentUser.key), {...currentUser, debet: false});
            Alert.alert("Usuario actualizado")
            setShowModal(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleCreateAccount = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, state.email, state.password);
            return userCredential.user.uid;
        } catch (error) {
            console.log(error);
            Alert.alert(error.message)
        }
    }

    const saveNewUser = async () => {
        try {
            if (validationFormNewUser(state)) {
                setIsDisabled(true)
                const userId = await handleCreateAccount()
                const newUser = await addDoc(collection(db, 'users'), {
                    name: state.name,
                    dni: state.dni,
                    phone: state.phone,
                    email: state.email,
                    password: state.password,
                    number: state.number,
                    apartament: state.apartament,
                    typeUser: 'Normal',
                    debet: true,
                    forgotPassword: false,
                    id: userId
                });
                Alert.alert('Inquilino guardado.');
                await getUsers()
                setShowModal(false)
                setIsDisabled(false)
            }
        } catch (error) {
            console.error('Error al guardar el nuevo usuario:', error);
            Alert.alert(error)
        }
    }

    const validationFormNewUser = (obj) => {
        if (obj.name === '') {
            Alert.alert('Falta ingresar el nombre.')
            return false
        }
        if (obj.dni.length !== 8) {
            Alert.alert('Falta ingresar el dni con 8 caracteres.')
            return false
        }
        if (obj.phone.length !== 9) {
            Alert.alert('Falta ingresar el n??mero de tel??fono con 9 caracteres.')
            return false
        }
        if (obj.email === '') {
            Alert.alert('Falta ingresar el correo electr??nico.')
            return false
        }
        if (obj.password.length < 6) {
            Alert.alert('Falta ingresar la contrase??a con mas de 6 caraccteres.')
            return false
        }
        if (obj.number === '') {
            Alert.alert('Falta ingresar el n?? de number.')
            return false
        }
        if (obj.apartament === '') {
            Alert.alert('Falta ingresar el n?? de departamento.')
            return false
        }
        return true
    }

    const [fontsCustom] = useFonts({
        Light: require("../../assets/fonts/Poppins-ExtraLight.ttf"),
        Regular: require("../../assets/fonts/Poppins-Regular.ttf"),
        Medium: require("../../assets/fonts/Poppins-Medium.ttf")
    })
    if (!fontsCustom) return null

    return (
        <SafeAreaView style={styles.container}>
            <SectionList
                sections={data}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <CardTenant data={item} view={"tenants"} userEdit={userEdit} userDelete={userDelete} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Title title={title} />
                )}
            />
            {
                typeUser === 'Admi'
                    ?
                    <TouchableHighlight style={styles.FloatBtn}
                        disabled={isDisabled}
                        underlayColor={colors.btn}
                        onPress={() => {
                            setShowModal(true)
                            setTypeAction('newUser')
                        }}>
                        <Text style={{ fontSize: 48, fontFamily: "Regular", color: "#FFF" }}>+</Text>
                    </TouchableHighlight>
                    :
                    <View></View>
            }
            <Modal
                animationType="slide"
                visible={showModal}
            >
                {typeAction === "newUser"
                    ?
                    <ScrollView style={[styles.container, { paddingHorizontal: 20 }]}>
                        <TouchableHighlight style={styles.btnBack}
                            underlayColor={"tansparent"}
                            onPress={() => {
                                setShowModal(false)
                            }}>
                            <Text style={{ fontSize: 16, fontFamily: "Regular" }}>Regresar</Text>
                        </TouchableHighlight>
                        <Text style={styles.title}>Crear Usuarios</Text>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nombre</Text>
                            <TextInput style={styles.input} placeholder='Nombre' onChangeText={(value) => handleChangeText('name', value)} />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>DNI</Text>
                            <TextInput style={styles.input} placeholder='Dni' onChangeText={(value) => handleChangeText('dni', value)} />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Tel??fono</Text>
                            <TextInput style={styles.input} placeholder='Telefono' onChangeText={(value) => handleChangeText('phone', value)} />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Correo</Text>
                            <TextInput style={styles.input} placeholder='Correo' onChangeText={(value) => handleChangeText('email', value.trim())} />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Contrase??a</Text>
                            <TextInput style={styles.input} placeholder='Contrase??a' onChangeText={(value) => handleChangeText('password', value)} />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>N?? de number</Text>
                            <TextInput style={styles.input} placeholder='number' onChangeText={(value) => handleChangeText('number', value)} />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Departamento</Text>
                            <TextInput style={styles.input} placeholder='Departamento' onChangeText={(value) => handleChangeText('apartament', value)} />
                        </View>
                        <TouchableHighlight style={styles.saveBtn}
                            underlayColor={colors.btn}
                            onPress={() => {
                                saveNewUser()
                            }}>
                            <Text style={styles.txtBtn}>Guardar</Text>
                        </TouchableHighlight>
                    </ScrollView>
                    :
                    <ScrollView style={[styles.container, { paddingHorizontal: 20 }]}>
                        <TouchableHighlight style={styles.btnBack}
                            underlayColor={"tansparent"}
                            onPress={() => {
                                setShowModal(false)
                            }}>
                            <Text style={{ fontSize: 16, fontFamily: "Regular" }}>Regresar</Text>
                        </TouchableHighlight>
                        <Text style={styles.title}>Editar Usuario</Text>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nombre</Text>
                            <TextInput style={styles.input} placeholder='Nombre' value={currentUser.name} onChangeText={(value) => handleChangeTextEdit('name', value)} />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>DNI</Text>
                            <TextInput style={styles.input} placeholder='Dni' value={currentUser.dni} onChangeText={(value) => handleChangeTextEdit('dni', value)} />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Tel??fono</Text>
                            <TextInput style={styles.input} placeholder='Telefono' value={currentUser.phone} onChangeText={(value) => handleChangeTextEdit('phone', value)} />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Correo</Text>
                            <TextInput style={styles.input} placeholder='Correo' value={currentUser.email} />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Contrase??a</Text>
                            <TextInput style={styles.input} placeholder='Contrase??a' value={currentUser.password} onChangeText={(value) => handleChangeTextEdit('password', value)} />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>N?? de number</Text>
                            <TextInput style={styles.input} placeholder='number' value={currentUser.number} onChangeText={(value) => handleChangeTextEdit('number', value)} />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Departamento</Text>
                            <TextInput style={styles.input} placeholder='Departamento' value={currentUser.apartament} onChangeText={(value) => handleChangeTextEdit('apartament', value)} />
                        </View>
                        <TouchableHighlight style={styles.saveBtn}
                            underlayColor={colors.btn}
                            onPress={() => {
                                updateCurrentUser()
                            }}>
                            <Text style={styles.txtBtn}>Guardar</Text>
                        </TouchableHighlight>
                    </ScrollView>
                }
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: Constants.statusBarHeight,
        paddingBottom: 80,
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
    },
    FloatBtn: {
        position: "absolute",
        bottom: 40,
        right: 20,
        backgroundColor: colors.btn,
        width: 60,
        height: 60,
        borderRadius: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 14,
        elevation: 20
    },
    Modal: {
        flex: 1,
        paddingTop: 30
    }
})
