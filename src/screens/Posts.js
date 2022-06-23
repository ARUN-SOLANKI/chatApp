import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  DevSettings,
  Image
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";
import React, { useState, useEffect } from "react";
import { getItem } from "../utils/AsyncStorage";
import _ from "underscore";
const PostCollection = firestore().collection("Posts");

const Posts = () => {
  const [UserInfo, setUserInfo] = useState({
    email: "",
    uid: ""
  });
  const [post, setPosts] = useState([]);
  const [urls, setUrls] = useState([]);

  const AddPost = async () => {
    try {
      const image = await ImagePicker.openPicker({
        mediaType: "any"
      });
      let fileNameArray = image.path.split("/");
      let fileName = `${fileNameArray[fileNameArray.length - 1]}`;
      // const reference = storage().ref(`${UserInfo.uid}/${fileName}`);
      const reference = storage().ref(`${fileName}`);
      console.log(image, "vdfasdbj");
      let task = await reference.putFile(image.path);
      const url = await storage().ref(fileName).getDownloadURL();
      const PostCollectionRef = PostCollection.doc(UserInfo.uid)
        .collection("post")
        .doc()
        .set({
          collectionId: UserInfo.uid,
          email: UserInfo.email,
          postName: fileName,
          task: task.metadata,
          imageUrl: url
        });
      console.log(task, "------------->image");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getcollection = async () => {
      const res = await getItem("EMAIL");
      const res1 = await getItem("UID");
      setUserInfo({ email: res, uid: res1 });
    };
    getcollection();
    geturls();
  }, [UserInfo.uid]);

  const geturls = async () => {
    PostCollection.doc(UserInfo.uid)
      .collection("post")
      .onSnapshot(documentSnapshot => {
        const data = documentSnapshot.docs.map(item => item.data());
        setPosts(data);
      });
  };

  console.log(post, "postpostpostpostpostpostpostpostpostpost");
  return (
    <View style={styles.PostContainer}>
      <TouchableOpacity style={styles.postBtn} onPress={AddPost}>
        <Text style={styles.postBtnText}>Add Post</Text>
      </TouchableOpacity>
      {post?.map(item =>
        <TouchableOpacity style={{width:150 , height:150}}>
          <Image source={{uri : item?.imageUrl}} style={{width:100, height:100}} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  PostContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  postBtn: {
    backgroundColor: "#dfde33",
    padding: 15,
    borderRadius: 5
  },
  postBtnText: {
    fontSize: 20,
    color: "#fff"
  }
});
