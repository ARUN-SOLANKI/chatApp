import {StyleSheet, Button, View, FlatList, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigationPropType} from '../utils/Types';
import React, {useEffect, useState} from 'react';
import {getItem} from '../utils/AsyncStorage';

import firestore from '@react-native-firebase/firestore';
import UserList from '../components/UserList';
const userCollection = firestore().collection('users');
const chatCollection = firestore().collection('chats');

type Props = {
  navigation: navigationPropType;
};

const Home = ({navigation}: Props) => {
  const [collectionName, setCollectionName] = useState({email: '', uid: ''});
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const getcollection = async () => {
      const res: any = await getItem('EMAIL');
      const res1: any = await getItem('UID');

      setCollectionName({email: res, uid: res1});
    };
    getcollection();
    userCollection.onSnapshot(onResult, onError);
  }, []);

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (e) {
      console.log(e);
    }
  };

  const addCOllection = () => {
    chatCollection
      .doc(collectionName.email)
      .collection(collectionName.uid)
      .doc()
      .set({
        name: 'bhenchod',
      });
  };

  function onResult(QuerySnapshot: any) {
    const newArr: any = [];
    QuerySnapshot._docs.forEach((item: any) => {
      newArr.push(item._data);
    });
    setUserList(newArr);
  }

  function onError(error: Error) {
    console.error(error);
  }

  return (
    <View style={{flex: 1}}>
      <Text>{collectionName.email}</Text>
      <Button title="Logout" onPress={clearAll} />
      {/* <Chats /> */}
      <FlatList
        data={userList}
        renderItem={({item}) => {
          return (
            <UserList
              item={item}
              navigation={navigation}
              collectionName={collectionName}
            />
          );
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
