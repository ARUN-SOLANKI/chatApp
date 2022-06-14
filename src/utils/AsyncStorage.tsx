import AsyncStorage from '@react-native-async-storage/async-storage';
export const setItem = (key: string, value: any) => {
  AsyncStorage.setItem(key, value);
};

export const getItem = async (key: string) => {
  const item = await AsyncStorage.getItem(key);
  return item;
};
