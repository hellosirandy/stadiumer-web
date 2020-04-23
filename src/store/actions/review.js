import { uiStartLoading, uiStopLoading } from './ui';
import { createReviewAPI, getReviewsAPI, deleteReviewAPI } from '../../apis/review';
import { REVIEW_CREATE, REVIEW_GET, REVIEW_DELETE } from '../loadingTypes';
import {
  REVIEW_SET_STADIUM, USER_REMOVE_REVIEW, USER_ADD_REVIEW, REVIEW_ADD_STADIUM_REVIEW,
} from '../actionTypes';

export const createReview = (rating, review, stadiumId) => async (dispatch, getState) => {
  dispatch(uiStartLoading(REVIEW_CREATE));
  try {
    const { token } = getState().auth;
    const newReview = await createReviewAPI(token, rating, review, stadiumId);
    console.log(newReview);
    dispatch({
      type: USER_ADD_REVIEW,
      review: newReview,
    });
    dispatch({
      type: REVIEW_ADD_STADIUM_REVIEW,
      review: newReview,
      stadiumId: newReview.stadiumId,
    });
  } catch (e) {
    console.log(e);
  }
  dispatch(uiStopLoading(REVIEW_CREATE));
};

export const getReview = (stadiumId) => async (dispatch) => {
  dispatch(uiStartLoading(REVIEW_GET));
  try {
    const reviews = await getReviewsAPI(stadiumId);
    const reviewIds = reviews.map((review) => review.id);
    const reviewTable = {};
    reviews.forEach((review) => {
      reviewTable[review.id] = review;
    });
    dispatch({
      type: REVIEW_SET_STADIUM,
      stadiumId,
      reviewIds,
      reviewTable,
    });
  } catch (e) {
    console.log(e);
  }
  dispatch(uiStopLoading(REVIEW_GET));
};

export const deleteReview = (rid) => async (dispatch, getState) => {
  dispatch(uiStartLoading(REVIEW_DELETE));
  const { token } = getState().auth;
  try {
    await deleteReviewAPI(token, rid);
    dispatch({
      type: USER_REMOVE_REVIEW,
      rid,
    });
  } catch (e) {
    console.log(e);
  }
  dispatch(uiStopLoading(REVIEW_DELETE));
};
