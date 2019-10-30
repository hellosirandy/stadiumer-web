import API from '@hellosirandy/rest-api-wrapper';
import firebase from 'firebase/app';
import 'firebase/storage';
import { FIREBASE_CONFIG } from '../secrets';

firebase.initializeApp(FIREBASE_CONFIG);
const storage = firebase.storage();

const baseURL = 'http://localhost:3001';
const api = new API(baseURL);

export const getUserAPI = (id) => {
  const options = {
    endpoint: `/user/profile/${id}`,
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

export const getUserReviewAPI = (id) => {
  const options = {
    endpoint: `/review/user/${id}`,
  };
  return api.get(options);
};

export const updateUserAPI = (id, updates) => {
  if (updates.profilePic) {
    const ref = storage.ref().child(`images/profile/${id}/${Date.now()}.jpg`);
    return ref.putString(updates.profilePic, 'data_url').then(() => ref.getDownloadURL()).then((url) => {
      const options = {
        endpoint: `/user/${id}`,
        body: {
          ...updates,
          profilePic: url,
        },
      };
      return api.put(options);
    }).catch((err) => {
      console.log(err);
    });
  }
  const options = {
    endpoint: `/user/${id}`,
    body: updates,
  };
  return api.put(options);
};
