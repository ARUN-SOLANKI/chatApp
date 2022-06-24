import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
const PostCollection = firestore().collection('Posts');
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {getItem} from '../utils/AsyncStorage';
import React, {useState, useEffect} from 'react';

const AddPostBtn = ({btnPosition = {}}) => {
  const [UserInfo, setUserInfo] = useState({
    email: '',
    uid: '',
  });
  const AddPost = async () => {
    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
      });
      let fileNameArray = image.path.split('/');
      let fileName = `${fileNameArray[fileNameArray.length - 1]}`;
      const reference = storage().ref(`${fileName}`);
      let task = await reference.putFile(image.path);
      const url = await storage().ref(fileName).getDownloadURL();
      PostCollection.doc(UserInfo.uid).set({
        email: UserInfo.email,
        uid: UserInfo.uid,
      });
      const PostCollectionRef = PostCollection.doc(UserInfo.uid)
        .collection('post')
        .doc()
        .set({
          collectionId: UserInfo.uid,
          email: UserInfo.email,
          postName: fileName,
          task: task.metadata,
          imageUrl: url,
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getcollection = async () => {
      const res = await getItem('EMAIL');
      const res1 = await getItem('UID');
      setUserInfo({email: res, uid: res1});
    };
    getcollection();
  }, []);

  return (
    <TouchableOpacity style={[styles.postBtn, btnPosition]} onPress={AddPost}>
      <Text style={styles.postBtnText}>+</Text>
    </TouchableOpacity>
  );
};

export default AddPostBtn;

const styles = StyleSheet.create({
  postBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dfde33',
    borderRadius: 25,
    height: 50,
    width: 50,
  },
  postBtnText: {
    fontSize: 30,
    color: '#fff',
  },
});
