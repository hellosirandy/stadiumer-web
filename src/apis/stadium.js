import API from '@hellosirandy/rest-api-wrapper';

const baseURL = 'http://localhost:3001';
const api = new API(baseURL);

export const getStadiumsAPI = () => {
  const options = {
    endpoint: '/stadium',
  };
  return api.get(options);
};

export const addStadium = () => api.post({});
