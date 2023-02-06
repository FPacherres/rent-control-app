import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useFonts } from 'expo-font'

export default function MessageStatusTenant({ status }) {
    const [fontsCustom] = useFonts({
        Light: require("../../assets/fonts/Poppins-ExtraLight.ttf"),
        Regular: require("../../assets/fonts/Poppins-Regular.ttf"),
        Medium: require("../../assets/fonts/Poppins-Medium.ttf")
    })
    if (!fontsCustom) return null
    return (
        <View style={[styles.Container, {backgroundColor: status ? "#395065" : "#7F2020"}]}>
            <Text style={styles.Text1}>{status ? 'Felicidades' : 'Cuidado'}!</Text>
            <Text style={styles.Text2}>{status ? 'No tiene deudas' : 'Tiene deudas'}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
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
    }
})