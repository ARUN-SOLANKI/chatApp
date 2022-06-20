import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Header = ({receiver}: any) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.Img}></View>
      <Text style={styles.headerName}>{receiver.email}</Text>
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
  },
});
