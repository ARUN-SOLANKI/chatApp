import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import React, {useState, useEffect} from 'react';
import {getItem} from '../utils/AsyncStorage';
const PostCollection = firestore().collection('Posts');

const Posts = () => {
  const [UserInfo, setUserInfo] = useState({
    email: '',
    uid: '',
  });

  const AddPost = async () => {
    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'any',
      });
      let fileNameArray = image.path.split('/');
      let fileName = `${fileNameArray[fileNameArray.length - 1]}`;
      const reference = storage().ref(`${fileName}`);
      console.log(image, 'vdfasdbj');
      let task = await reference.putFile(image.path);
      const PostCollectionRef = PostCollection.doc(UserInfo.uid)
        .collection('post')
        .doc()
        .set({
          collectionId: UserInfo.uid,
          email: UserInfo.email,
          postName: fileName,
          task: task.metadata,
        });
      console.log(task, '------------->image');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getcollection = async () => {
      const res: any = await getItem('EMAIL');
      const res1: any = await getItem('UID');
      setUserInfo({email: res, uid: res1});
    };
    getcollection();
  }, []);

  return (
    <View style={styles.PostContainer}>
      <TouchableOpacity style={styles.postBtn} onPress={AddPost}>
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
