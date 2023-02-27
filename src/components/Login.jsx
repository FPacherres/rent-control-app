import React, { useState, useEffect } from 'react'
import { useFonts } from 'expo-font'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ImageBackground, Image, useColorScheme, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Firebase
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, collection, addDoc, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore'
import app from '../firebase'

import { useDispatch } from 'react-redux';
import { getTypeUser, getIdUser } from '../store/auth'

import colors from '../res/colors';

export default function LoginScreen() {

  const db = getFirestore(app)
  const dispatch = useDispatch()

  const [email, SetEmail] = useState('')
  const [password, SetPassword] = useState('')
  const [forgotPassword, SetForgotPassword] = useState(false)
  const navigation = useNavigation()

  const auth = getAuth(app)

  const [fontsCustom] = useFonts({
    Light: require("../../assets/fonts/Poppins-ExtraLight.ttf"),
    Regular: require("../../assets/fonts/Poppins-Regular.ttf"),
    Medium: require("../../assets/fonts/Poppins-Medium.ttf")
  })
  const image = require(`../../assets/LoginScreen.png`)
  const logo = require(`../../assets/logoLight.png`)

  // const [data, setData] = useState([])
  const [typeUser, SetTypeUser] = useState([])

  // const getUsers = async () => {
  //   try {
  //     const users = await getDocs(collection(db, "users"));
  //     setData([
  //         ...users.docs.map(doc => {
  //           let obj = doc.data()
  //           const key = doc._document.key.path.segments[6]
  //           return { ...obj, key: key }
  //         })
  //     ]);
  //   } catch (error) {
  //     console.log(error);
  //     Alert.alert(error.message);
  //   }
  // }

  // useEffect(() => {
    //   return () => setData([])
    // }, [])
    
    if (!fontsCustom) return null
    
    const handleSignIn = async () => {
      // await getUsers()
      // dispatch(getUsersStore(data))
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Signed in!')
        dispatch(getTypeUser(typeUser))
        dispatch(getIdUser(userCredential.user.uid))
        // console.log(userCredential.user.uid)
        // dispatch(getCurrentUserKey(userCredential))
        // dispatch(getUserStore())
        navigation.navigate('MyDrawer')
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Image style={styles.logo} source={logo}></Image>
        <Text style={styles.title}>{forgotPassword ? 'Recuperar Cuenta' : 'Iniciar Sesión'}</Text>
        <Text style={[styles.msgForgotPassword, { display: forgotPassword ? 'flex' : 'none' }]}>
          Ingrese su correo para que el Administrador recupere su cuenta en el transcurso de 24 horas.
        </Text>
        <View style={styles.groupInput}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={[styles.input, { backgroundColor: '#000000AA', color: '#FFF' }]} onChangeText={(text) => SetEmail(text.trim())} />
        </View>
        <View style={[styles.groupInput, { display: !forgotPassword ? 'flex' : 'none' }]}>
          <Text style={styles.label} >Password</Text>
          <TextInput style={[styles.input, { backgroundColor: '#000000AA', color: '#FFF' }]} onChangeText={(text) => SetPassword(text)} />
        </View>
        <View style={[styles.groupInput, { display: !forgotPassword ? 'flex' : 'none' }]}>
          <Text style={styles.label}>Tipo de usuario</Text>
          <TextInput style={[styles.input, { backgroundColor: '#000000AA', color: '#FFF' }]} onChangeText={(text) => SetTypeUser(text.trim())} />
        </View>
        <TouchableOpacity style={[styles.btnSignUp, { display: !forgotPassword ? 'flex' : 'none' }]}  onPress={handleSignIn}>
          <Text style={styles.btnText}>Ingresar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnSignUp, { display: forgotPassword ? 'flex' : 'none' }]}  onPress={() => Alert.alert("Acerquese con el Administrador para que le muestre su contraseña.")}>
          <Text style={styles.btnText}>Enviar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnForgetPassword} onPress={() => SetForgotPassword(!forgotPassword)}>
          <Text style={{ fontFamily: 'Light', fontSize: 12, color: "#FFF" }}>
            {forgotPassword ? 'Regresar' : 'Olvido su contraseña?'}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary
  },
  image: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingTop: 50,
    opacity: 0.7
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
    marginBottom: 60,
    color: '#FFF'
  },
  groupInput: {
    width: '85%',
    marginBottom: 30
  },
  label: {
    fontSize: 22,
    paddingLeft: 20,
    lineHeight: 25,
    fontFamily: 'Regular',
    color: "#FFF"
  },
  input: {
    height: 55,
    marginTop: 10,
    borderRadius: 5,
    paddingHorizontal: 20,
    fontFamily: 'Light',
  },
  btnSignUp: {
    backgroundColor: colors.btn,
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
    fontFamily: 'Regular',
    color: "#FFF"
  },
  btnForgetPassword: {
    marginTop: 50
  },
  msgForgotPassword: {
    fontFamily: 'Regular',
    fontSize: 18,
    paddingHorizontal: 20,
    textAlign: 'center',
    marginBottom: 50,
    color: "#FFF"
  }
})