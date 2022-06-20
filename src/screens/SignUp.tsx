import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {createUser} from '../utils/firebase';
import {signUpResInterface} from '../utils/Interfaces';
import {userInfoType, navigationPropType} from '../utils/Types';
import firestore from '@react-native-firebase/firestore';
const userCollection = firestore().collection('users');

type Proptype = {
  navigation: navigationPropType;
};

const SignUp = ({navigation}: Proptype) => {
  const [userInfo, setUserInfo] = useState<userInfoType>({
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const SignUp = async () => {
    if (
      userInfo.email &&
      userInfo.password &&
      userInfo.confirm &&
      userInfo.name
    ) {
      setIsLoading(true);
      if (userInfo.password == userInfo.confirm) {
        const res: any = await createUser(userInfo.email, userInfo.password);
        if (res?.user?.uid) {
          userCollection.doc(res?.user?.uid).set({
            createdAt: new Date(),
            email: res?.user?.email,
            uid: res?.user?.uid,
            loginTime: {},
            userName: userInfo.name,
          });

          setUserInfo({
            email: '',
            password: '',
            confirm: '',
            error: '',
            name: '',
          });
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setUserInfo({
            ...userInfo,
            error: res,
          });
          errTime();
        }
      } else {
        setIsLoading(false);
        setUserInfo({
          ...userInfo,
          error: 'password and confirm password should be same',
        });
        errTime();
      }
    } else {
      setUserInfo({
        ...userInfo,
        error: 'field should not be empty',
      });
      errTime();
    }
  };
  const UserInfo = (key: string, value: string) => {
    setUserInfo({
      ...userInfo,
      [key]: value,
    });
  };

  const errTime = () => {
    setTimeout(() => {
      setUserInfo({
        ...userInfo,
        error: '',
      });
    }, 3000);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.loginContainer}>
        <Text style={styles.header}>Welcome !</Text>

        <TextInput
          placeholder="Enter You Name"
          placeholderTextColor="#577072"
          style={styles.textInput}
          value={userInfo.name}
          onChangeText={e => UserInfo('name', e)}
        />
        <TextInput
          keyboardType="email-address"
          placeholder="Enter You Email"
          placeholderTextColor="#577072"
          style={styles.textInput}
          value={userInfo.email}
          onChangeText={e => UserInfo('email', e)}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Enter Password"
          style={styles.textInput}
          placeholderTextColor="#577072"
          value={userInfo.password}
          onChangeText={e => UserInfo('password', e)}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Confirm Password"
          style={styles.textInput}
          placeholderTextColor="#577072"
          value={userInfo.confirm}
          onChangeText={e => UserInfo('confirm', e)}
        />
        <TouchableOpacity style={styles.submitBtn} onPress={SignUp}>
          {isLoading ? (
            <ActivityIndicator color="red" size="small" />
          ) : (
            <Text style={styles.submitBtnText}>SignUp</Text>
          )}
        </TouchableOpacity>
        <View style={styles.lineContainer}>
          <View style={styles.line}></View>
          <Text style={styles.OR}>OR</Text>
          <View style={styles.line}></View>
        </View>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.submitBtnText}>Login</Text>
        </TouchableOpacity>

        {userInfo.error ? (
          <Text style={styles.errorStyle}>{userInfo.error}</Text>
        ) : null}
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    display: 'flex',
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#577072',
    width: '100%',
    borderRadius: 10,
  },
  header: {
    color: '#fff',
    fontSize: 30,
    marginVertical: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#181e27',
    marginVertical: 10,
    width: '100%',
    paddingVertical: Platform.OS == 'ios' ? 12 : 7,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  submitBtn: {
    backgroundColor: '#181e27',
    padding: 10,
    width: '100%',
    marginVertical: 10,
  },
  submitBtnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
  lineContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  line: {
    borderWidth: 1,
    width: '40%',
    marginVertical: 20,
  },
  OR: {
    color: '#fff',
    marginHorizontal: 5,
  },
  errorStyle: {
    textAlign: 'center',
    marginVertical: 10,
    color: 'red',
    fontSize: 16,
    width: '100%',
  },
});
