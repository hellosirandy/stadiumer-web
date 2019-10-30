import { SEARCH_SET } from '../actionTypes';

const initialState = {
  results: {
    stadium: [],
    user: [],
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_SET:
      return {
        ...state,
        results: {
          ...state.results,
          [action.searchType]: action.searchResults,
        },
      };
    default:
      return state;
  }
};

export default reducer;
