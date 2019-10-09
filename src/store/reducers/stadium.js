import { STADIUM_SET_ALL, STADIUM_SET_SINGLE } from '../actionTypes';

const initialState = {
  stadiums: [],
  stadium: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STADIUM_SET_ALL:
      return {
        ...state,
        stadiums: action.stadiums,
      };
    case STADIUM_SET_SINGLE:
      return {
        ...state,
        stadium: action.stadium,
      };
    default:
      return state;
  }
};

export default reducer;
