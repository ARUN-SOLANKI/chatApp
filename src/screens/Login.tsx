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
import React, {useState, useEffect} from 'react';
import {signInWithFirebase} from '../utils/firebase';
import {setItem} from '../utils/AsyncStorage';

const Login = ({navigation, isLogIn}: any) => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    error: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const userData = (key: string, value: string) => {
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

  const Login = async () => {
    if (userInfo.email && userInfo.password) {
      setIsLoading(true);
      const res = await signInWithFirebase(userInfo.email, userInfo.password);
      if (res?.user?.uid) {
        setItem('UID', res?.user?.uid);
        setUserInfo({
          email: '',
          password: '',
          error: '',
        });
        navigation.navigate('Home');
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      setUserInfo({
        ...userInfo,
        error: 'fields should not be Empty',
      });
      errTime();
    }
  };

  useEffect(() => {
    if (isLogIn) {
      console.log(isLogIn, 'bdkcnsdjvbaksbsdkcnskxxfnckd');
      // navigation.navigate('Home');
    }
  }, [isLogIn]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.loginContainer}>
        <Text style={styles.header}>Welcome !</Text>

        <TextInput
          keyboardType="email-address"
          placeholder="Enter You Email"
          placeholderTextColor="#577072"
          style={styles.textInput}
          value={userInfo.email}
          onChangeText={e => userData('email', e)}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Enter Password"
          style={styles.textInput}
          placeholderTextColor="#577072"
          value={userInfo.password}
          onChangeText={e => userData('password', e)}
        />
        <TouchableOpacity style={styles.submitBtn} onPress={Login}>
          {isLoading ? (
            <ActivityIndicator color="red" size="small" />
          ) : (
            <Text style={styles.submitBtnText}>Login</Text>
          )}
        </TouchableOpacity>
        <View style={styles.lineContainer}>
          <View style={styles.line}></View>
          <Text style={styles.OR}>OR</Text>
          <View style={styles.line}></View>
        </View>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.submitBtnText}>Create an Account</Text>
        </TouchableOpacity>

        {userInfo.error ? (
          <Text style={styles.errorStyle}>{userInfo.error}</Text>
        ) : null}
      </View>
    </View>
  );
};

export default Login;

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
