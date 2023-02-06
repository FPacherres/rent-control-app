import React from 'react'
import { View, SafeAreaView, SectionList, StyleSheet, Dimensions, Text } from 'react-native'
import Constants from 'expo-constants'
import InputCustom from '../components/InputCustom'
import TextInfo from '../components/TextInfo'
import MainBtn from '../components/MainBtn'
import Title from '../components/Title'
import MessageStatusTenant from '../components/MessageStatusTenant'

let ScreenHeight = Dimensions.get("window").height

// const typeUser = 'SuperAdmi'
// const typeUser = 'Admi'
const typeUser = 'Normal'

export default function Home() {
    if (typeUser === 'SuperAdmi') {
        const DATA = [
            {
                title: 'Información Básica',
                action: 'Guardar',
                data: [
                    { id: '0', label: "Nombre", value: "", placeholder: "Nombre del Edificio" },
                    { id: '1', label: "Teléfono", value: "", placeholder: "+51 987 654 321" },
                    { id: '2', label: "Departamento", value: "", placeholder: "Lambayeque" },
                    { id: '3', label: "Provincia", value: "", placeholder: "Chiclayo" },
                    { id: '4', label: "Distrito", value: "", placeholder: "Chiclayo" },
                    { id: '5', label: "N° Piso", value: "", placeholder: "5" },
                    { id: '6', label: "N° de Dptos", value: "", placeholder: "10" }
                ]
            }
        ]
        return (
            <SafeAreaView style={styles.container}>
                <SectionList
                    sections={DATA}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <InputCustom input={item} pad={true} numeric={false} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <Title title={title} />
                    )}
                    renderSectionFooter={({ section: { action } }) => (
                        <MainBtn title={action} />
                    )}
                />
            </SafeAreaView>
        )
    }
    if (typeUser === 'Admi') {
        const DATA = [
            {
                title: 'Información Básica',
                action: 'Guardar',
                data: [
                    { id: '0', label: "Nombre", value: "Eduardo Garcia" },
                    { id: '1', label: "DNI", value: "87654321" },
                    { id: '2', label: "Teléfono", value: "987 654 321" },
                    { id: '3', label: "Correo", value: "egarcia@gmail.com" }
                ]
            }
        ]
        return (
            <SafeAreaView style={styles.container}>
                <SectionList
                    sections={DATA}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <TextInfo label={item.label} value={item.value} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <Title title={title} />
                    )}
                />
            </SafeAreaView>
        )
    }
    if (typeUser === 'Normal') {
        const DATA = [
            {
                title: 'Información Básica',
                action: 'Guardar',
                data: [
                    { id: '0', label: "Nombre", value: "Eduardo Garcia" },
                    { id: '1', label: "DNI", value: "87654321" },
                    { id: '2', label: "Teléfono", value: "987 654 321" },
                    { id: '3', label: "Correo", value: "egarcia@gmail.com" },
                    { id: '4', label: "N° Piso / N° de Dpto", value: "Piso 2 / Dpto 402" }
                ],
                status: true
            }
        ]
        return (
            <SafeAreaView style={styles.container}>
                <SectionList
                    sections={DATA}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <TextInfo label={item.label} value={item.value} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <Title title={title} />
                    )}
                    renderSectionFooter={({ section: { status } }) => (
                        <MessageStatusTenant status={status} />
                    )}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // height: ScreenHeight,
        marginTop: Constants.statusBarHeight,
    }
})
