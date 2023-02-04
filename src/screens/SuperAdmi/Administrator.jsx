import React from 'react'
import { View, SafeAreaView, FlatList, StyleSheet, Dimensions } from 'react-native'
import Constants from 'expo-constants'
import InputCustom from '../../components/InputCustom'
import MainBtn from '../../components/MainBtn'
import Title from '../../components/Title'

let ScreenHeight = Dimensions.get("window").height;

export default function Administrator() {
  const inputs = [
    {id: '0', label: "Nombre", value: "", placeholder: "Nombre del Administrador"},
    {id: '1', label: "Teléfono", value: "", placeholder: "+51 987 654 321"},
    {id: '2', label: "DNI", value: "", placeholder: "87654321"},
    {id: '3', label: "Correo", value: "", placeholder: "example@gmail.com"},
    {id: '4', label: "Contraseña", value: "", placeholder: "*************" }
  ]
  return (
    <SafeAreaView style = { styles.container }>
      <View>
        <Title text="Administrador" />
        <FlatList
          data = {inputs}
          renderItem = { ({item})=> <InputCustom input={item} pad={ true } numeric={false} /> }
          keyExtractor = { item => item.id }
        />
      </View>
      <MainBtn title='Guardar' />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: ScreenHeight,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: Constants.statusBarHeight,
    paddingBottom: 30
  }
})
