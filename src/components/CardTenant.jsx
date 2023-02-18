import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import { useFonts } from 'expo-font'

import { PhoneIcon, UserIcon, TrashIcon, ArrowPathIcon } from "react-native-heroicons/outline"

export default function CardTenant({ data, view }) {
    const typeUser = 'SuperAdmi'
    // const typeUser = 'Admi'

    console.log(data)

    const [fontsCustom] = useFonts({
        Light: require("../../assets/fonts/Poppins-ExtraLight.ttf"),
        Regular: require("../../assets/fonts/Poppins-Regular.ttf"),
        Medium: require("../../assets/fonts/Poppins-Medium.ttf")
    })
    if (!fontsCustom) return null
    return (
        <View style={[styles.card, { backgroundColor: "#395065" }]}>
            <View style={[styles.snippet, { width: typeUser === "SuperAdmi" && view === "tenants" ? "85%" : "100%" }]}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={{ paddingTop: 3, width: 25 }}><UserIcon color="#FFFFFF" fill="transparent" size={20} /></View>
                    <Text style={styles.title}>{data.name}</Text>
                </View>
                <View style={styles.info}>
                    <View>
                        <Text style={{ fontFamily: "Light" }}>Piso <Text style={{ fontFamily: "Regular" }}>{data.number}   /   </Text>Dtpo <Text style={{ fontFamily: "Regular" }}>{data.apartament}</Text></Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                        <View style={{ paddingTop: 2, width: 17 }}><PhoneIcon color="#FFFFFF" fill="transparent" size={12} /></View>
                        <Text style={{ fontFamily: "Regular" }}>
                            {data.phone}</Text>
                    </View>
                </View>
            </View>
            {
                typeUser === "SuperAdmi" && view === "tenants"
                    ?
                    <View style={styles.action}>
                        <TouchableOpacity
                            style={{ paddingLeft: 12 }}
                            onPress={() => Alert.alert('Simple Button pressed')}
                        >
                            <TrashIcon color="#FFFFFF" fill="transparent" size={30} />
                        </TouchableOpacity>
                    </View>
                    :
                    <View></View>
            }
            {
                data.forgotPassword && typeUser === "Admi"
                    ?
                    <View style={styles.alert}>
                        <ArrowPathIcon color="#FFFFFF" fill="transparent" size={15} />
                    </View>
                    :
                    <View></View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
        paddingHorizontal: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        position: "relative"
    },
    snippet: {
        paddingTop: 20,
        paddingBottom: 25
    },
    action: {
        width: "18%",
        display: "flex",
        justifyContent: "center",
        paddingRight: 20
    },
    title: {
        fontSize: 24,
        fontFamily: "Regular"
    },
    info: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    alert: {
        position: "absolute",
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: "#E5BE01",
        right: -7,
        top: -7,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
})