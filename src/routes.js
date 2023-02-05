import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

// views
import Home from './screens/Home'
import Administrator from './screens/Administrator'

const Drawer = createDrawerNavigator()

export default function MyDrawer() {
  return (
    <Drawer.Navigator useLegacyImplementation>
      <Drawer.Screen name="INFORMACION BASICA" component={Home} />
      <Drawer.Screen name="ADMINISTRADOR" component={Administrator} />
    </Drawer.Navigator>
  );
}