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
                { id: '0', name: "Inquilino CBuilding 001", apartament: "1", number: "402", phone: "987654321", pay: true },
                { id: '1', name: "Inquilino CBuilding 001", apartament: "1", number: "402", phone: "987654321", pay: true },
                { id: '2', name: "Inquilino CBuilding 001", apartament: "1", number: "402", phone: "987654321", pay: false },
                { id: '3', name: "Inquilino CBuilding 001", apartament: "1", number: "402", phone: "987654321", pay: true },
                { id: '4', name: "Inquilino CBuilding 001", apartament: "1", number: "402", phone: "987654321", pay: false },
                { id: '5', name: "Inquilino CBuilding 001", apartament: "1", number: "402", phone: "987654321", pay: false },
                { id: '6', name: "Inquilino CBuilding 001", apartament: "1", number: "402", phone: "987654321", pay: true },
                { id: '7', name: "Inquilino CBuilding 001", apartament: "1", number: "402", phone: "987654321", pay: true },
                { id: '8', name: "Inquilino CBuilding 001", apartament: "1", number: "402", phone: "987654321", pay: false },
                { id: '9', name: "Inquilino CBuilding 001", apartament: "1", number: "402", phone: "987654321", pay: false },
                { id: '10', name: "Inquilino CBuilding 001", apartament: "1", number: "402", phone: "987654321", pay: true }
            ]
        }
    ]
    return (
        <SafeAreaView style={styles.container}>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <CardTenant data={item} deleteAction={true} />}
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
