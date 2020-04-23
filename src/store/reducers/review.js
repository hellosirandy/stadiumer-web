import { REVIEW_SET_STADIUM, REVIEW_ADD_STADIUM_REVIEW } from '../actionTypes';

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
          [action.stadiumId]: {
            reviewIds: action.reviewIds,
            reviewTable: action.reviewTable,
          },
        },
      };
    case REVIEW_ADD_STADIUM_REVIEW:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          [action.stadiumId]: {
            ...state.reviews[action.stadiumId],
            reviewIds: [action.review.id, ...state.reviews[action.stadiumId].reviewIds],
            reviewTable: {
              ...state.reviews[action.stadiumId].reviewTable,
              [action.review.id]: action.review,
            },
          },
        },
      };
    default:
      return state;
  }
};

export default reducer;
