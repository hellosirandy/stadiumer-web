import { uiStartLoading } from './ui';
import { SEARCH_GET } from '../loadingTypes';
import { searchAPI } from '../../apis/search';
import { SEARCH_SET } from '../actionTypes';

export const search = (type, value) => async (dispatch) => {
  dispatch(uiStartLoading(SEARCH_GET));
  const results = await searchAPI(type, value);
  dispatch({
    type: SEARCH_SET,
    searchType: type,
    searchResults: results,
  });
};
