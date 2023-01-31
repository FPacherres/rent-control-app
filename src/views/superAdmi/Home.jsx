import React from 'react'
import Constants from 'expo-constants'
import { View } from 'react-native'

// custom components
import Title from '../../components/Title'
import HeaderCustom from '../../components/HeaderCustom'
import FormCustom from '../../components/FormCustom'

const text = 'Informacion Basica'

export default function Home() {
  return (
    <View style = {{ marginTop: Constants.statusBarHeight }}>
        <HeaderCustom />
        <Title text={ text } />
        <FormCustom />
    </View>
  )
}