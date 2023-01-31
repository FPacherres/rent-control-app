import React from 'react'
import { Text, StyleSheet, View, TextInput } from 'react-native'

let name = ''

export default function InputCustom({ label, placeholder, pad, numeric }) {
  return (
    <View style={[ styles.container, {paddingHorizontal: pad ? 20 : 0} ]}>
        <Text style={styles.label} >
            { label }
        </Text>
        <TextInput 
            style={styles.input}
            value={name}
            placeholder={placeholder}
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
        paddingLeft: 20
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: '#FF00000',
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        paddingHorizontal: 20,
    }
  })