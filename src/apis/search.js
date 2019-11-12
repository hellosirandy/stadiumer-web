import API from '@hellosirandy/rest-api-wrapper';

const baseURL = process.env.REACT_APP_ENDPOINT;
const api = new API(baseURL);

export const searchAPI = (type, value) => {
  const options = {
    endpoint: `/search?type=${type}&value=${value}`,
  };
  return api.get(options);
};
