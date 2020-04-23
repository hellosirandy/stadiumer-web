import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import FlexHeightImage from '../FlexHeightImage';
import { getUser, clearUser } from '../../store/actions/user';
import UserProfileSection from '../UserProfileSection';
import ProfileReview from '../ProfileReview';
import ProfileFollow from '../ProfileFollow';
import { followUser } from '../../store/actions/follow';

const UserProfilePage = ({
  match, history, location,
}) => {
  const user = useSelector((state) => (match.params.userId === 'myprofile' ? state.user.currentUser : state.user.user));
  const dispatch = useDispatch();

  const userIdRef = useRef(match.params.userId);
  if (!user.id && match.params.userId !== 'myprofile') {
    dispatch(getUser(match.params.userId));
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    if ((userIdRef.current !== match.params.userId) && match.params.userId !== 'myprofile') {
      dispatch(getUser(match.params.userId));
    }
    userIdRef.current = match.params.userId;
    return () => {
      dispatch(clearUser());
    };
  }, [dispatch, match.params.userId]);

  const handleUpdateProfileClicked = () => {
    history.push('/updateprofile');
  };

  const handleMenuClicked = (key) => () => {
    history.push(`${location.pathname}#${key}`);
  };

  const handleFollowClicked = () => {
    const { profile: { id }, following } = user;
    dispatch(followUser(id, following));
  };

  const isSelf = match.params.userId === 'myprofile';
  let content;
  if (location.hash === '#following' || location.hash === '#followers') {
    content = <ProfileFollow users={user.follow[location.hash.split('#')[1]]} />;
  } else {
    content = <ProfileReview reviews={user.reviews} />;
  }
  let title = location.hash.split('#')[1];
  title = title ? title.charAt(0).toUpperCase() + title.substring(1) : 'Reviews';
  let buttonGroup;
  if (isSelf) {
    buttonGroup = <Button size="sm" variant="outline-dark" onClick={handleUpdateProfileClicked}>Update Profile</Button>;
  } else {
    buttonGroup = <Button size="sm" variant="outline-primary" onClick={handleFollowClicked}>{user.following ? 'Unfollow' : 'Follow'}</Button>;
  }
  return (
    <div style={{ paddingTop: 56 }}>
      <div style={{ width: '100%', backgroundColor: '#f5f5f5' }}>
        <Container style={{ padding: '30px 0', maxWidth: 1000 }}>
          <Row>
            <Col xs={3}>
              <FlexHeightImage image={user.profile.profilePic || '/images/boy.svg'} />
            </Col>
            <Col xs={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 600 }}>
                {user.profile.firstName}
                {' '}
                {user.profile.lastName}
              </h1>
              <h6 style={{ fontWeight: 400 }}>
                {`${user.reviews.reviewIds.length} Reviews | ${Object.keys(user.follow.following).length} Following | ${Object.keys(user.follow.followers).length} Followers`}
              </h6>
            </Col>
            <Col style={{ display: 'flex', alignItems: 'center' }}>
              {buttonGroup}
            </Col>
          </Row>
        </Container>
      </div>
      <Container style={{ padding: '30px 0', maxWidth: 1000 }}>
        <Row>
          <Col xs={3}>
            <ListGroup>
              <ListGroup.Item onClick={handleMenuClicked('reviews')} action variant={(location.hash === '#reviews' || location.hash === '') ? 'secondary' : null}>Reviews</ListGroup.Item>
              <ListGroup.Item onClick={handleMenuClicked('following')} action variant={location.hash === '#following' ? 'secondary' : null}>Following</ListGroup.Item>
              <ListGroup.Item onClick={handleMenuClicked('followers')} action variant={location.hash === '#followers' ? 'secondary' : null}>Followers</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <UserProfileSection title={title}>
              {content}
            </UserProfileSection>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

UserProfilePage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(UserProfilePage);
