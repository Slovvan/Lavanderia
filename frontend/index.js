import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './user/login';
import Register from './user/register';
import UpdateClient from './pages/updateClient';
import Client from './pages/dashboard';
import Create from './pages/createClient';

const Stack = createStackNavigator();


const MainApp = () => (
  <NavigationContainer >
    <Stack.Navigator initialRouteName='login' screenOptions={{headerShown: true}}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="client" component={Client} />
      <Stack.Screen name="createClient" component={Create} />
      <Stack.Screen name="updateClient" component={UpdateClient} />
    </Stack.Navigator>
  </NavigationContainer>
);

registerRootComponent(MainApp);

