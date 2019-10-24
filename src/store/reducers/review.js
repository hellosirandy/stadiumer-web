import { REVIEW_SET_STADIUM } from '../actionTypes';

const initialState = {
  reviews: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REVIEW_SET_STADIUM:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          [action.stadiumId]: action.reviews,
        },
      };
    default:
      return state;
  }
};

export default reducer;
