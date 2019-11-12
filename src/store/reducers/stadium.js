import {
  STADIUM_SET_ALL, STADIUM_SET_SINGLE, STADIUM_SET_DETAIL, STADIUM_SET_TOTAL_COUNT,
} from '../actionTypes';

const initialState = {
  stadiums: {},
  stadium: {},
  searchResult: [],
  totalCount: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STADIUM_SET_ALL:
      return {
        ...state,
        stadiums: {
          ...state.stadiums,
          [action.groupName]: {
            stadiums: action.stadiums,
            fullLoad: action.fullLoad,
          },
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
    case STADIUM_SET_TOTAL_COUNT:
      return {
        ...state,
        totalCount: action.totalCount,
      };
    default:
      return state;
  }
};

export default reducer;
