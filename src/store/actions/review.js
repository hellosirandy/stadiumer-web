import { uiStartLoading, uiStopLoading } from './ui';
import { createReviewAPI, getReviewsAPI } from '../../apis/review';
import { REVIEW_CREATE, REVIEW_GET } from '../loadingTypes';
import { REVIEW_SET_STADIUM } from '../actionTypes';

export const createReview = (rating, review, stadiumId) => async (dispatch, getState) => {
  dispatch(uiStartLoading(REVIEW_CREATE));
  try {
    const { token } = getState().auth;
    await createReviewAPI(token, rating, review, stadiumId);
  } catch (e) {
    console.log(e);
  }
  dispatch(uiStopLoading(REVIEW_CREATE));
};

export const getReview = (stadiumId) => async (dispatch) => {
  dispatch(uiStartLoading(REVIEW_GET));
  try {
    const reviews = await getReviewsAPI(stadiumId);
    dispatch({
      type: REVIEW_SET_STADIUM,
      stadiumId,
      reviews,
    });
  } catch (e) {
    console.log(e);
  }
  dispatch(uiStopLoading(REVIEW_GET));
};
