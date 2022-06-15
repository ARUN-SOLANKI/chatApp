import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import React, {useEffect, useState} from 'react';
import Home from '../screens/Home';
import {getItem} from '../utils/AsyncStorage';

const Stack = createStackNavigator();
const [isLogIn, setIsLogIn] = useState<any>('');
useEffect(() => {
  IsuserLogIn();
}, []);

const IsuserLogIn = async () => {
  const res: any = await getItem('UID');
  console.log(res, 'async await storage ========');
  if (res) {
    // navigation.navigate('Home');
  }
};

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

export default MyStack;
