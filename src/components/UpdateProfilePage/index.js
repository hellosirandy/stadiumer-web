import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import MainContainer from '../MainContainer';
import UserProfileSection from '../UserProfileSection';
import { USER_UPDATE } from '../../store/loadingTypes';
import ProfileSetting from '../ProfileSetting';
import PasswordSetting from '../PasswordSetting';

class UpdateProfilePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { isLoading } = this.props;
    if (prevProps.isLoading && !isLoading) {
      this.setState({ showAlert: true });
      setTimeout(() => {
        this.setState({ showAlert: false });
      }, 3000);
    }
  }

  handleMenuClicked = (key) => () => {
    const { history, location } = this.props;
    // history.push()
    history.push(`${location.pathname}#${key}`);
  }

  render() {
    const { showAlert } = this.state;
    const { location, user } = this.props;
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
              <ListGroup.Item action onClick={this.handleMenuClicked('profile')} variant={active === 'profile' ? 'secondary' : null}>Profile</ListGroup.Item>
              <ListGroup.Item action onClick={this.handleMenuClicked('password')} variant={active === 'password' ? 'secondary' : null}>Password</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            {showAlert && <Alert variant="success">Your profile has been updated!</Alert>}
            {content}
          </Col>
        </Row>

      </MainContainer>
    );
  }
}

UpdateProfilePage.propTypes = {
  user: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.currentUser,
  isLoading: Boolean(state.ui.isLoading[USER_UPDATE]),
});

export default compose(
  withRouter,
  connect(mapStateToProps),
)(UpdateProfilePage);
