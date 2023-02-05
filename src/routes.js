import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

// views
import Home from './screens/Home'
import Administrator from './screens/Administrator'
import Tenants from './screens/Tenants'
import Payments from './screens/Payments'
import Settings from './screens/Settings'

const Drawer = createDrawerNavigator()

export default function MyDrawer() {
  return (
    <Drawer.Navigator useLegacyImplementation>
      <Drawer.Screen name="INFORMACION BASICA" component={Home} />
      <Drawer.Screen name="ADMINISTRADOR" component={Administrator} />
      <Drawer.Screen name="INQUILINOS" component={Tenants} />
      <Drawer.Screen name="PAGOS" component={Payments} />
      <Drawer.Screen name="CONFIGURACION" component={Settings} />
    </Drawer.Navigator>
  );
}