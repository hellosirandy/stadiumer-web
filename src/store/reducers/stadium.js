import { STADIUM_GET_ALL } from '../actionTypes';

const initialState = {
  stadiums: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STADIUM_GET_ALL:
      return {
        ...state,
        stadiums: action.stadiums,
      };
    default:
      return state;
  }
};

export default reducer;
