import API from '@hellosirandy/rest-api-wrapper';

const baseURL = process.env.REACT_APP_ENDPOINT;
const api = new API(baseURL);

export const getFollowingReviewsAPI = (token) => {
  const options = {
    endpoint: '/follow/reviews',
    token,
  };
  return api.get(options);
};

export const followUserAPI = (token, uid, unfollow = false) => {
  const options = {
    endpoint: `/follow${unfollow ? '/unfollow' : ''}`,
    token,
    body: {
      uid,
    },
  };
  return api.post(options);
};
