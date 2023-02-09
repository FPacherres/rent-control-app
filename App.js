import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyDrawer from './src/routes';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './firebase-config';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';

export default function App() {
  return (
    <LoginScreen />
    // <NavigationContainer>
    //   <MyDrawer />
    // </NavigationContainer>
  );
}

function LoginScreen() {

  const [email, SetEmail] = React.useState('')
  const [password, SetPassword] = React.useState('')

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

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
    })
    .catch(error => {
      console.log(error)
    })
  }

  return( 
    <View style={{paddingTop: 200, paddingLeft: 60}}>
      <Text>Login</Text>
      <View>
        <Text>Email</Text>
        <TextInput style={{backgroundColor:"#990000", width: 200, marginTop: 50, height: 50}}  onChangeText={ (text) => SetEmail(text) } />
      </View>
      <View>
        <Text style={{marginTop: 50}} >Password</Text>
        <TextInput style={{backgroundColor:"#330000", width: 200, height: 50}}  onChangeText={ (text) => SetPassword(text) } />
      </View>
      <TouchableOpacity style={{backgroundColor:"#FF0000", width: 100, marginTop: 50, height: 30}} onPress={handleSignIn}>
        <Text>Ingresar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{backgroundColor:"#00FF00", width: 100, marginTop: 50, height: 30}} onPress={handleCreateAccount}>
        <Text>Crear cuenta</Text>
      </TouchableOpacity>
    </View>
  )
}