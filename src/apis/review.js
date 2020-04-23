import API from '@hellosirandy/rest-api-wrapper';

const baseURL = process.env.REACT_APP_ENDPOINT;
const api = new API(baseURL);

export const createReviewAPI = (token, rating, review, stadiumId) => {
  const options = {
    endpoint: '/review',
    token,
    body: {
      rating,
      review,
      stadiumId,
    },
  };
  return api.post(options);
};

export const getReviewsAPI = (stadiumId) => {
  const options = {
    endpoint: '/review',
    params: {
      stadiumId,
    },
  };
  return api.get(options);
};

export const deleteReviewAPI = (token, rid) => {
  const options = {
    endpoint: `/review/${rid}`,
    token,
  };
  return api.delete(options);
};
