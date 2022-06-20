import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import ChatComponents from '../components/ChatComponents';
import firestore from '@react-native-firebase/firestore';
const chatCollection = firestore().collection('chats');

const Chats = ({navigation, route}: any) => {
  const [chatValue, setChatValue] = useState('');
  const {sender, receiver, connectedId} = route.params;
  console.log(connectedId);

  const handleSend = async () => {
    if (chatValue) {
      await chatCollection.doc(connectedId).collection('messages').doc().set({
        sender: sender.email,
        senderId: sender.uid,
        recieverId: receiver.uid,
        receivermail: receiver.email,
        title: chatValue,
        createAt: new Date(),
      });

      setChatValue('');
    }
  };

  return (
    <View style={styles.chatContainer}>
      <>
        <ChatComponents />
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