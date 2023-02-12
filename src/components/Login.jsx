import React from 'react'
import { useFonts } from 'expo-font'

// Firebase
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../firebase-config';
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet, ImageBackground, Image, useColorScheme } from 'react-native';

import { useNavigation } from '@react-navigation/native';


export default function LoginScreen() {
  
  const [email, SetEmail] = React.useState('')
  const [password, SetPassword] = React.useState('')
  const navigation = useNavigation()
  
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  const [fontsCustom] = useFonts({
    Light: require("../../assets/fonts/Poppins-ExtraLight.ttf"),
    Regular: require("../../assets/fonts/Poppins-Regular.ttf"),
    Medium: require("../../assets/fonts/Poppins-Medium.ttf")
  })

  const image = require(`../../assets/LoginScreen.png`)
  const logo = require(`../../assets/logoLight.png`)

  const theme = useColorScheme()
  
  if (!fontsCustom) return null
  
  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=> {
      console.log('Account created')
      const user = userCredential.user
      console.log(user)
    })
    .catch(error => {
      console.log(error)
      Alert.alert(error.message)
    })
  }

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Signed in!')
      const user = userCredential.user
      console.log(user)
      navigation.navigate('MyDrawer')
    })
    .catch(error => {
      console.log(error)
    })
  }

  return( 
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <Image style={styles.logo} source={logo}></Image>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <View style={styles.groupInput}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={[styles.input, {backgroundColor: theme === 'dark' ? '#fff' : '#fff'}]}  onChangeText={ (text) => SetEmail(text) } />
        </View>
        <View style={styles.groupInput}>
          <Text style={styles.label} >Password</Text>
          <TextInput style={[styles.input, {backgroundColor: theme === 'dark' ? '#fff' : '#fff'}]}  onChangeText={ (text) => SetPassword(text) } />
        </View>
        <TouchableOpacity style={styles.btnSignUp} onPress={handleSignIn}>
          <Text style={styles.btnText}>Ingresar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnForgetPassword} onPress={handleCreateAccount}>
          <Text style={{fontFamily: 'Light', fontSize: 12}}>Olvido su contraseña?</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  logo: {
    width: 85, 
    height: 85,
    marginBottom: 30
  },
  title: {
    fontSize: 35,
    lineHeight: 40,
    fontFamily: 'Medium',
    marginBottom: 60
  },
  groupInput: {
    width: '85%',
    marginBottom: 30
  },
  label: {
    fontSize: 22,
    paddingLeft: 20,
    lineHeight: 25,
    fontFamily: 'Regular'
  },
  input: {
    height: 55,
    marginTop: 10,
    borderRadius: 5
  },
  btnSignUp: {
    backgroundColor: '#395065',
    width: '85%',
    height: 50,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 22, 
    lineHeight: 25,
    fontFamily: 'Regular'
  },
  btnForgetPassword: {
    position: 'absolute',
    bottom: 50
  }
})