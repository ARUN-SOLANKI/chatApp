import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  DevSettings,
  Image,
  FlatList
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";
import React, { useState, useEffect } from "react";
import { getItem } from "../utils/AsyncStorage";
import _ from "underscore";
import PostComponent from "../components/PostComponent";
const PostCollection = firestore().collection("Posts");

const Posts = () => {
  const [UserInfo, setUserInfo] = useState({
    email: "",
    uid: ""
  });
  const [Data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const AddPost = async () => {
    try {
      const image = await ImagePicker.openPicker({
        mediaType: "any"
      });
      let fileNameArray = image.path.split("/");
      let fileName = `${fileNameArray[fileNameArray.length - 1]}`;
      const reference = storage().ref(`${fileName}`);
      let task = await reference.putFile(image.path);
      const url = await storage().ref(fileName).getDownloadURL();
      PostCollection.doc(UserInfo.uid).set({
        email: UserInfo.email,
        uid: UserInfo.uid
      });
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
  }, []);

  useEffect(
    () => {
      getdataftat();
    },
    [UserInfo.uid]
  );

  const getdataftat = async () => {
    const newData = [];
    const subscriber = await PostCollection.get();
    const data = subscriber._docs.map(item => item.id);
    for (const post of data) {
      try {
        const postRef = await PostCollection.doc(post).collection("post").get();
        postRef._docs.forEach(item => {
          return newData.push(item._data);
        });
        const sortedData = _.sortBy(newData, item => item.task.timeCreated);
        setData(sortedData);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleRefresh = () => {
    setRefreshing(true);
    getdataftat();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View style={styles.PostContainer}>
      <FlatList
        data={Data}
        renderItem={({ item }) => {
          return <PostComponent item={item} />;
        }}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  PostContainer: {
    flex: 1
  }
});
