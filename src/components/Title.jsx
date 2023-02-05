import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useFonts } from 'expo-font'

export default function Title({ title }) {
  const [fontsCustom] = useFonts({
    Regular: require("../../assets/fonts/Poppins-Regular.ttf")
  })
  if(!fontsCustom) return null
  return (
    <View style={styles.container}>
        <Text style={styles.title} >{ title }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    title: {
      fontSize: 24,
      textTransform: 'uppercase',
      fontFamily: 'Regular'
    }
  })