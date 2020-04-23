import { uiStartLoading, uiStopLoading } from './ui';
import { STADIUM_GET } from '../loadingTypes';
import {
  STADIUM_SET_ALL, STADIUM_SET_SINGLE, STADIUM_SET_DETAIL, STADIUM_SET_TOTAL_COUNT,
} from '../actionTypes';
import {
  getStadiumsAPI, firstLoadStadiumAPI, getStadiumDetailAPI,
} from '../../apis/stadium';

export const getStadiums = (options) => async (dispatch) => {
  dispatch(uiStartLoading(STADIUM_GET));
  const stadiums = await getStadiumsAPI({ [options.type]: options.value, limit: options.limit });
  const groupName = options.value || 'Recommended';
  dispatch({
    type: STADIUM_SET_ALL,
    groupName,
    stadiums,
    fullLoad: true,
  });
  dispatch(uiStopLoading(STADIUM_GET));
};

export const homePageFirstLoad = () => async (dispatch) => {
  dispatch(uiStartLoading(STADIUM_GET));
  const results = await firstLoadStadiumAPI();
  Object.keys(results.groupStadiums).forEach((groupName) => {
    dispatch({
      type: STADIUM_SET_ALL,
      groupName,
      stadiums: results.groupStadiums[groupName],
      fullLoad: false,
    });
  });
  dispatch({
    type: STADIUM_SET_TOTAL_COUNT,
    totalCount: results.count,
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
  // dispatch(uiStartLoading(STADIUM_GET));
  const stadiumDetail = await getStadiumDetailAPI(id);
  dispatch({
    type: STADIUM_SET_DETAIL,
    recommendations: stadiumDetail.recommendations,
  });
};
