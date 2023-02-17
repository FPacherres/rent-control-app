import React from 'react'
import { useFonts } from 'expo-font'
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet, ImageBackground, Image, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Firebase
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import app from '../firebase'



export default function LoginScreen() {
  
  const [email, SetEmail] = React.useState('')
  const [password, SetPassword] = React.useState('')
  const [forgotPassword, SetForgotPassword] = React.useState(false)
  const navigation = useNavigation()
  
  const auth = getAuth(app)

  const [fontsCustom] = useFonts({
    Light: require("../../assets/fonts/Poppins-ExtraLight.ttf"),
    Regular: require("../../assets/fonts/Poppins-Regular.ttf"),
    Medium: require("../../assets/fonts/Poppins-Medium.ttf")
  })
  const theme = useColorScheme()
  const image = require(`../../assets/LoginScreen.png`)
  const logo = require(`../../assets/logoLight.png`)

  
  if (!fontsCustom) return null

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
        <Text style={styles.title}>{forgotPassword ? 'Recuperar Cuenta' : 'Iniciar Sesión'}</Text>
        <Text style={[styles.msgForgotPassword, {display: forgotPassword ? 'flex' : 'none'}]}>
          Ingrese su correo para que el Administrador recupere su cuenta en el transcurso de 24 horas.
        </Text>
        <View style={styles.groupInput}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={[styles.input, {backgroundColor: theme === 'dark' ? '#fff' : '#fff'}]}  onChangeText={ (text) => SetEmail(text.trim()) } />
        </View>
        <View style={[styles.groupInput, {display: !forgotPassword ? 'flex' : 'none'}]}>
          <Text style={styles.label} >Password</Text>
          <TextInput style={[styles.input, {backgroundColor: theme === 'dark' ? '#fff' : '#000'}]}  onChangeText={ (text) => SetPassword(text) } />
        </View>
        <TouchableOpacity style={styles.btnSignUp} onPress={handleSignIn}>
          <Text style={styles.btnText}>Ingresar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnForgetPassword} onPress={() => SetForgotPassword(!forgotPassword)}>
          <Text style={{fontFamily: 'Light', fontSize: 12}}>
            {forgotPassword ? 'Regresar' : 'Olvido su contraseña?'}
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.btnForgetPassword} onPress={handleCreateAccount}>
          <Text style={{fontFamily: 'Light', fontSize: 12}}>Olvido su contraseña?</Text>
        </TouchableOpacity> */}
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
    position: 'relative',
    paddingTop: 50
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
    borderRadius: 5,
    paddingHorizontal: 20,
    fontFamily: 'Light'
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
    marginTop: 50
  },
  msgForgotPassword: {
    fontFamily: 'Regular',
    fontSize: 18,
    paddingHorizontal: 20,
    textAlign: 'center',
    marginBottom: 50
  }
})