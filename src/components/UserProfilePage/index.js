import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import moment from 'moment';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import FlexHeightImage from '../FlexHeightImage';
import { getUser } from '../../store/actions/user';
import UserProfileSection from '../UserProfileSection';
import { GOOGLE_MAP_API_KEY } from '../../secrets';

class UserProfilePage extends React.PureComponent {
  constructor(props) {
    super(props);
    if (!props.user.id && props.match.params.userId !== 'myprofile') {
      props.onGetUser(props.match.params.userId);
    }
  }

  handleUpdateProfileClicked = () => {
    const { history } = this.props;
    history.push('/updateprofile');
  }

  render() {
    const { user } = this.props;
    return (
      <div style={{ paddingTop: 56 }}>
        <div style={{ width: '100%', backgroundColor: '#f5f5f5' }}>
          <Container style={{ padding: '30px 0', maxWidth: 1000 }}>
            <Row>
              <Col xs={3}>
                <FlexHeightImage image={user.profile.profilePic || '/images/boy.svg'} />
              </Col>
              <Col xs={6} style={{ display: 'flex', alignItems: 'center' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 600 }}>
                  {user.profile.firstName}
                  {' '}
                  {user.profile.lastName}
                </h1>
              </Col>
              <Col style={{ display: 'flex', alignItems: 'center' }}>
                <Button size="sm" variant="outline-dark" onClick={this.handleUpdateProfileClicked}>Update Profile</Button>
              </Col>
            </Row>
          </Container>
        </div>
        <Container style={{ padding: '30px 0', maxWidth: 1000 }}>
          <Row>
            <Col xs={3}>
              <ListGroup>
                <ListGroup.Item action variant="secondary">Reviews</ListGroup.Item>
                <ListGroup.Item action>Friends</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col>
              <UserProfileSection title="Reviews">
                <>
                  {user.reviews.map((review) => (
                    <div key={review.id}>
                      <Row style={{ marginBottom: 8 }}>
                        <Col xs={2}>
                          <div style={{ borderRadius: 10, overflow: 'hidden' }}>
                            <FlexHeightImage image={`https://maps.googleapis.com/maps/api/place/photo?key=${GOOGLE_MAP_API_KEY}&photoreference=${review.stadium.photoReferences[0]}&maxwidth=300`} />
                          </div>
                        </Col>
                        <Col xs={5}>
                          <a href={`/#/stadium/${review.stadium.id}`} style={{ fontSize: '1.3rem', fontWeight: 600 }}>
                            {review.stadium.name}
                          </a>
                          <h6>{review.stadium.locality}</h6>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Rating
                              initialRating={review.rating}
                              readonly
                              emptySymbol="fa fa-star-o fa-lg low"
                              fullSymbol="fa fa-star fa-lg low"
                              style={{ marginRight: 8 }}
                            />

                            <span style={{ color: 'gray' }}>
                              {moment(review.timestamp).format('L')}

                            </span>
                          </div>
                        </Col>
                        <Col>
                          <p>{review.review}</p>
                        </Col>
                      </Row>
                      <hr />
                    </div>
                  ))}
                </>
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
