import React from 'react'
import { StyleSheet } from 'react-native'
import { useFonts } from 'expo-font'
import { DrawerContentScrollView } from '@react-navigation/drawer'

import ButtonMenu from './ButtonMenu'
import { useSelector } from 'react-redux';

export default function Menu({navigation}) {
    const typeUser = useSelector(state => state.auth.typeUser)
    const image = require(`../../assets/logoLight.png`)
    const [fontsCustom] = useFonts({
        Light: require("../../assets/fonts/Poppins-ExtraLight.ttf"),
        Regular: require("../../assets/fonts/Poppins-Regular.ttf"),
        Medium: require("../../assets/fonts/Poppins-Medium.ttf")
    })
    if (!fontsCustom) return null
    return (
        <DrawerContentScrollView>
            <ButtonMenu 
                title="Información Básica"
                onPress = { () => NavigationPreloadManager.navigate('Home') } />
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    ContainerLogo: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: 70,
        paddingHorizontal: 20
    },
    Logo: {
        width: 30,
        height: 30
    },
    Title: {
        fontSize: 32,
        textTransform: "uppercase",
        fontFamily: "Medium",
        paddingTop: 17,
        paddingLeft: 10
    }
})