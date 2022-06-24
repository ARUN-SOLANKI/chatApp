import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  DevSettings,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import React, {useState, useEffect} from 'react';
import {getItem} from '../utils/AsyncStorage';
import _ from 'underscore';
const PostCollection = firestore().collection('Posts');

const Posts = () => {
  const [UserInfo, setUserInfo] = useState({
    email: '',
    uid: '',
  });
  const [Data, setData] = useState([]);
  const AddPost = async () => {
    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'any',
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

  useEffect(() => {
    getdataftat();
  }, [UserInfo.uid]);

  const getdataftat = async () => {
    const newData = [];
    const subscriber = await PostCollection.get();
    const data = subscriber._docs.map(item => item.id);
    for (const post of data) {
      try {
        const postRef = await PostCollection.doc(post).collection('post').get();
        postRef._docs.forEach(item => {
          return newData.push(item._data);
        });
        setData(newData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(Data, '----------------------');

  return (
    <View style={styles.PostContainer}>
      {/* <TouchableOpacity style={styles.postBtn} onPress={AddPost}>
        <Text style={styles.postBtnText}>Add Post</Text>
      </TouchableOpacity> */}
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
