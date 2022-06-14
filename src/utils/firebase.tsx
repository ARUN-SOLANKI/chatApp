import auth from '@react-native-firebase/auth';

export const createUser = async (email: string, password: string) => {
  try {
    const res = await auth().createUserWithEmailAndPassword(email, password);
    if (res) {
      return res;
    }
  } catch (error: any) {
    if (error?.code === 'auth/email-already-in-use') {
      return 'That email address is already in use!';
    }
    if (error?.code === 'auth/invalid-email') {
      return 'That email address is invalid!';
    }
  }
};

export const signInWithFirebase = async (email: string, password: string) => {
  try {
    const res: any = await auth().signInWithEmailAndPassword(email, password);
    console.log(res);
    if (res) {
      return res;
    }
  } catch (error: any) {
    if (error?.code === 'auth/wrong-password') {
      return 'you entered a wrong password !';
    }
    if (error?.code === 'auth/user-not-found') {
      return 'not a user plese signup first';
    }
  }
};
