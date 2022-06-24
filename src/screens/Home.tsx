import {StyleSheet, Button, View, FlatList, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigationPropType} from '../utils/Types';
import React, {useEffect, useState} from 'react';
import {getItem} from '../utils/AsyncStorage';

import firestore from '@react-native-firebase/firestore';
import UserList from '../components/UserList';
import AddPostBtn from '../components/AddPostBtn';
const userCollection = firestore().collection('users');

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
