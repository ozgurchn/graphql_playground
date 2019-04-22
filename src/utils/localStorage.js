import { AsyncStorage } from 'react-native';
// import I18n from './i18n';

export const setStoreData = async (key, value) => {
  try {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    // Error saving data
    return false;
  }
};

export const getStoreData = async key => {
  let value;
  try {
    value = await AsyncStorage.getItem(key);
    if (JSON.parse(value) !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    // Error geting data
  }
  return value;
};

export const removeStoredData = async key => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (err) {
    return false;
  }
};
