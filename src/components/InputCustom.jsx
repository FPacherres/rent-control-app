import React from 'react'
import { Text, StyleSheet, View, TextInput } from 'react-native'

let name = ''

export default function InputCustom({ label, placeholder }) {
  return (
    <View style={styles.container}>
        <Text style={styles.label} >
            { label }
        </Text>
        <TextInput 
            style={styles.input}
            value={name}
            placeholder={placeholder}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 90,
        display: 'flex',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    label: {
        fontSize: 18,
        paddingLeft: 20
    },
    input: {
        height: 40,
        borderColor: '#FF00000',
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        paddingHorizontal: 20
    }
  })