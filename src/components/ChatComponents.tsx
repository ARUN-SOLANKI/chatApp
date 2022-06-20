import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ChatComponents = ({item, receiver, sender}: any) => {
  console.log(item, receiver, sender, 'item here');
  return (
    <View style={styles.messageContainer}>
      {sender.uid == item.senderId ? (
        <Pressable style={styles.message}>
          <Text style={styles.messageText}>{item.title}</Text>
        </Pressable>
      ) : (
        <Pressable style={styles.message1}>
          <Text style={styles.messageText}>{item.title}</Text>
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
    backgroundColor: 'red',
  },
});
