import React from 'react'
import { ScrollView, View, StyleSheet, SafeAreaView } from 'react-native'

// custom components
import MainBtn from './MainBtn'
import InputCustom from './InputCustom'

const text = 'Informacion Basica'

export default function Home() {
  return (
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

// import React from 'react'
// import { ScrollView, View, StyleSheet, SafeAreaView } from 'react-native'

// // custom components
// import MainBtn from './MainBtn'
// import InputCustom from './InputCustom'

// export default function FormCustom(data) {
//   return (
//     <ScrollView>
//       {
//         data.map((d, i) => {
//           return d.duo
//             ?
//             <InputCustom key={i} info={d} pad={true} />
//             :
//             <SafeAreaView style={styles.containerGroupInput}>
//               <View style={[styles.box, { marginRight: '4%' }]}>
//                 <InputCustom info={{ label: d.label_1, value: d.value_1, placeholder: d.placeholder_1 }} numeric={true} />
//               </View>
//               <View style={[styles.box, { marginLeft: '4%' }]}>
//                 <InputCustom info={{ label: d.label_2, value: d.value_2, placeholder: d.placeholder_2 }} numeric={true} />
//               </View>
//             </SafeAreaView>
//         })
//       }
//       <View style={{ height: 240 }}>
//         <MainBtn title='Guardar' />
//       </View>
//     </ScrollView>
//   )
// }

// const styles = StyleSheet.create({
//   containerGroupInput: {
//     width: '100%',
//     height: 100,
//     display: 'flex',
//     flexDirection: 'row',
//     paddingHorizontal: 20,
//   },
//   box: {
//     width: '46%',
//     height: 40,
//   }
// })