import { FOLLOW_SET_REVIEWS, LOG_OUT } from '../actionTypes';

const initialState = {
  reviews: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW_SET_REVIEWS:
      return {
        ...state,
        reviews: action.reviews,
      };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
