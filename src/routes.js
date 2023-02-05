import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

// views
import HomeSuperAdmi from './screens/SuperAdmi/HomeSuperAdmi'
import Administrator from './screens/SuperAdmi/Administrator'

const Drawer = createDrawerNavigator()

export default function MyDrawer() {
  return (
    <Drawer.Navigator useLegacyImplementation>
      <Drawer.Screen name="Home" component={HomeSuperAdmi} />
      <Drawer.Screen name="Administrador" component={Administrator} />
    </Drawer.Navigator>
  );
}