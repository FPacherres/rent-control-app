import React, { useState } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import { useFonts } from 'expo-font'

import { PhoneIcon, UserIcon, TrashIcon, ArrowPathIcon } from "react-native-heroicons/outline"

export default function CardTenant({ data, view, userEdit }) {
    // const typeUser = 'SuperAdmi'
    const typeUser = 'Admi'

    const [isDisabled, setIsDisabled] = useState(!data.debet);

    const editUserById = () => {
        userEdit(data.id)
    }

    console.log(data)

    const [fontsCustom] = useFonts({
        Light: require("../../assets/fonts/Poppins-ExtraLight.ttf"),
        Regular: require("../../assets/fonts/Poppins-Regular.ttf"),
        Medium: require("../../assets/fonts/Poppins-Medium.ttf")
    })
    if (!fontsCustom) return null
    return (
        <View style={[styles.card, { backgroundColor: data.debet ? "#7F2020" : "#395065" }]}>
            <View style={[styles.snippet, { width: typeUser === "SuperAdmi" && view === "tenants" ? "85%" : "100%" }]}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={{ paddingTop: 3, width: 25 }}><UserIcon color="#FFFFFF" fill="transparent" size={20} /></View>
                    <Text style={styles.title}>{data.name}</Text>
                </View>
                {
                    typeUser === "SuperAdmi"
                        ?
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
                        :
                        <View style={styles.infoAdmi}>
                            <View style={styles.snippetAdmi}>
                                <Text style={{ fontFamily: "Light" }}>Piso <Text style={{ fontFamily: "Regular" }}>{data.number}   /   </Text>Dtpo <Text style={{ fontFamily: "Regular" }}>{data.apartament}</Text></Text>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <View style={{ paddingTop: 2, width: 17 }}><PhoneIcon color="#FFFFFF" fill="transparent" size={12} /></View>
                                    <Text style={{ fontFamily: "Regular" }}>
                                        {data.phone}</Text>
                                </View>
                            </View>
                            {
                                typeUser === "Admi" && view === "tenants"
                                    ?
                                    <TouchableOpacity
                                        style={styles.btnDebet}
                                        onPress={() => editUserById()}
                                    >
                                        <Text>Editar</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        style={styles.btnDebet}
                                        onPress={() => { if (data.debet){
                                            editUserById()
                                        }}}
                                    >
                                        <Text>{data.debet ? "No Pago" : "Pago"}</Text>
                                    </TouchableOpacity>
                            }
                        </View>
                }
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
                view === "tenants" && data.forgotPassword && typeUser === "Admi"
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
    infoAdmi: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    snippetAdmi: {
        display: "flex",
    },
    btnDebet: {
        width: 80,
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
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