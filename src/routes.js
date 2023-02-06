import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

// views
import Home from './screens/Home'
import Administrator from './screens/Administrator'
import Tenants from './screens/Tenants'
import Payments from './screens/Payments'
import Settings from './screens/Settings'
// Menu
import Menu from './components/Menu'

const Drawer = createDrawerNavigator()

export default function MyDrawer() {
  return (
    <Drawer.Navigator 
      drawerContent={(props)=> <Menu {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Inquilinos" component={Tenants} />
      <Drawer.Screen name="Pagos" component={Payments} />
      <Drawer.Screen name="Configuracion" component={Settings} />
    </Drawer.Navigator>
  );
} 