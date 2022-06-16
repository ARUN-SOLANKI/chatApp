import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
const chatCollection = firestore().collection('chats');

const UserList = ({item, collectionName, navigation}: any) => {
  const addChat = async (item: any) => {
    chatCollection
      .doc(collectionName.uid)
      .set({ids: [collectionName.uid, item.uid]});
    navigation.navigate('Chats', {
      sender: collectionName,
      receiver: {uid: item?.uid, email: item?.email},
    });
  };

  return (
    <TouchableOpacity style={styles.userListBtn} onPress={() => addChat(item)}>
      <Text style={styles.userListText}>{item.email}</Text>
    </TouchableOpacity>
  );
};

export default UserList;

const styles = StyleSheet.create({
  userListBtn: {
    backgroundColor: '#577072',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  userListText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
});
