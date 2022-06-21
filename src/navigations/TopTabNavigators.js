import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Chats from '../screens/Chats';
import Home from '../screens/Home';
import React from 'react';
import Posts from '../screens/Posts';
import Profile from '../screens/Profile';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Posts" component={Posts} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default MyTabs;
