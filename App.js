import 'react-native-gesture-handler';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/components/Login';
import MyDrawer from './src/routes'
import { Provider } from 'react-redux';
import store from './src/store/app'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name="MyDrawer" component={MyDrawer} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

