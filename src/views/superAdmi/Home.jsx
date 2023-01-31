import React from 'react'
import Constants from 'expo-constants'
import { ScrollView, View, StyleSheet, SafeAreaView } from 'react-native'

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
        <ScrollView>
          <InputCustom label="Nombre" placeholder="Nombre del Edificio" pad={ true } />
          <InputCustom label="Telefono" placeholder="+51 987 654 321" pad={ true } />
          <InputCustom label="Departemento" placeholder="Lambayeque" pad={ true } />
          <InputCustom label="Provincia" placeholder="Chiclayo" pad={ true } />
          <InputCustom label="Distrito" placeholder="Chiclayo" pad={ true } />
          <SafeAreaView style = { styles.containerGroupInput }>
            <View style = { [styles.box, {marginRight: '4%'}] }>
              <InputCustom label="N° Piso" placeholder="5" numeric={ true } />
            </View>
            <View style = { [styles.box, {marginLeft: '4%'} ]}>
              <InputCustom label="N° de Dptos" placeholder="10" numeric={ true } />
            </View>
          </SafeAreaView>
          <View style= {{ height: 240 }}>
            <MainBtn title='Guardar' />
          </View>
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
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