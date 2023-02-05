import React from 'react'
import { View, SafeAreaView, SectionList, StyleSheet, Dimensions, Text } from 'react-native'
import Constants from 'expo-constants'
import InputCustom from '../components/InputCustom'
import MainBtn from '../components/MainBtn'
import Title from '../components/Title'

let ScreenHeight = Dimensions.get("window").height

export default function Settings() {
    const DATA = [
        {
            title: 'Configuración',
            action: 'Guardar',
            data: [
                { id: '0', label: "Correo", value: "", placeholder: "example@gmail.com" },
                { id: '1', label: "Contraseña", value: "", placeholder: "*********" }
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

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // height: ScreenHeight,
        marginTop: Constants.statusBarHeight,
    }
})
