import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { useFonts } from 'expo-font'
import { DrawerContentScrollView } from '@react-navigation/drawer'

import { getAuth, signOut } from 'firebase/auth'
import app from '../firebase'

import ButtonMenu from './ButtonMenu'

let ScreenHeight = Dimensions.get("window").height

const typeUser = 'SuperAdmi'
// const typeUser = 'Admi'
// const typeUser = 'Normal'

export default function Menu({ navigation: { navigate } }) {
    const auth = getAuth(app)
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('Login')
            console.log('Signed out!');
        } catch (error) {
            console.log(error);
        }
    }
    const image = require(`../../assets/logoLight.png`)
    const [fontsCustom] = useFonts({
        Light: require("../../assets/fonts/Poppins-ExtraLight.ttf"),
        Regular: require("../../assets/fonts/Poppins-Regular.ttf"),
        Medium: require("../../assets/fonts/Poppins-Medium.ttf")
    })
    if (!fontsCustom) return null
    if (typeUser === "SuperAdmi") {
        return (
            <DrawerContentScrollView>
                <View style={styles.Container}>
                    <View>
                        <View style={styles.containerLogo}>
                            <Image style={styles.Logo} source={image}></Image>
                            <Text style={styles.Title}>CBuilding</Text>
                        </View>
                        <View>
                            <ButtonMenu title='Información Básica' onPress={() => navigate('Home')} />
                            <ButtonMenu title='Administrador' onPress={() => navigate('Administrador')} />
                            <ButtonMenu title='Inquilinos' onPress={() => navigate('Inquilinos')} />
                            <ButtonMenu title='Pagos' onPress={() => navigate('Pagos')} />
                        </View>
                        <ButtonMenu title='Cerrar Sesión' onPress={() => handleSignOut()} />
                    </View>
                    <View>
                        <ButtonMenu title='Configuración' onPress={() => navigate('Configuracion')} />
                    </View>
                </View>
            </DrawerContentScrollView>
        )
    }
    if (typeUser === "Admi") {
        return (
            <DrawerContentScrollView>
                <View style={styles.Container}>
                    <View>
                        <View style={styles.containerLogo}>
                            <Image style={styles.Logo} source={image}></Image>
                            <Text style={styles.Title}>CBuilding</Text>
                        </View>
                        <View>
                            <ButtonMenu title='Información Básica' onPress={() => navigate('Home')} />
                            <ButtonMenu title='Inquilinos' onPress={() => navigate('Inquilinos')} />
                            <ButtonMenu title='Pagos' onPress={() => navigate('Pagos')} />
                        </View>
                        <ButtonMenu title='Cerrar Sesión' onPress={() => handleSignOut()} />
                    </View>
                </View>
            </DrawerContentScrollView>
        )
    }
    if (typeUser === "Normal") {
        return (
            <DrawerContentScrollView>
                <View style={styles.Container}>
                    <View>
                        <View style={styles.containerLogo}>
                            <Image style={styles.Logo} source={image}></Image>
                            <Text style={styles.Title}>CBuilding</Text>
                        </View>
                        <View>
                            <ButtonMenu title='Información Básica' onPress={() => navigate('Home')} />
                        </View>
                        <ButtonMenu title='Cerrar Sesión' onPress={() => handleSignOut()} />
                    </View>
                </View>
            </DrawerContentScrollView>
        )
    }
}

const styles = StyleSheet.create({
    Container: {
        display: "flex",
        justifyContent: "space-between",
        height: ScreenHeight - 5,
        paddingBottom: 30,
    },
    containerLogo: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: 70,
        paddingHorizontal: 25
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
        paddingLeft: 10,
        color: "#FFF"
    }
})