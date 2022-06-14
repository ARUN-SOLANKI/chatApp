import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Button,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const Login = ({navigation}: any) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.loginContainer}>
        <Text style={styles.header}>Welcome !</Text>

        <TextInput
          keyboardType="email-address"
          placeholder="Enter You Email"
          placeholderTextColor="#577072"
          style={styles.textInput}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Enter Password"
          style={styles.textInput}
          placeholderTextColor="#577072"
        />
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.lineContainer}>
          <View style={styles.line}></View>
          <Text style={styles.OR}>OR</Text>
          <View style={styles.line}></View>
        </View>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.submitBtnText}>Create an Account</Text>
        </TouchableOpacity>
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
});
