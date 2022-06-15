import {StyleSheet, Text, View, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

const Home = ({navigation}: any) => {
  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (e) {
      console.log(e);
    }

    console.log('Done.');
  };
  return (
    <View style={{flex: 1}}>
      <Button title="Logout" onPress={clearAll} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
