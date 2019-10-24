import { uiStartLoading, uiStopLoading } from './ui';
import { USER_GET, USER_UPDATE } from '../loadingTypes';
import { getUserAPI, updateUserAPI } from '../../apis/user';
import { USER_SET_SINGLE } from '../actionTypes';

export const setUser = (user) => ({
  type: USER_SET_SINGLE,
  user,
});

export const getUser = (id) => async (dispatch) => {
  dispatch(uiStartLoading(USER_GET));
  try {
    const user = await getUserAPI(id);
    dispatch(setUser(user));
    dispatch(uiStopLoading(USER_GET));
  } catch (e) {
    dispatch(uiStopLoading(USER_GET));
  }
};

export const updateUser = (updates) => async (dispatch, getState) => {
  dispatch(uiStartLoading(USER_UPDATE));
  const { user: { currentUser: { profile: { id } } } } = getState();
  try {
    await updateUserAPI(id, updates);
    dispatch(uiStopLoading(USER_UPDATE));
  } catch (e) {
    console.log(e);
    dispatch(uiStopLoading(USER_UPDATE));
  }
};
