import { uiStartLoading, uiStopLoading } from './ui';
import { STADIUM_GETTING } from '../loadingTypes';
import { STADIUM_SET_ALL, STADIUM_SET_SINGLE } from '../actionTypes';
import { getStadiumsAPI } from '../../apis/stadium';

export const getStadiums = (options) => async (dispatch) => {
  dispatch(uiStartLoading(STADIUM_GETTING));
  const limit = options.limit || 6;
  const stadiums = await getStadiumsAPI({ [options.type]: options.value, limit });
  const groupName = options.value || 'Recommended';
  dispatch({
    type: STADIUM_SET_ALL,
    groupName,
    stadiums,
  });
  dispatch(uiStopLoading(STADIUM_GETTING));
};

export const setStadium = (stadium) => (dispatch) => {
  dispatch({
    type: STADIUM_SET_SINGLE,
    stadium,
  });
};

export const getStadium = (id) => async (dispatch) => {
  dispatch(uiStartLoading(STADIUM_GETTING));
  const stadium = await getStadiumsAPI({ id });
  dispatch(setStadium(stadium));
  dispatch(uiStopLoading(STADIUM_GETTING));
};
