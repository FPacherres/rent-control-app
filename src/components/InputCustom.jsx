import React from 'react'
import { Text, StyleSheet, View, TextInput } from 'react-native'
import { useFonts } from 'expo-font'

let name = ''

export default function InputCustom({ input, pad, numeric }) {
  const [fontsCustom] = useFonts({
    Light: require("../../assets/fonts/Poppins-ExtraLight.ttf")
  })
  if (!fontsCustom) return null
  return (
    <View style={[styles.container, { paddingHorizontal: pad ? 20 : 0 }]}>
      <Text style={styles.label} >
        {input.label}
      </Text>
      <TextInput
        style={styles.input}
        value={name}
        placeholder={input.placeholder}
        keyboardType={numeric ? "numeric" : ""}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: 20
  },
  label: {
    fontSize: 18,
    paddingLeft: 20,
    fontFamily: 'Light'
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#FF00000',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    paddingHorizontal: 20,
    fontFamily: 'Light'
  },
  containerGroupInput: {
    width: '100%',
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  box: {
    width: '46%',
    height: 40,
  }
})