import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import ChatComponents from '../components/ChatComponents';

const Chats = ({navigation, route}: any) => {
  const [chatValue, setChatValue] = useState('');
  const {sender, receiver} = route.params;
  console.log(sender, receiver);
  return (
    <View style={styles.chatContainer}>
      <View>
        <ChatComponents />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          keyboardType="default"
          style={styles.chatInputs}
          placeholder="write message here"
          placeholderTextColor="#577072"
          value={chatValue}
        />
        <TouchableOpacity style={styles.sendButton}>
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
    flex: 1,
    // width: '100%',
    // height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 10,
    alignSelf: 'flex-end',

    // justifyContent: 'space-between',
  },
  chatInputs: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 2,
    width: '50%',
    height: 50,
  },
  sendButton: {
    backgroundColor: '#577072',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  sendButtonText: {
    color: '#fff',
  },
});
