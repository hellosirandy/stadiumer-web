import { uiStartLoading, uiStopLoading } from './ui';
import { STADIUM_GET } from '../loadingTypes';
import { STADIUM_SET_ALL, STADIUM_SET_SINGLE } from '../actionTypes';
import { getStadiumsAPI, firstLoadStadiumAPI } from '../../apis/stadium';

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
