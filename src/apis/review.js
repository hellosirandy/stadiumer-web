import API from '@hellosirandy/rest-api-wrapper';

const baseURL = 'http://localhost:3001';
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
