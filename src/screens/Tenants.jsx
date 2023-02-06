import React, { useState } from 'react'
import { SafeAreaView, SectionList, StyleSheet, View, Text, TouchableOpacity, Modal, TouchableHighlight } from 'react-native'
import Constants from 'expo-constants'
import CardTenant from '../components/CardTenant'
import { useFonts } from 'expo-font'
import Title from '../components/Title'
import MainBtn from '../components/MainBtn'
import InputCustom from '../components/InputCustom'
import CardWithActions from '../components/CardWithActions'

// const typeUser = 'SuperAdmi'
const typeUser = 'Admi'

export default function Tenants() {
    const [showModal, setShowModal] = useState(false)
    const [typeAction, setTypeAction] = useState('newUser')
    const [fontsCustom] = useFonts({
        Light: require("../../assets/fonts/Poppins-ExtraLight.ttf"),
        Regular: require("../../assets/fonts/Poppins-Regular.ttf"),
        Medium: require("../../assets/fonts/Poppins-Medium.ttf")
    })
    if (!fontsCustom) return null
    if (typeUser === 'SuperAdmi') {
        const DATA = [
            {
                title: 'Inquilinos',
                data: [
                    { id: '0', name: "Inquilino CBuilding 001", apartament: "1", number: "402", phone: "987654321" },
                    { id: '1', name: "Inquilino CBuilding 001", apartament: "1", number: "402", phone: "987654321" },
                    { id: '2', name: "Inquilino CBuilding 001", apartament: "1", number: "402", phone: "987654321", },
                    { id: '3', name: "Inquilino CBuilding 001", apartament: "1", number: "402", phone: "987654321" },
                    { id: '4', name: "Inquilino CBuilding 001", apartament: "1", number: "402", phone: "987654321", },
                    { id: '5', name: "Inquilino CBuilding 001", apartament: "1", number: "402", phone: "987654321", },
                    { id: '6', name: "Inquilino CBuilding 001", apartament: "1", number: "402", phone: "987654321" },
                    { id: '7', name: "Inquilino CBuilding 001", apartament: "1", number: "402", phone: "987654321" },
                    { id: '8', name: "Inquilino CBuilding 001", apartament: "1", number: "402", phone: "987654321", },
                    { id: '9', name: "Inquilino CBuilding 001", apartament: "1", number: "402", phone: "987654321", },
                    { id: '10', name: "Inquilino CBuilding 001", apartament: "1", number: "402", phone: "987654321" }
                ]
            }
        ]
        return (
            <SafeAreaView style={styles.container}>
                <SectionList
                    sections={DATA}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <CardTenant data={item} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <Title title={title} />
                    )}
                />
            </SafeAreaView>
        )
    }
    if (typeUser === 'Admi') {
        let DATA = [
            {
                title: 'Registrar Inquilino',
                action: 'Guardar',
                data: [
                    { id: '0', label: "Nombre", value: "", placeholder: "Nombre del Administrador" },
                    { id: '1', label: "DNI", value: "", placeholder: "87654321" },
                    { id: '2', label: "Teléfono", value: "", placeholder: "+51 987 654 321" },
                    { id: '3', label: "N° Piso", value: "", placeholder: "4" },
                    { id: '4', label: "N° Departamento", value: "", placeholder: "402" },
                    { id: '5', label: "Correo", value: "", placeholder: "example@gmail.com" },
                    { id: '6', label: "Contraseña", value: "", placeholder: "***********" }
                ]
            }
        ]
        let oldDATA = [
            {
                title: 'Editar Inquilino',
                action: 'Guardar',
                data: [
                    { id: '0', label: "Nombre", value: "", placeholder: "Nombre del Administrador" },
                    { id: '1', label: "DNI", value: "", placeholder: "87654321" },
                    { id: '2', label: "Teléfono", value: "", placeholder: "+51 987 654 321" },
                    { id: '3', label: "N° Piso", value: "", placeholder: "4" },
                    { id: '4', label: "N° Departamento", value: "", placeholder: "402" },
                    { id: '5', label: "Correo", value: "", placeholder: "example@gmail.com" },
                    { id: '6', label: "Contraseña", value: "", placeholder: "***********" }
                ]
            }
        ]
        const editUser = (data) => {
            oldDATA = data
            setTypeAction('edit')
            setShowModal(true)
        }
        return (
            <SafeAreaView style={[styles.container, { position: "relative" }]}>
                <SectionList
                    sections={DATA}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <CardWithActions data={item} edit={true} editUser={editUser}/>}
                    renderSectionHeader={({ section: { title } }) => (
                        <Title title={title} />
                    )}
                    renderSectionFooter={() => (
                        <View style={{ height: 120 }}></View>
                    )}
                />
                <TouchableHighlight style={styles.FloatBtn}
                    onPress={() => {
                        setShowModal(true)
                        setTypeAction("newUser")
                        }}>
                    <Text style={{ fontSize: 48, fontFamily: "Regular" }}>+</Text>
                </TouchableHighlight>
                <Modal
                    animationType="slide"
                    // onDismiss={() => } cada vez que se cierra
                    // onShow={() => } cada vez que se abre
                    // transparent
                    visible={showModal}
                >
                    { typeAction === "newUser"
                        ?
                        <SafeAreaView style={styles.Modal}>
                            <SectionList
                                sections={DATA}
                                keyExtractor={(item, index) => item + index}
                                renderItem={({ item }) => <InputCustom input={item} pad={true} numeric={false} />}
                                renderSectionHeader={({ section: { title } }) => (
                                    <View>
                                        <TouchableOpacity style={{ paddingBottom: 20, paddingLeft: 20 }}
                                            onPress={() => setShowModal(false)}>
                                            <Text style={{ fontFamily: "Light" }}>Regresar</Text>
                                        </TouchableOpacity>
                                        <Title title={title} modal={true} />
                                    </View>
                                )}
                                renderSectionFooter={({ section: { action } }) => (
                                    <MainBtn title={action} />
                                )}
                            />
                        </SafeAreaView>
                        : 
                        <SafeAreaView style={styles.Modal}>
                            <SectionList
                                sections={oldDATA}
                                keyExtractor={(item, index) => item + index}
                                renderItem={({ item }) => <InputCustom input={item} pad={true} numeric={false} />}
                                renderSectionHeader={({ section: { title } }) => (
                                    <View>
                                        <TouchableOpacity style={{ paddingBottom: 20, paddingLeft: 20 }}
                                            onPress={() => setShowModal(false)}>
                                            <Text style={{ fontFamily: "Light" }}>Regresar</Text>
                                        </TouchableOpacity>
                                        <Title title={title} modal={true} />
                                    </View>
                                )}
                                renderSectionFooter={({ section: { action } }) => (
                                    <MainBtn title={action} />
                                )}
                            />
                        </SafeAreaView>
                    }
                </Modal>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: Constants.statusBarHeight,
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
