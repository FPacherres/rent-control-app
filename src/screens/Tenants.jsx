import React, { useState } from 'react'
import { SafeAreaView, SectionList, StyleSheet, View, Text, Alert, Modal, TouchableHighlight } from 'react-native'
import Constants from 'expo-constants'
import CardTenant from '../components/CardTenant'
import { useFonts } from 'expo-font'
import Title from '../components/Title'
import { ScrollView, TextInput } from 'react-native-gesture-handler'


import app from '../firebase'
import { getFirestore, collection, addDoc, getDocs, setDoc, doc } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

// const typeUser = 'SuperAdmi'
const typeUser = 'Admi'

export default function Tenants() {

    const [data, setData] = useState([
        {
            title: 'Inquilinos',
            data: []
        }
    ])

    const [showModal, setShowModal] = useState(false)
    const [typeAction, setTypeAction] = useState('newUser')

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
        debet: false,
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
                        return {...obj, key: key}
                    })
                }
            ]);
        } catch (error) {
            console.log(error);
            Alert.alert(error.message);
        }
    }

    // revisar
    // getUsers()

    const handleChangeText = (property, value) => {
        setState({ ...state, [property]: value })
    }

    const handleChangeTextEdit = (property, value) => {
        setCurrentUser({ ...currentUser, [property]: value })
    }

    const userEdit = (id) => {
        const user = data[0].data.find(d=> d.id === id)
        setCurrentUser(user)
        setTypeAction('editUser')
        setShowModal(true)
    }

    async function updateCurrentUser() {
        try {
            await setDoc(doc(db, "users", `${currentUser.key}`), currentUser);
            Alert.alert("Usuario actualizado")
            getUsers()
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
                    debet: false,
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
            Alert.alert('Falta ingresar el número de teléfono con 9 caracteres.')
            return false
        }
        if (obj.email === '') {
            Alert.alert('Falta ingresar el correo electrónico.')
            return false
        }
        if (obj.password.length < 6) {
            Alert.alert('Falta ingresar la contraseña con mas de 6 caraccteres.')
            return false
        }
        if (obj.number === '') {
            Alert.alert('Falta ingresar el n° de number.')
            return false
        }
        if (obj.apartament === '') {
            Alert.alert('Falta ingresar el n° de departamento.')
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
                renderItem={({ item }) => <CardTenant data={item} view={"tenants"} userEdit={userEdit} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Title title={title} />
                )}
            />
            <TouchableHighlight style={styles.FloatBtn}
                disabled={isDisabled}
                onPress={() => {
                    setShowModal(true)
                    setTypeAction('newUser')
                }}>
                <Text style={{ fontSize: 48, fontFamily: "Regular" }}>+</Text>
            </TouchableHighlight>
            <Modal
                animationType="slide"
                visible={showModal}
            >
                {typeAction === "newUser"
                    ?
                    <ScrollView style={[styles.container, {paddingHorizontal: 20}]}>
                        <TouchableHighlight style={styles.btnBack}
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
                            <Text style={styles.label}>Teléfono</Text>
                            <TextInput style={styles.input} placeholder='Telefono' onChangeText={(value) => handleChangeText('phone', value)} />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Correo</Text>
                            <TextInput style={styles.input} placeholder='Correo' onChangeText={(value) => handleChangeText('email', value)} />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Contraseña</Text>
                            <TextInput style={styles.input} placeholder='Contraseña' onChangeText={(value) => handleChangeText('password', value)} />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>N° de number</Text>
                            <TextInput style={styles.input} placeholder='number' onChangeText={(value) => handleChangeText('number', value)} />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Departamento</Text>
                            <TextInput style={styles.input} placeholder='Departamento' onChangeText={(value) => handleChangeText('apartament', value)} />
                        </View>
                        <TouchableHighlight style={styles.saveBtn}
                            onPress={() => {
                                saveNewUser()
                            }}>
                            <Text style={styles.txtBtn}>Guardar</Text>
                        </TouchableHighlight>
                    </ScrollView>
                    :
                    <ScrollView style={[styles.container, {paddingHorizontal: 20}]}>
                        <TouchableHighlight style={styles.btnBack}
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
                            <Text style={styles.label}>Teléfono</Text>
                            <TextInput style={styles.input} placeholder='Telefono' value={currentUser.phone} onChangeText={(value) => handleChangeTextEdit('phone', value)} />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Correo</Text>
                            <TextInput style={styles.input} placeholder='Correo' value={currentUser.email} onChangeText={(value) => handleChangeTextEdit('email', value)} />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Contraseña</Text>
                            <TextInput style={styles.input} placeholder='Contraseña' value={currentUser.password} onChangeText={(value) => handleChangeTextEdit('password', value)} />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>N° de number</Text>
                            <TextInput style={styles.input} placeholder='number' value={currentUser.number} onChangeText={(value) => handleChangeTextEdit('number', value)} />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Departamento</Text>
                            <TextInput style={styles.input} placeholder='Departamento' value={currentUser.apartament} onChangeText={(value) => handleChangeTextEdit('apartament', value)} />
                        </View>
                        <TouchableHighlight style={styles.saveBtn}
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
        height: '100%'
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
    FloatBtn: {
        position: "absolute",
        bottom: 40,
        right: 20,
        backgroundColor: "#FFFFFF",
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
