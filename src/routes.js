import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import colors from "./res/colors"

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
    <Drawer.Navigator initialRouteName='Home' screenOptions={{
      drawerStyle: {
        backgroundColor: colors.primary,
        width: 270,
      },
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: '#FFF'
    }}

      drawerContent={(props) => <Menu {...props} />}
    >
      <Drawer.Screen options={{ title: 'CBUILDING' }} name="Home" component={Home} />
      <Drawer.Screen options={{ title: 'CBUILDING' }} name="Administrador" component={Administrator} />
      <Drawer.Screen options={{ title: 'CBUILDING' }} name="Inquilinos" component={Tenants} />
      <Drawer.Screen options={{ title: 'CBUILDING' }} name="Pagos" component={Payments} />
      <Drawer.Screen options={{ title: 'CBUILDING' }} name="Configuracion" component={Settings} />
    </Drawer.Navigator>
  );
} 