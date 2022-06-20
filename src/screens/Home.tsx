import {StyleSheet, Button, View, FlatList, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigationPropType} from '../utils/Types';
import React, {useEffect, useState} from 'react';
import {getItem} from '../utils/AsyncStorage';

import firestore from '@react-native-firebase/firestore';
import UserList from '../components/UserList';
import {TouchableOpacity} from 'react-native-gesture-handler';
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
      {userList?.map(item => {
        return (
          item.uid == collectionName.uid && (
            <View style={styles.logoutContainer}>
              <Text style={styles.ProileName}>
                {item.uid == collectionName.uid ? item.userName : item.email}
              </Text>
              <TouchableOpacity onPress={clearAll} style={styles.LogoutBtn}>
                <Text style={styles.LogoutBtnText}>Logout</Text>
              </TouchableOpacity>
            </View>
          )
        );
      })}
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

const styles = StyleSheet.create({
  logoutContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    height: 50,
  },
  LogoutBtn: {
    backgroundColor: '#dfde33',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  LogoutBtnText: {
    fontSize: 16,
    color: '#fff',
  },
  ProileName: {
    fontSize: 20,
    color: '#dfde33',
  },
});
