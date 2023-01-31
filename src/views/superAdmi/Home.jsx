import React from 'react'
import Constants from 'expo-constants'
import { View, StyleSheet, Button } from 'react-native'

// custom components
import Title from '../../components/Title'
import HeaderCustom from '../../components/HeaderCustom'
import MainBtn from '../../components/MainBtn'
import InputCustom from '../../components/InputCustom'

const text = 'Informacion Basica'

export default function Home() {
  return (
    <View style = {{ marginTop: Constants.statusBarHeight }}>
        <HeaderCustom />
        <Title text={ text } />
        <InputCustom label="Nombre" placeholder="Nombre del Edificio" />
        <InputCustom label="Telefono" placeholder="+51 987 654 321" />
        <InputCustom label="Departemento" placeholder="Lambayeque" />
        <InputCustom label="Provincia" placeholder="Chiclayo" />
        <InputCustom label="Distrito" placeholder="Chiclayo" />
        <MainBtn title='Guardar' />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1C2120',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    }
})