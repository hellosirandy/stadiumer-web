import { uiStartLoading, uiStopLoading } from './ui';
import { AUTH_SIGNIN } from '../loadingTypes';
import { signInAPI, refreshTokenAPI } from '../../apis/auth';
import { AUTH_SET_TOKEN } from '../actionTypes';

const setToken = (token) => ({
  type: AUTH_SET_TOKEN,
  token,
});

const storeToken = (token, expirationTime, refreshToken) => (dispatch) => {
  dispatch(setToken(token));
  localStorage.setItem('stadiumer:auth:token', token);
  localStorage.setItem('stadiumer:auth:expirationTime', expirationTime.toString());
  localStorage.setItem('stadiumer:auth:refreshToken', refreshToken);
};

export const signIn = (email, password) => async (dispatch) => {
  dispatch(uiStartLoading(AUTH_SIGNIN));
  try {
    const { token, expirationTime, refreshToken } = await signInAPI(email, password);
    dispatch(storeToken(token, expirationTime, refreshToken));
  } catch (e) {
    console.log(e);
  }
  dispatch(uiStopLoading(AUTH_SIGNIN));
};

const validateToken = () => async (dispatch, getState) => {
  const { token, expiration } = getState().auth;
  if (!token || new Date(expiration) <= new Date()) {
    const tokenFromStorage = localStorage.getItem('stadiumer:auth:token');
    if (!tokenFromStorage) {
      throw new Error();
    }
    const expirationFromStorage = localStorage.getItem('stadiumer:auth:expirationTime');
    const parsedExpiration = new Date(parseInt(expirationFromStorage, 10));
    const now = new Date();
    if (parsedExpiration > now) {
      dispatch(setToken(tokenFromStorage));
      return tokenFromStorage;
    }
    throw new Error();
  } else {
    return token;
  }
};

const clearStorage = () => {
  localStorage.removeItem('stadiumer:auth:token');
  localStorage.removeItem('stadiumer:auth:expirationTime');
  localStorage.removeItem('stadiumer:auth:refreshToken');
};

export const getToken = () => async (dispatch) => {
  let token;
  try {
    token = await dispatch(validateToken());
  } catch (e) {
    token = localStorage.getItem('stadiumer:auth:token');
    const refreshToken = localStorage.getItem('stadiumer:auth:refreshToken');
    if (!refreshToken) {
      clearStorage();
      return null;
    }
    const parsedRes = await refreshTokenAPI(refreshToken);
    if (!parsedRes.token) {
      clearStorage();
      return null;
    }
    dispatch(storeToken(parsedRes.token, parsedRes.expirationTime, parsedRes.refreshToken));
    return parsedRes.token;
  }
  if (!token) {
    return null;
  }
  return token;
};

export const signOut = () => (dispatch) => {
  clearStorage();
  dispatch({
    type: AUTH_SET_TOKEN,
    token: '',
  });
};