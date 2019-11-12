import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import { STADIUM_GET } from '../../store/loadingTypes';
import MainContainer from '../MainContainer';
import NavBarSearch from '../NavBarSearch';
import { signOut } from '../../store/actions/auth';

const NavContainer = ({ children }) => (
  <Switch>
    <Route
      path="/(|browse|category)"
      exact
      render={() => children}
    />
    <Route
      path="/(stadium|auth|writereview|userprofile|updateprofile)"
      render={() => (
        <MainContainer style={{ maxWidth: 1000 }}>
          { children }
        </MainContainer>
      )}
    />
  </Switch>
);

NavContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

const NavBar = ({
  history,
}) => {
  const isAuthenticated = useSelector((state) => Boolean(state.auth.token));
  const isLoading = useSelector((state) => Boolean(state.ui.isLoading[STADIUM_GET]));
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(true);

  const isLoadingRef = useRef(isLoading);
  useEffect(() => {
    if (isLoadingRef.current && !isLoading) {
      setProgress(100);
      setTimeout(() => {
        setDisplayProgress(false);
        setProgress(0);
      }, 600);
    } else if (!isLoadingRef.isLoading && isLoading) {
      setDisplayProgress(true);
      setTimeout(() => {
        if (progress < 60) {
          setProgress(60);
        }
      }, 50);
    }
    isLoadingRef.current = isLoading;
  }, [isLoading, progress]);

  const handleBrandClicked = () => {
    history.push('/');
  };

  const handleLogInClicked = () => {
    history.push('/auth/login');
  };

  const handleSignUpClicked = () => {
    history.push('/auth/signup');
  };

  const handleLogOutClicked = () => {
    dispatch(signOut());
  };

  const handleProfileClicked = () => {
    history.push('/userprofile/myprofile');
  };

  const buttonGroup = isAuthenticated ? (
    <>
      <Button variant="outline-secondary" size="sm" style={{ marginRight: 5 }} onClick={handleProfileClicked}>My Profile</Button>
      <Button variant="secondary" size="sm" onClick={handleLogOutClicked}>Log Out</Button>
    </>
  ) : (
    <>
      <Button variant="outline-secondary" size="sm" style={{ marginRight: 5 }} onClick={handleLogInClicked}>Log In</Button>
      <Button variant="secondary" size="sm" onClick={handleSignUpClicked}>Sign Up</Button>
    </>
  );
  return (
    <>
      <Navbar bg="light" variant="light" fixed="top">
        {displayProgress && (
          <ProgressBar
            style={{
              position: 'absolute', zIndex: 1200, height: 3, width: '100%', top: 0, left: 0,
            }}
            now={progress}
            label={`${60}%`}
            srOnly
            striped
          />
        )}
        <NavContainer>
          <>
            <Navbar.Brand style={{ cursor: 'pointer' }} onClick={handleBrandClicked}>
            Stadiumer
            </Navbar.Brand>
            <NavBarSearch />
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              {buttonGroup}
            </Navbar.Collapse>
          </>
        </NavContainer>

      </Navbar>
    </>
  );
};

NavBar.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(NavBar);
