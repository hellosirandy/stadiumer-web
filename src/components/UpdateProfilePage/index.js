import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import MainContainer from '../MainContainer';
import UserProfileSection from '../UserProfileSection';
import { USER_UPDATE } from '../../store/loadingTypes';
import ProfileSetting from '../ProfileSetting';
import PasswordSetting from '../PasswordSetting';

const UpdateProfilePage = ({ location, history }) => {
  const [showAlert, setShowAlert] = useState(false);
  const isLoading = useSelector((state) => Boolean(state.ui.isLoading[USER_UPDATE]));
  const user = useSelector((state) => state.user.currentUser);

  const isLoadingRef = useRef(isLoading);

  useEffect(() => {
    if (isLoadingRef.current && !isLoading) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  const handleMenuClicked = (key) => () => {
    history.push(`${location.pathname}#${key}`);
  };

  let content;
  let active;
  if (location.hash === '#password') {
    active = 'password';
    content = (
      <UserProfileSection title="Change your password">
        <PasswordSetting />
      </UserProfileSection>
    );
  } else {
    active = 'profile';
    content = (
      <UserProfileSection title="Profile">
        <ProfileSetting user={user} />
      </UserProfileSection>
    );
  }
  return (
    <MainContainer style={{ marginTop: 56, padding: '50px 0' }}>
      <Row>
        <Col xs={3}>
          <ListGroup>
            <ListGroup.Item action onClick={handleMenuClicked('profile')} variant={active === 'profile' ? 'secondary' : null}>Profile</ListGroup.Item>
            <ListGroup.Item action onClick={handleMenuClicked('password')} variant={active === 'password' ? 'secondary' : null}>Password</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          {showAlert && <Alert variant="success">Your profile has been updated!</Alert>}
          {content}
        </Col>
      </Row>

    </MainContainer>
  );
};

UpdateProfilePage.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(UpdateProfilePage);
