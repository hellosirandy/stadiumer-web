import { uiStartLoading } from './ui';
import { STADIUM_GETTING } from '../loadingTypes';
import { STADIUM_GET_ALL } from '../actionTypes';
import { getStadiumsAPI } from '../../apis/stadium';

export const getStadiums = () => async (dispatch) => {
  dispatch(uiStartLoading(STADIUM_GETTING));
  const stadiums = await getStadiumsAPI();
  dispatch({
    type: STADIUM_GET_ALL,
    stadiums,
  });
};
