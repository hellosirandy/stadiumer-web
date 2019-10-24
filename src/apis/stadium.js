import API from '@hellosirandy/rest-api-wrapper';

const baseURL = 'http://localhost:3001';
const api = new API(baseURL);

export const getStadiumsAPI = (params) => {
  const options = {
    endpoint: '/stadium',
    params,
  };
  return api.get(options);
};

export const firstLoadStadiumAPI = () => {
  const options = {
    endpoint: '/stadium/firstload',
  };
  return api.get(options);
};

export const getStadiumDetailAPI = (id) => {
  const options = {
    endpoint: `/stadium/detail/${id}`,
  };
  return api.get(options);
};

export const searchStadiumAPI = (query) => {
  const options = {
    endpoint: `/stadium/search?value=${query}`,
  };
  return api.get(options);
};

export const addStadium = () => api.post({});
