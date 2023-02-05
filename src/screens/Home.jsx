import React from 'react'
import { View, SafeAreaView, SectionList, StyleSheet, Dimensions, Text } from 'react-native'
import Constants from 'expo-constants'
import InputCustom from '../components/InputCustom'
import MainBtn from '../components/MainBtn'

let ScreenHeight = Dimensions.get("window").height

const typeUser = 'SuperAdmi'
// const typeUser = 'Admi'
// const typeUser = 'Normal'

export default function HomeSuperAdmi() {
    const DATA = [
        {
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
    if (typeUser === 'SuperAdmi') {
        return (
            <SafeAreaView style={styles.container}>
                <SectionList
                    sections={DATA}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <InputCustom input={item} pad={true} numeric={false} />}
                    renderSectionFooter={({ section: { action } }) => (
                        <MainBtn title={action} />
                    )}
                />
            </SafeAreaView>
        )
    }
    return (
        <View><Text>Hola</Text></View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // height: ScreenHeight,
        marginTop: Constants.statusBarHeight,
    }
})
