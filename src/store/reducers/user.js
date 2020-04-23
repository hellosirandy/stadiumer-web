import {
  USER_SET_SINGLE,
  USER_SET_CURRENT,
  LOG_OUT, USER_UPDATE_PROFILE,
  USER_UPDATE_FOLLOW,
  USER_REMOVE_REVIEW,
  USER_ADD_REVIEW,
  USER_CLEAR,
} from '../actionTypes';

const initialState = {
  currentUser: {
    profile: {},
    reviews: {
      reviewIds: [],
      reviewTable: [],
    },
    follow: {
      following: {
        ids: [],
        table: {},
      },
      followers: {
        ids: [],
        table: {},
      },
    },
  },
  user: {
    profile: {},
    reviews: {
      reviewIds: [],
      reviewTable: [],
    },
    follow: {
      following: {
        ids: [],
        table: {},
      },
      followers: {
        ids: [],
        table: {},
      },
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
    case USER_REMOVE_REVIEW:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          reviews: {
            ...state.currentUser.reviews,
            reviewIds: state.currentUser.reviews.reviewIds.filter((rid) => rid !== action.rid),
          },
        },
      };
    case USER_ADD_REVIEW:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          reviews: {
            ...state.currentUser.reviews,
            reviewIds: [action.review.id, ...state.currentUser.reviews.reviewIds],
            reviewTable: {
              ...state.currentUser.reviews.reviewTable,
              [action.review.id]: action.review,
            },
          },
        },
      };
    case USER_CLEAR:
      return {
        ...state,
        user: initialState.user,
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
