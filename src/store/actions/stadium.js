import { uiStartLoading, uiStopLoading } from './ui';
import { STADIUM_GETTING } from '../loadingTypes';
import { STADIUM_SET_ALL, STADIUM_SET_SINGLE } from '../actionTypes';
import { getStadiumsAPI } from '../../apis/stadium';

export const getStadiums = () => async (dispatch) => {
  dispatch(uiStartLoading(STADIUM_GETTING));
  const stadiums = await getStadiumsAPI();
  dispatch({
    type: STADIUM_SET_ALL,
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
