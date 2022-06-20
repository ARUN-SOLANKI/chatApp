import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import ChatComponents from '../components/ChatComponents';
import firestore from '@react-native-firebase/firestore';
const chatCollection = firestore().collection('chats');
import _ from 'underscore';

const Chats = ({navigation, route}: any) => {
  const [chatValue, setChatValue] = useState('');
  const [chats, setChats] = useState<any>([]);
  const {sender, receiver, connectedId} = route.params;

  const handleSend = async () => {
    if (chatValue) {
      await chatCollection.doc(connectedId).collection('messages').doc().set({
        sender: sender.email,
        senderId: sender.uid,
        recieverId: receiver.uid,
        receivermail: receiver.email,
        title: chatValue,
        createAt: new Date().toLocaleString(),
        connectedId: connectedId,
      });

      setChatValue('');
    }
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .doc(connectedId)
      .collection('messages')
      .onSnapshot(documentSnapshot => {
        const dataaaa = documentSnapshot.docs.map(item => item.data());
        const sortedData = _.sortBy(dataaaa, (item: any) => {
          return item.createAt;
        });

        setChats(sortedData);
      });
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  return (
    <View style={styles.chatContainer}>
      <>
        <FlatList
          data={chats}
          renderItem={({item}) => {
            return (
              <ChatComponents item={item} receiver={receiver} sender={sender} />
            );
          }}
        />
      </>
      <View style={styles.inputContainer}>
        <TextInput
          keyboardType="default"
          style={styles.chatInputs}
          placeholder="write message here"
          placeholderTextColor="#577072"
          value={chatValue}
          onChangeText={e => setChatValue(e)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    borderWidth: 2,
    justifyContent: 'space-between',
  },
  inputContainer: {
    // flex: 1,
    // width: '100%',
    // height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    // marginHorizontal: 10,
    alignSelf: 'flex-end',

    // justifyContent: 'space-between',
  },
  chatInputs: {
    flex: 1,

    width: '50%',
    height: 50,
  },
  sendButton: {
    backgroundColor: '#577072',
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 10,
    // width: '30%',
  },
  sendButtonText: {
    color: '#fff',
  },
});
