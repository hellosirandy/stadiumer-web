import React, { useState, useEffect } from 'react';
import {
  HashRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BrowsePage from './components/BrowsePage';
import NavBar from './components/NavBar';
import StadiumPage from './components/StadiumPage';
import CategoryPage from './components/CategoryPage';
import AuthPage from './components/AuthPage';
import { getToken } from './store/actions/auth';
import WriteReviewPage from './components/WriteReviewPage';
import { homePageFirstLoad } from './store/actions/stadium';
import UserProfilePage from './components/UserProfilePage';
import UpdateProfilePage from './components/UpdateProfilePage';
import HomePage from './components/HomePage';

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const isAuthenticated = useSelector((state) => Boolean(state.auth.token));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getToken()).then(() => {
      setLoaded(true);
    });
    dispatch(homePageFirstLoad());
  }, [dispatch]);

  return loaded ? (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/browse" component={BrowsePage} />
        <Route path="/stadium/:stadiumId" component={StadiumPage} />
        <Route path="/category" component={CategoryPage} />
        <Route path="/userprofile/:userId" component={UserProfilePage} />
        <Route
          path="/writereview/:stadiumId"
          render={(p) => {
            if (isAuthenticated) {
              return (<WriteReviewPage />);
            }
            return (<Redirect to={{ pathname: '/auth/login', state: { nextPathName: p.location.pathname, nextSearch: p.location.search } }} />);
          }}
        />
        <Route
          path="/updateprofile"
          render={(p) => {
            if (isAuthenticated) {
              return (<UpdateProfilePage />);
            }
            return (<Redirect to={{ pathname: '/auth/login', state: { nextPathName: p.location.pathname, nextSearch: p.location.search } }} />);
          }}
        />
        <Route
          path="/auth/:action"
          render={({ location }) => {
            if (isAuthenticated) {
              return (
                <Redirect
                  to={
                      (location.state && location.state.nextPathName)
                        ? (location.state.nextPathName + location.state.nextSearch) : '/'
                    }
                />
              );
            }
            return <AuthPage />;
          }}
        />
      </Switch>
    </Router>
  ) : null;
};

export default App;
