import API from '@hellosirandy/rest-api-wrapper';

const baseURL = 'http://localhost:3001';
const api = new API(baseURL);

export const signInAPI = (email, password) => {
  const options = {
    endpoint: '/user/signin',
    body: {
      email,
      password,
    },
  };
  return api.post(options);
};

export const refreshTokenAPI = (refreshToken) => {
  const options = {
    endpoint: '/user/refresh',
    body: {
      refreshToken,
    },
  };
  return api.post(options);
};
