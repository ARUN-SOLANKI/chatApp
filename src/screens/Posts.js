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
  const [Data, setData] = useState([]);
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
      // .onSnapshot(documentSnapshot => {
      //   const dataaaa = documentSnapshot.docs.map(item => {
      //     console.log(item, 'iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
      //     return item.data();
      //   });
      //   console.log(dataaaa, 'dataaaadataaaadataaaadataaaa');
      // })
      // return () => subscriber();
    },
    [UserInfo.uid]
  );

  const getdataftat = async () => {
    const pushedData = [];
    const subscriber = await firestore().collection("Posts").get();
    const hirosima = subscriber._docs.map(documentSnapshot => {
      let ref = documentSnapshot._docs.map(item => {
        return {
          data: item._data,
          id: item.id
        };
      });
      const data = ref.map(async item => {
        const data1 = await PostCollection.doc(item.id)
          .collection("post")
          .get();
        const innerData = data1._docs.map(data => {
          return data._data;
        });
        return innerData;
      });
      data.map(item => {
        item.then(res => {
          console.log(res, "res");
          pushedData.push(res);
        });
      });
    });

    setData(pushedData);
  };

  console.log(Data, "qwertyuiopp , final data ");

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
