import { uiStartLoading, uiStopLoading } from './ui';
import { FOLLOW_GET_REVIEW, FOLLOW_FOLLOW } from '../loadingTypes';
import { getFollowingReviewsAPI, followUserAPI } from '../../apis/follow';
import { FOLLOW_SET_REVIEWS, USER_UPDATE_FOLLOW } from '../actionTypes';

export const getFollowingReviews = () => async (dispatch, getState) => {
  dispatch(uiStartLoading(FOLLOW_GET_REVIEW));
  const { token } = getState().auth;
  try {
    const reviews = await getFollowingReviewsAPI(token);
    dispatch({
      type: FOLLOW_SET_REVIEWS,
      reviews,
    });
    dispatch(uiStopLoading(FOLLOW_GET_REVIEW));
  } catch (e) {
    dispatch(uiStopLoading(FOLLOW_GET_REVIEW));
  }
};


export const followUser = (uid, unfollow) => async (dispatch, getState) => {
  dispatch(uiStartLoading(FOLLOW_FOLLOW));
  try {
    const { token } = getState().auth;
    await followUserAPI(token, uid, unfollow);
    dispatch({
      type: USER_UPDATE_FOLLOW,
      user: uid,
      unfollow,
    });
    dispatch(uiStopLoading(FOLLOW_FOLLOW));
  } catch (e) {
    dispatch(uiStopLoading(FOLLOW_FOLLOW));
  }
};
