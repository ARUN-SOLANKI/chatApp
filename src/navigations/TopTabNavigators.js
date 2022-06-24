import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Chats from '../screens/Chats';
import Home from '../screens/Home';
import React from 'react';
import Posts from '../screens/Posts';
import Profile from '../screens/Profile';
import AddPostBtn from '../components/AddPostBtn';
import {StyleSheet} from 'react-native';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <>
      <AddPostBtn btnPosition={styes.btnPosition} />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '500',
            color: '#dfde33',
            letterSpacing: 2,
          },

          tabBarStyle: {backgroundColor: '#577072'},
          tabBarPressColor: 'red',
          tabBarIndicatorStyle: {
            backgroundColor: '#fff',
            height: 2,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            color: '#fff',
            fontWeight: '500',
          },
          tabBarActiveColor: 'red',
          tabBarInactiveTintColor: 'red',
        }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Posts" component={Posts} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </>
  );
}

export default MyTabs;

const styes = StyleSheet.create({
  btnPosition: {
    position: 'absolute',
    right: 25,
    bottom: 25,
    zIndex: 1,
  },
});
