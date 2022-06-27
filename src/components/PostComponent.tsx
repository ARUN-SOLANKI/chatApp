import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

const PostComponent = ({item}) => {
  console.log(item, '------0000999998888777766665555444');
  return (
    <View style={{flex: 1, marginVertical: 10}}>
      <ImageBackground
        source={{uri: item?.imageUrl}}
        resizeMode="cover"
        style={styles.postContainer}>
        <TouchableOpacity style={styles.userContainer}>
          <View style={styles.dpContaner}></View>
          <Text style={styles.dpName}>{item.email}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default PostComponent;

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    height: 700,
  },
  userContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'rgba(33,33,33,0.2)',
  },
  dpContaner: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#577072',
  },
  dpName: {
    color: '#fff',
    fontSize: 20,
    marginHorizontal: 10,
  },
});
