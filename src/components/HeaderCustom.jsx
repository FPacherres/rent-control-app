import React from 'react'
import { Text, StyleSheet, View, TouchableWithoutFeedback } from 'react-native'

export default function HeaderCustom() {
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
        // backgroundColor: '#FF0000',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    title: {
      fontSize: 30,
      textTransform: 'uppercase',
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