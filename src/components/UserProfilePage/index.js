import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import FlexHeightImage from '../FlexHeightImage';
import { getUser } from '../../store/actions/user';
import UserProfileSection from '../UserProfileSection';
import ProfileReview from '../ProfileReview';

class UserProfilePage extends React.PureComponent {
  constructor(props) {
    super(props);
    if (!props.user.id && props.match.params.userId !== 'myprofile') {
      props.onGetUser(props.match.params.userId);
    }
  }

  componentDidUpdate(prevProps) {
    const { match, onGetUser } = this.props;
    if (prevProps.match.params.userId !== match.params.userId && match.params.userId !== 'myprofile') {
      onGetUser(match.params.userId);
    }
  }

  handleUpdateProfileClicked = () => {
    const { history } = this.props;
    history.push('/updateprofile');
  }

  render() {
    const { user, match } = this.props;
    const isSelf = match.params.userId === 'myprofile';
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
                  {`${user.reviews.length} Reviews | ${user.follow.following.length} Following | ${user.follow.follower.length} Followers`}
                </h6>
              </Col>
              <Col style={{ display: 'flex', alignItems: 'center' }}>
                {isSelf && <Button size="sm" variant="outline-dark" onClick={this.handleUpdateProfileClicked}>Update Profile</Button>}
              </Col>
            </Row>
          </Container>
        </div>
        <Container style={{ padding: '30px 0', maxWidth: 1000 }}>
          <Row>
            <Col xs={3}>
              <ListGroup>
                <ListGroup.Item action variant="secondary">Reviews</ListGroup.Item>
                <ListGroup.Item action>Following</ListGroup.Item>
                <ListGroup.Item action>Followers</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col>
              <UserProfileSection title="Reviews">
                <ProfileReview reviews={user.reviews} />

              </UserProfileSection>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

UserProfilePage.propTypes = {
  user: PropTypes.object.isRequired,
  onGetUser: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => ({
  user: props.match.params.userId === 'myprofile' ? state.user.currentUser : state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  onGetUser: (id) => dispatch(getUser(id)),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(UserProfilePage);
