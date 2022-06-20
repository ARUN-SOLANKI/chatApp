import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ChatComponents = () => {
  return (
    <View style={styles.messageContainer}>
      <View style={styles.message}>
        <Text style={styles.messageText}>kvbsknvsdmnvdk,</Text>
      </View>
      <View style={styles.message}>
        <Text style={styles.messageText}>kvbsknvsdmnvdk,</Text>
      </View>
      <View style={styles.message}>
        <Text style={styles.messageText}>kvbsknvsdmnvdk,</Text>
      </View>
      <View style={styles.message}>
        <Text style={styles.messageText}>kvbsknvsdmnvdk,</Text>
      </View>
      <View style={styles.message}>
        <Text style={styles.messageText}>kvbsknvsdmnvdk,</Text>
      </View>
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
});
