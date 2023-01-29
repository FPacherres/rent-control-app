import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native';
import image from './assets/backgroundMainImage.jpg'

let onPressMe = () => {
  Alert.alert('Hola soy Fabian')
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Hola Mundo
      </Text>
      <Button 
        title="Mas Detalles"
        onPress={onPressMe}
        style={styles.btn}
        accessibilityLabel="Hola soy fabian"
      />
      {/* <Image 
        source = {image} 
        style={styles.image}  
      /> */}
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF0000',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  title: {
    fontSize: 50,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  btn: {
    backgroundColor: '#841584',
    marginTop: 10
  }
});
