import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useFonts } from 'expo-font'


export default function ButtonMenu({title, onPress}) {
    const [fontsCustom] = useFonts({
        Light: require("../../assets/fonts/Poppins-ExtraLight.ttf"),
        Regular: require("../../assets/fonts/Poppins-Regular.ttf"),
        Medium: require("../../assets/fonts/Poppins-Medium.ttf")
    })
    return (
        <TouchableOpacity
            style={styles.NavItem}
            onPress={ onPress }>
            <Text style={styles.Text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    NavItem: {
        paddingHorizontal: 35,
        paddingVertical: 15
    },
    Text: {
        fontSize: 22,
        fontFamily: "Light",
        textTransform: "uppercase"
    }
})
