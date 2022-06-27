import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import React from 'react';
import Chats from '../screens/Chats';
import MyTabs from './TopTabNavigators';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="MyTabs"
        component={MyTabs}
        options={{headerShown: false, title: 'Users'}}
      />
      <Stack.Screen
        name="Chats"
        component={Chats}
        options={{headerShown: false}}
      />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

export default MyStack;
