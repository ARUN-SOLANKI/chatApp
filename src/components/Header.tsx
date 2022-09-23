import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import backBtn from '../assets/backBtn.png';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Header = ({receiver, navigation}: any) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={backBtn} style={styles.backbtn} />
      </TouchableOpacity>
      <View style={styles.Img}></View>
      <Text style={styles.headerName}>{receiver.name}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dfde33',
    paddingHorizontal: 10,
    height: 60,
  },
  headerName: {
    fontSize: 20,
    color: '#fff',
    marginHorizontal: 10,
  },
  Img: {
    height: 40,
    width: 40,
    backgroundColor: '#ccc',
    borderRadius: 20,
    marginLeft: 10,
  },
  backbtn: {
    height: 25,
    width: 25,
  },
});
