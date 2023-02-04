import React from 'react'
import { View, SafeAreaView, FlatList, StyleSheet, Dimensions, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import InputCustom from '../../components/InputCustom'
import MainBtn from '../../components/MainBtn'
import Title from '../../components/Title'

let ScreenHeight = Dimensions.get("window").height;

export default function HomeSuperAdmi() {
  const inputs = [
    { id: '0', label: "Nombre", value: "", placeholder: "Nombre del Edificio" },
    { id: '1', label: "Teléfono", value: "", placeholder: "+51 987 654 321" },
    { id: '2', label: "Departamento", value: "", placeholder: "Lambayeque" },
    { id: '3', label: "Provincia", value: "", placeholder: "Chiclayo" },
    { id: '4', label: "Distrito", value: "", placeholder: "Chiclayo" },
    { id: '5', label: "N° Piso", value: "", placeholder: "5" },
    { id: '6', label: "N° de Dptos", value: "", placeholder: "10" }
  ]
  return (
    <View style={{ marginTop: Constants.statusBarHeight }}>
      <Title text="Información Básica" />
      <SafeAreaView>
        <ScrollView>
          <FlatList
            data={inputs}
            renderItem={({ item }) => <InputCustom input={item} pad={true} numeric={false} />}
            keyExtractor={item => item.id}
          />
          <MainBtn title='Guardar' />
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // height: ScreenHeight,
    marginTop: Constants.statusBarHeight,
  }
})
