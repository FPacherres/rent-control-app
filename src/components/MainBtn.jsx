import React from 'react'
import { Text, StyleSheet, View, TouchableWithoutFeedback, Dimensions } from 'react-native'
import { useFonts } from 'expo-font'

export default function HeaderCustom({ title }) {
  const [fontsCustom] = useFonts({
    Light: require("../../assets/fonts/Poppins-ExtraLight.ttf")
  })
  if(!fontsCustom) return null
  return (
    <View style={{height: 120, paddingTop: 20}}>
      <TouchableWithoutFeedback>
        <View style={styles.btn}>
            <Text style={styles.title}>{ title }</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#395065',
        width: Dimensions.get('window').width - 40,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        borderRadius: 8
    },
    title: {
        fontSize: 22,
        fontFamily: 'Light'
    }
  })