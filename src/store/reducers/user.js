import { USER_SET_SINGLE, USER_SET_CURRET } from '../actionTypes';

const initialState = {
  currentUser: {
    profile: {},
    reviews: [],
  },
  user: {
    profile: {},
    reviews: [],
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SET_SINGLE:
      return {
        ...state,
        user: action.user,
      };
    case USER_SET_CURRET:
      return {
        ...state,
        currentUser: action.user,
      };
    default:
      return state;
  }
};

export default reducer;