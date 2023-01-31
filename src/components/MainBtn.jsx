import React from 'react'
import { Text, StyleSheet, View, TouchableWithoutFeedback, Dimensions } from 'react-native'

export default function HeaderCustom({ title }) {
  return (
    <TouchableWithoutFeedback>
        <View style={styles.btn}>
            <Text style={styles.title}>{ title }</Text>
        </View>
    </TouchableWithoutFeedback>
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
        fontSize: 22
    }
  })