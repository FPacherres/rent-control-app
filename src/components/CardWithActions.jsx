import React from 'react'
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native'
import { useFonts } from 'expo-font'

import { PhoneIcon, UserIcon } from "react-native-heroicons/outline"

export default function CardTenant({ data, edit, editUser, idUser }) {
    const action = () => {
        if (edit) {
            editUser(data)
            idUser(data.id)
        }
    }
    const [fontsCustom] = useFonts({
        Light: require("../../assets/fonts/Poppins-ExtraLight.ttf"),
        Regular: require("../../assets/fonts/Poppins-Regular.ttf"),
        Medium: require("../../assets/fonts/Poppins-Medium.ttf")
    })
    if (!fontsCustom) return null
    return (
        <View style={[styles.card, { backgroundColor: "#395065" }]}>
            <View style={[styles.snippet, { width: "100%", paddingLeft: 20, display: "flex", flexDirection: "row" }]}>
                <View style={{ paddingTop: 3, width: 25 }}><UserIcon color="#FFFFFF" fill="transparent" size={20} /></View>
                <Text style={styles.title}>Inquilino 001</Text>
            </View>
            <View style={styles.action}>
                <View style={styles.info}>
                    <View>
                        <Text style={{ fontFamily: "Light" }}>Piso <Text style={{ fontFamily: "Regular" }}>{data.apartament}   /   </Text>Dtpo <Text style={{ fontFamily: "Regular" }}>{data.number}</Text></Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                        <View style={{ paddingTop: 2, width: 17 }}><PhoneIcon color="#FFFFFF" fill="transparent" size={12} /></View>
                        <Text style={{ fontFamily: "Regular" }}>
                            987 654 321</Text>
                    </View>
                </View>
                <TouchableHighlight
                    style={styles.btn}
                    onPress={action}>
                    {edit ?
                        <Text style={{ fontFamily: "Medium", fontSize: 16 }}>Editar</Text>
                        :
                        <Text style={{ fontFamily: "Medium", fontSize: 16 }}>Pago</Text>
                    }
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
        display: "flex",
    },
    snippet: {
        paddingTop: 20,
    },
    action: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
        paddingBottom: 20
    },
    title: {
        fontSize: 24,
        fontFamily: "Regular"
    },
    info: {
        display: "flex",
    },
    btn: {
        backgroundColor: "#FFFFFF",
        marginTop: 5,
        height: 30,
        width: 80,
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
})