import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import React from 'react';
import Home from '../screens/Home';

const Stack = createStackNavigator();

function MyStack({isLogIn}: any) {
  return (
    <Stack.Navigator initialRouteName={isLogIn ? 'Home' : 'Login'}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login">
        {() => <Login isLogIn={isLogIn} />}
      </Stack.Screen>
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

export default MyStack;
