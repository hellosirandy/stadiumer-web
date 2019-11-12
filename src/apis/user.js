import API from '@hellosirandy/rest-api-wrapper';
import firebase from 'firebase/app';
import 'firebase/storage';
import { FIREBASE_CONFIG } from '../secrets';

firebase.initializeApp(FIREBASE_CONFIG);
const storage = firebase.storage();

const baseURL = process.env.REACT_APP_ENDPOINT;
const api = new API(baseURL);

export const getUserAPI = (id, token) => {
  const options = {
    endpoint: `/user/profile/${id}`,
    token,
  };
  return api.get(options);
};

export const getCurrentUserAPI = (token) => {
  const options = {
    endpoint: '/user',
    token,
  };
  return api.get(options);
};

export const updateUserAPI = async (token, id, updates) => {
  if (updates.profilePic) {
    const ref = storage.ref().child(`images/profile/${id}/${Date.now()}.jpg`);
    await ref.putString(updates.profilePic, 'data_url');
    const options = {
      endpoint: '/user',
      body: {
        ...updates,
        profilePic: ref.name,
      },
      token,
    };
    return api.put(options);
  }
  const options = {
    endpoint: '/user',
    body: updates,
    token,
  };
  return api.put(options);
};
