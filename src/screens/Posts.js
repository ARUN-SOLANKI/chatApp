import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import React from 'react';

const Posts = () => {
  return (
    <View style={styles.PostContainer}>
      <TouchableOpacity style={styles.postBtn}>
        <Text style={styles.postBtnText}>Add Post</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  PostContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postBtn: {
    backgroundColor: '#dfde33',
    padding: 15,
    borderRadius: 5,
  },
  postBtnText: {
    fontSize: 20,
    color: '#fff',
  },
});
