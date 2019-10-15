import React from 'react';
import PropTypes from 'prop-types';
import {
  HashRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import StadiumPage from './components/StadiumPage';
import CategoryPage from './components/CategoryPage';
import AuthPage from './components/AuthPage';
import { getToken, signOut } from './store/actions/auth';
import WriteReviewPage from './components/WriteReviewPage';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
    props.onGetToken().then(() => {
      this.setState({ loaded: true });
    });
  }

  render() {
    const { isAuthenticated, onSignOut } = this.props;
    const { loaded } = this.state;
    return loaded ? (
      <Router>
        <NavBar isAuthenticated={isAuthenticated} onSignOut={onSignOut} />
        <Switch>
          <Route
            path="/"
            exact
            render={(p) => {
              if (isAuthenticated) {
                return (<HomePage />);
              }
              return (<Redirect to={{ pathname: '/auth/login', state: { nextPathName: p.location.pathname, nextSearch: p.location.search } }} />);
            }}
          />
          <Route
            path="/stadium/:stadiumId"
            render={(p) => {
              if (isAuthenticated) {
                return (<StadiumPage />);
              }
              return (<Redirect to={{ pathname: '/auth/login', state: { nextPathName: p.location.pathname, nextSearch: p.location.search } }} />);
            }}
          />
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
            path="/category"
            render={(p) => {
              if (isAuthenticated) {
                return (<CategoryPage />);
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
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onGetToken: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: Boolean(state.auth.token),
});

const mapDispatchToProps = (dispatch) => ({
  onGetToken: () => dispatch(getToken()),
  onSignOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
