import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import React, {useEffect, useState} from 'react';
import Home from '../screens/Home';
import Chats from '../screens/Chats';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen
        name="Chats"
        component={Chats}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default MyStack;
