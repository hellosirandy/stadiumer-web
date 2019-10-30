import {
  STADIUM_SET_ALL, STADIUM_SET_SINGLE, STADIUM_SET_DETAIL,
} from '../actionTypes';

const initialState = {
  stadiums: {},
  stadium: {},
  searchResult: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STADIUM_SET_ALL:
      return {
        ...state,
        stadiums: {
          ...state.stadiums,
          [action.groupName]: action.stadiums,
        },
      };
    case STADIUM_SET_SINGLE:
      return {
        ...state,
        stadium: action.stadium,
      };
    case STADIUM_SET_DETAIL:
      return {
        ...state,
        stadium: {
          ...state.stadium,
          rating: action.rating,
          recommendations: action.recommendations,
        },
      };
    default:
      return state;
  }
};

export default reducer;
