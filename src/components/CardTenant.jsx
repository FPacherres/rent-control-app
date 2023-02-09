import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import { useFonts } from 'expo-font'

import { PhoneIcon, UserIcon, TrashIcon } from "react-native-heroicons/outline"

export default function CardTenant({ data, deleteAction }) {
    const [fontsCustom] = useFonts({
        Light: require("../../assets/fonts/Poppins-ExtraLight.ttf"),
        Regular: require("../../assets/fonts/Poppins-Regular.ttf"),
        Medium: require("../../assets/fonts/Poppins-Medium.ttf")
    })
    if (!fontsCustom) return null
    if (deleteAction) {
        return (
            <View style={[styles.card, { backgroundColor: data.pay ? "#395065" : "#7F2020" }]}>
                <View style={[styles.snippet, { width: "100%", paddingHorizontal: 20 }]}>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                        <View style={{ paddingTop: 3, width: 25 }}><UserIcon color="#FFFFFF" fill="transparent" size={20} /></View>
                        <Text style={styles.title}>Inquilino 001</Text>
                    </View>
                    <View style={styles.info}>
                        <View>
                            <Text style={{ fontFamily: "Light" }}>Piso <Text style={{ fontFamily: "Regular" }}>{data.apartament}   /   </Text>Dtpo <Text style={{ fontFamily: "Regular" }}>{data.number}</Text></Text>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <View style={{ paddingTop: 2, width: 17 }}><PhoneIcon color="#FFFFFF" fill="transparent" size={12} /></View>
                            <Text style={{ fontFamily: "Regular" }}>
                                {data.phone}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={[styles.card, { backgroundColor: "#395065" }]}>
            <View style={[styles.snippet, { width: "75%", paddingLeft: 20 }]}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={{ paddingTop: 3, width: 25 }}><UserIcon color="#FFFFFF" fill="transparent" size={20} /></View>
                    <Text style={styles.title}>Inquilino 001</Text>
                </View>
                <View style={styles.info}>
                    <View>
                        <Text style={{ fontFamily: "Light" }}>Piso <Text style={{ fontFamily: "Regular" }}>{data.apartament}   /   </Text>Dtpo <Text style={{ fontFamily: "Regular" }}>{data.number}</Text></Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                        <View style={{ paddingTop: 2, width: 17 }}><PhoneIcon color="#FFFFFF" fill="transparent" size={12} /></View>
                        <Text style={{ fontFamily: "Regular" }}>
                            {data.phone}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.action}>
                <TouchableOpacity
                    style={{ paddingLeft: 12 }}
                    onPress={() => Alert.alert('Simple Button pressed')}
                >
                    <TrashIcon color="#FFFFFF" fill="transparent" size={30} />
                </TouchableOpacity>
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
        flexDirection: "row",
        justifyContent: "space-between",
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
    }
})