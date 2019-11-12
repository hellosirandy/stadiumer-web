import { uiStartLoading, uiStopLoading } from './ui';
import { USER_GET, USER_UPDATE } from '../loadingTypes';
import {
  getUserAPI, updateUserAPI, getCurrentUserAPI,
} from '../../apis/user';
import { USER_SET_SINGLE, USER_SET_CURRENT, USER_UPDATE_PROFILE } from '../actionTypes';
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
  dispatch({
    type: USER_SET_CURRENT,
    user: currentUser,
  });
  dispatch(getFollowingReviews());
};
