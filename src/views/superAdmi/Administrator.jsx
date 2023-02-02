import React from 'react'
import Constants from 'expo-constants'
import { View } from 'react-native'

// custom components
import Title from '../../components/Title'
import HeaderCustom from '../../components/HeaderCustom'
import FormCustom from '../../components/FormCustom'

const text = 'Administrador'
// let dataForm = [
//     {label: "Nombre", value: '', duo: false},
//     {label: "Teléfono", value: '', duo: false},
//     {label: "Departamento", value: '', duo: false},
//     {label: "Provincia", value: '', duo: false},
//     {label: "Distrito", value: '', duo: false},
//     {label_1: "N° Piso", value_1: '', duo: true, label_2: "N° de Dptos", value_2: ''}
// ]


export default function Administrador() {
    let dataForm = [
            {label: "Nombre", value: "", placeholder: "Nombre del Administrador", duo: false},
            {label: "Teléfono", value: "", placeholder: "+51 987 654 321", duo: false},
            {label: "DNI", value: "", placeholder: "87654321", duo: false},
            {label: "Correo", value: "", placeholder: "example@gmail.com", duo: false},
            {label: "Contraseña", value: "", placeholder: "...", duo: false}
        ]
  return (
    <View style = {{ marginTop: Constants.statusBarHeight }}>
        <HeaderCustom />
        <Title text={ text } />
        <FormCustom />
    </View>
  )
}