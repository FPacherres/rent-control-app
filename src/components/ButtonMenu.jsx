import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useFonts } from 'expo-font'

// import { BookmarkSquareIcon } from "react-native-heroicons/solid"
import { BookmarkSquareIcon, UsersIcon, CurrencyDollarIcon, ShieldCheckIcon, Cog6ToothIcon, ArrowLeftOnRectangleIcon } from "react-native-heroicons/outline"

export default function ButtonMenu({ title, onPress }) {
    const [fontsCustom] = useFonts({
        Light: require("../../assets/fonts/Poppins-ExtraLight.ttf"),
        Regular: require("../../assets/fonts/Poppins-Regular.ttf"),
        Medium: require("../../assets/fonts/Poppins-Medium.ttf")
    })
    const getIcon = (name) => {
        if (name === "Información Básica") return <BookmarkSquareIcon color="#FFFFFF" fill="transparent" size={20} />
        if (name === "Inquilinos") return <UsersIcon color="#FFFFFF" fill="transparent" size={20} />
        if (name === "Pagos") return <CurrencyDollarIcon color="#FFFFFF" fill="transparent" size={20} />
        if (name === "Administrador") return <ShieldCheckIcon color="#FFFFFF" fill="transparent" size={20} />
        if (name === "Configuración") return <Cog6ToothIcon color="#FFFFFF" fill="transparent" size={20} />
        if (name === "Cerrar Sesión") return <ArrowLeftOnRectangleIcon color="#FFFFFF" fill="transparent" size={20} />
    }
    return (
        <TouchableOpacity
            style={styles.NavItem}
            onPress={onPress}>
            <View style={{ paddingBottom: 3 }}>
                {getIcon(title)}
            </View>
            <Text style={styles.Text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    NavItem: {
        paddingHorizontal: 25,
        paddingVertical: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    Text: {
        fontSize: 20,
        fontFamily: "Regular",
        textTransform: "uppercase",
        marginLeft: 10
    }
})
