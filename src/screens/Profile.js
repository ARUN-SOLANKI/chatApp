import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {getItem} from '../utils/AsyncStorage';
import userIcon from '../assets/userIcon.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
const userCollection = firestore().collection('users');

const Profile = ({navigation}: any) => {
  const [collectionName, setCollectionName] = useState({});
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

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.profileContainer}>
      <View></View>
      <View style={styles.mainContent}>
        <TouchableOpacity>
          <Image
            source={userIcon}
            style={{
              width: 100,
              height: 100,
              backgroundColor: '#fff',
              borderRadius: 50,
              marginVertical: 10,
            }}
          />
        </TouchableOpacity>
        {userList?.map(item => {
          return (
            item.uid == collectionName.uid && (
              <View style={styles.logoutContainer}>
                <View style={styles.nameContainer}>
                  <Text style={styles.headerName}>Name :- </Text>
                  <Text style={styles.ProileName}>
                    {item.uid == collectionName.uid
                      ? item.userName
                      : item.email}
                  </Text>
                </View>
                <View style={styles.nameContainer}>
                  <Text style={styles.headerName}>EMAIl :- </Text>
                  <Text style={styles.ProileName}>{item.email}</Text>
                </View>
              </View>
            )
          );
        })}
      </View>
      <TouchableOpacity onPress={clearAll} style={styles.LogoutBtn}>
        <Text style={styles.LogoutBtnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  logoutContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    width: '90%',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
  },
  LogoutBtn: {
    backgroundColor: '#dfde33',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  LogoutBtnText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  ProileName: {
    fontSize: 25,
    color: '#dfde33',
    marginVertical: 5,
  },
  headerName: {
    fontSize: 25,
    fontWeight: '700',
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
