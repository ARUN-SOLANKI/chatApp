import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ChatComponents = ({item, receiver, sender}: any) => {
  return (
    <View style={styles.messageContainer}>
      {sender.uid !== item.senderId ? (
        <Pressable style={styles.message}>
          <Text style={styles.messageText}>{item.title}</Text>
          <Text style={{color: '#000'}}>{item.createAt}</Text>
        </Pressable>
      ) : (
        <Pressable style={styles.message1}>
          <View>
            <Text style={styles.messageText1}>{item.title}</Text>
            <Text style={{color: '#000'}}>{item.createAt}</Text>
          </View>
        </Pressable>
      )}
    </View>
  );
};

export default ChatComponents;

const styles = StyleSheet.create({
  messageContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  message: {
    backgroundColor: '#dadada',
    width: '75%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    borderBottomEndRadius: 10,
    borderTopEndRadius: 10,
  },
  messageText: {
    color: 'red',
    fontSize: 18,
  },
  message1: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    backgroundColor: '#dfde33',
    width: '75%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    borderBottomStartRadius: 10,
    borderTopStartRadius: 10,
  },
  messageText1: {
    color: '#fff',
    fontSize: 18,
  },
});
