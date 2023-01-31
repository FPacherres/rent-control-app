import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Title({ text }) {
  return (
    <View style={styles.container}>
        <Text style={styles.title} >{ text }</Text>
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
        paddingBottom: 10
    },
    title: {
      fontSize: 24,
      textTransform: 'uppercase',
    }
  })