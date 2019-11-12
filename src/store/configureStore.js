import {
  createStore, combineReducers, compose, applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';

import ui from './reducers/ui';
import stadium from './reducers/stadium';
import auth from './reducers/auth';
import review from './reducers/review';
import user from './reducers/user';
import search from './reducers/search';
import follow from './reducers/follow';

const rootReducer = combineReducers({
  ui,
  stadium,
  auth,
  review,
  user,
  search,
  follow,
});

let composeEnhancers = compose;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default configureStore;
