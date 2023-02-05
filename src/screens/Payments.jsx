import React from 'react'
import { SafeAreaView, SectionList, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import CardTenant from '../components/CardTenant'
import Title from '../components/Title'


const typeUser = 'SuperAdmi'
// const typeUser = 'Admi'
// const typeUser = 'Normal'

export default function Payments() {
    const DATA = [
        {   
            title: 'Pagos',
            data: [
                { id: '0', label: "Nombre", value: "", placeholder: "Nombre del Administrador" },
                { id: '1', label: "Teléfono", value: "", placeholder: "+51 987 654 321" },
                { id: '2', label: "DNI", value: "", placeholder: "87654321" },
                { id: '3', label: "Correo", value: "", placeholder: "example@gmail.com" },
                { id: '4', label: "Contraseña", value: "", placeholder: "***********" },
                { id: '5', label: "Contraseña", value: "", placeholder: "***********" },
                { id: '6', label: "Contraseña", value: "", placeholder: "***********" },
                { id: '7', label: "Contraseña", value: "", placeholder: "***********" },
                { id: '8', label: "Contraseña", value: "", placeholder: "***********" },
                { id: '9', label: "Contraseña", value: "", placeholder: "***********" },
                { id: '10', label: "Contraseña", value: "", placeholder: "***********" }
            ]
        }
    ]
    return (
        <SafeAreaView style={styles.container}>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <CardTenant deleteAction={true} />}
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
    }
})
