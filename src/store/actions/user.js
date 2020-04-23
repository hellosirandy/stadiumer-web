import { uiStartLoading, uiStopLoading } from './ui';
import { USER_GET, USER_UPDATE } from '../loadingTypes';
import {
  getUserAPI, updateUserAPI, getCurrentUserAPI,
} from '../../apis/user';
import {
  USER_SET_SINGLE, USER_SET_CURRENT, USER_UPDATE_PROFILE, USER_CLEAR,
} from '../actionTypes';
import { getFollowingReviews } from './follow';

export const setUser = (user) => ({
  type: USER_SET_SINGLE,
  user,
});

export const getUser = (id) => async (dispatch, getState) => {
  dispatch(uiStartLoading(USER_GET));
  try {
    const { token } = getState().auth;
    const user = await getUserAPI(id, token);
    const reviewTable = {};
    const reviewIds = user.reviews.map((review) => review.id);
    const followingIds = Object.keys(user.follow.following);
    const followersIds = Object.keys(user.follow.followers);
    user.reviews.forEach((review) => {
      reviewTable[review.id] = review;
    });
    user.reviews = {
      reviewTable,
      reviewIds,
    };
    user.follow = {
      following: {
        ids: followingIds,
        table: user.follow.following,
      },
      followers: {
        ids: followersIds,
        table: user.follow.followers,
      },
    };
    dispatch(setUser(user));
    dispatch(uiStopLoading(USER_GET));
  } catch (e) {
    dispatch(uiStopLoading(USER_GET));
  }
};

export const updateUser = (updates) => async (dispatch, getState) => {
  dispatch(uiStartLoading(USER_UPDATE));
  const { user: { currentUser: { profile: { id } } }, auth: { token } } = getState();
  try {
    const updatedUserProfile = await updateUserAPI(token, id, updates);
    dispatch({
      type: USER_UPDATE_PROFILE,
      profile: updatedUserProfile,
    });
    dispatch(uiStopLoading(USER_UPDATE));
  } catch (e) {
    console.log(e);
    dispatch(uiStopLoading(USER_UPDATE));
  }
};

export const loadCurrentUser = () => async (dispatch, getState) => {
  const { token } = getState().auth;
  const currentUser = await getCurrentUserAPI(token);
  const reviewTable = {};
  const reviewIds = currentUser.reviews.map((review) => review.id);
  const followingIds = Object.keys(currentUser.follow.following);
  const followersIds = Object.keys(currentUser.follow.followers);
  currentUser.reviews.forEach((review) => {
    reviewTable[review.id] = review;
  });
  currentUser.reviews = {
    reviewTable,
    reviewIds,
  };
  currentUser.follow = {
    following: {
      ids: followingIds,
      table: currentUser.follow.following,
    },
    followers: {
      ids: followersIds,
      table: currentUser.follow.followers,
    },
  };
  dispatch({
    type: USER_SET_CURRENT,
    user: currentUser,
  });
  dispatch(getFollowingReviews());
};

export const clearUser = () => (dispatch) => dispatch({
  type: USER_CLEAR,
});
