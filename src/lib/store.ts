import AsyncStorage from '@react-native-async-storage/async-storage';
import {isValidToken} from './auth';
const STORE_KEY = '@REF_TOKEN';

export async function StoreRefreshToken(token: string) {
  try {
    await AsyncStorage.setItem(STORE_KEY, token);
  } catch (e) {
    console.log(e);
  }
}

async function GetRefreshToken() {
  try {
    return {token: await AsyncStorage.getItem(STORE_KEY)};
  } catch (e) {
    return {token: null};
  }
}

export async function isAlreadyLoggedIn() {
  const {token} = await GetRefreshToken();
  if (token === null) {
    console.log('No token found');
    return {
      isLoggedIn: false,
      token: null,
    };
  }
  try {
    const f : any = await isValidToken(token);
    return {
      isLoggedIn: true,
      token: f.token,
      refresh: f.refresh_token,
    };
  } catch (error) {
    console.error(error);
    return {
      isLoggedIn: false,
      token: null,
    };
  }
}
