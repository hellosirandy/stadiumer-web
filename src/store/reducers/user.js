import {
  USER_SET_SINGLE, USER_SET_CURRENT, LOG_OUT, USER_UPDATE_PROFILE, USER_UPDATE_FOLLOW,
} from '../actionTypes';

const initialState = {
  currentUser: {
    profile: {},
    reviews: [],
    follow: {
      following: {},
      followers: {},
    },
  },
  user: {
    profile: {},
    reviews: [],
    follow: {
      following: {},
      followers: {},
    },
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SET_SINGLE:
      return {
        ...state,
        user: action.user,
      };
    case USER_SET_CURRENT:
      return {
        ...state,
        currentUser: action.user,
      };
    case USER_UPDATE_PROFILE:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          profile: action.profile,
        },
      };
    case USER_UPDATE_FOLLOW:
      return {
        ...state,
        user: {
          ...state.user,
          following: !action.unfollow,
        },
      };
    case LOG_OUT:
      return {
        ...state,
        currentUser: initialState.currentUser,
      };
    default:
      return state;
  }
};

export default reducer;
