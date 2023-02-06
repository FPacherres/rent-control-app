import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useFonts } from 'expo-font'


export default function ButtonMenu({label, value}) {
    const [fontsCustom] = useFonts({
        Light: require("../../assets/fonts/Poppins-ExtraLight.ttf"),
        Regular: require("../../assets/fonts/Poppins-Regular.ttf"),
        Medium: require("../../assets/fonts/Poppins-Medium.ttf")
    })
    return (
        <View style={styles.Container}>
            <View
                style={styles.Containertext}>
                <Text style={styles.Label}>{label}</Text>
                <Text style={styles.Value}>{value}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        width: "100%",
        paddingHorizontal: 20,
    },
    Containertext: {
        width: "100%",
        marginBottom: 45,
        paddingBottom: 10,
        borderBottomColor: "#3c3c3c",
        borderBottomWidth: 1
    },
    Label: {
        fontSize: 16,
        fontFamily: "Light",
    },
    Value: {
        fontSize: 20,
        fontFamily: "Medium",
        textTransform: "uppercase",
        textAlign: "right"
    }
})
