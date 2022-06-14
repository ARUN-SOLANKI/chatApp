import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './src/navigations/MyStack';
import {getItem} from './src/utils/AsyncStorage';

const App = () => {
  const [isLogIn, setIsLogIn] = useState<any>('');
  useEffect(() => {
    IsuserLogIn();
  }, []);

  const IsuserLogIn = async () => {
    const res: any = await getItem('UID');
    if (res) {
      setIsLogIn(res);
    }
  };

  console.log(isLogIn, 'setIsLogIn --------------->');

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <MyStack isLogIn={isLogIn} />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
