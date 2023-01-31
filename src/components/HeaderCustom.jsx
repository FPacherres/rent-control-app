import React from 'react'
import { Text, StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import { useFonts } from 'expo-font'

export default function HeaderCustom() {
  const [fontsCustom] = useFonts({
    Medium: require("../../assets/fonts/Poppins-Medium.ttf")
  })
  if(!fontsCustom) return null
  return (
    <View style={styles.container}>
        <Text style={styles.title} >
            CBuilding
        </Text>
        <TouchableWithoutFeedback>
            <View style={styles.btn}>
                <Text>X</Text>
            </View>
        </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
      fontSize: 30,
      textTransform: 'uppercase',
      fontFamily: 'Medium'
    },
    btn: {
        backgroundColor: '#FF0000',
        width: 30,
        height: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
  })