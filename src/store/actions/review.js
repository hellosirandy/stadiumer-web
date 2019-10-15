import { uiStartLoading, uiStopLoading } from './ui';
import { createReviewAPI } from '../../apis/review';
import { REVIEW_CREATE } from '../loadingTypes';

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
