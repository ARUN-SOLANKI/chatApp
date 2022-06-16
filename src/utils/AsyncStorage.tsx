import AsyncStorage from '@react-native-async-storage/async-storage';
export const setItem = (key: string, value: string): void => {
  AsyncStorage.setItem(key, value);
};

export const getItem = async (key: string): Promise<string | null> => {
  const item = await AsyncStorage.getItem(key);
  return item;
};
