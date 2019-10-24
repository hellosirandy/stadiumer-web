import { uiStartLoading, uiStopLoading } from './ui';
import { STADIUM_GET, STADIUM_SEARCH } from '../loadingTypes';
import {
  STADIUM_SET_ALL, STADIUM_SET_SINGLE, STADIUM_SET_DETAIL, STADIUM_SET_SEARCH,
} from '../actionTypes';
import {
  getStadiumsAPI, firstLoadStadiumAPI, getStadiumDetailAPI, searchStadiumAPI,
} from '../../apis/stadium';

export const getStadiums = (options) => async (dispatch) => {
  dispatch(uiStartLoading(STADIUM_GET));
  const stadiums = await getStadiumsAPI({ [options.type]: options.value, limit: options.limit });
  const groupName = options.value || 'Recommended';
  dispatch({
    type: STADIUM_SET_ALL,
    groupName,
    stadiums,
  });
  dispatch(uiStopLoading(STADIUM_GET));
};

export const homePageFirstLoad = () => async (dispatch) => {
  dispatch(uiStartLoading(STADIUM_GET));
  const groupStadiums = await firstLoadStadiumAPI();
  Object.keys(groupStadiums).forEach((groupName) => {
    dispatch({
      type: STADIUM_SET_ALL,
      groupName,
      stadiums: groupStadiums[groupName],
    });
  });
  dispatch(uiStopLoading(STADIUM_GET));
};

export const setStadium = (stadium) => (dispatch) => {
  dispatch({
    type: STADIUM_SET_SINGLE,
    stadium,
  });
};

export const getStadium = (id) => async (dispatch) => {
  dispatch(uiStartLoading(STADIUM_GET));
  const stadium = await getStadiumsAPI({ id });
  dispatch(setStadium(stadium));
  dispatch(uiStopLoading(STADIUM_GET));
};

export const getStadiumDetail = (id) => async (dispatch) => {
  dispatch(uiStartLoading(STADIUM_GET));
  const stadiumDetail = await getStadiumDetailAPI(id);
  dispatch({
    type: STADIUM_SET_DETAIL,
    rating: stadiumDetail.rating,
    recommendations: stadiumDetail.recommendations,
  });
};

export const searchStadium = (query) => async (dispatch) => {
  dispatch(uiStartLoading(STADIUM_SEARCH));
  const searchResult = await searchStadiumAPI(query);
  dispatch({
    type: STADIUM_SET_SEARCH,
    searchResult,
  });
};
