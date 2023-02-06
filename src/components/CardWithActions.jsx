import React from 'react'
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native'
import { useFonts } from 'expo-font'

export default function CardTenant({ data, edit, editUser }) {
    const action = () => {
        if(edit) {
            editUser(data)
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
            <View style={[styles.snippet, { width: "100%", paddingLeft: 20 }]}>
                <Text style={styles.title}>Inquilino 001</Text>
            </View>
            <View style={styles.action}>
                <View style={styles.info}>
                    <View>
                        <Text style={{ fontFamily: "Light" }}>Piso <Text style={{ fontFamily: "Regular" }}>{data.apartament}   /   </Text>Dtpo <Text style={{ fontFamily: "Regular" }}>{data.number}</Text></Text>
                    </View>
                    <View>
                        <Text style={{ fontFamily: "Regular" }}>{data.phone}987654321</Text>
                    </View>
                </View>
                <TouchableHighlight
                    style={styles.btn}
                    onPress={action}>
                    {edit ?
                        <Text style={{fontFamily: "Medium", fontSize: 16}}>Editar</Text>
                        :
                        <Text style={{fontFamily: "Medium", fontSize: 16}}>Pago</Text>
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