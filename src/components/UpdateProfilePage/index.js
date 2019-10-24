import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import MainContainer from '../MainContainer';
import UserProfileSection from '../UserProfileSection';
import { updateUser } from '../../store/actions/user';
import { USER_UPDATE } from '../../store/loadingTypes';
import FlexHeightImage from '../FlexHeightImage';

class UpdateProfilePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      controls: {
        firstName: {
          value: props.user.profile.firstName,
          touched: false,
        },
        lastName: {
          value: props.user.profile.lastName,
          touched: false,
        },
        profilePic: {
          value: props.user.profile.profilePic,
          touched: false,
        },
      },
      showAlert: false,
      errorMsg: '',
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

  handleInputChange = (key) => ({ target: { value } }) => {
    this.setState((prevState) => ({
      ...prevState,
      controls: {
        ...prevState.controls,
        [key]: {
          value,
          touched: true,
        },
      },
    }));
  }

  handleFormSubmitted = (e) => {
    e.preventDefault();
    const { controls } = this.state;
    const { onUpdateUser } = this.props;
    const updates = {};
    Object.keys(controls).forEach((key) => {
      if (controls[key].touched) {
        updates[key] = controls[key].value;
      }
    });
    onUpdateUser(updates);
  }

  handleChooseFileClicked = () => this.fileInput.click()

  handleFileChanged = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.handleInputChange('profilePic')({ target: { value: reader.result } });
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  render() {
    const { controls, showAlert } = this.state;
    return (
      <MainContainer style={{ marginTop: 56, padding: '50px 0' }}>
        <Row>
          <Col xs={3}>
            <ListGroup>
              <ListGroup.Item action variant="secondary">Reviews</ListGroup.Item>
              <ListGroup.Item action>Friends</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            {showAlert && <Alert variant="success">Your profile has been updated!</Alert>}
            <UserProfileSection title="Profile">
              <Form onSubmit={this.handleFormSubmitted}>
                <Form.Group>
                  <Form.Label>
                    Profile Photo
                    {' '}
                  </Form.Label>
                  <Form.Row style={{ marginBottom: 8 }}>
                    <Button onClick={this.handleChooseFileClicked} variant="outline-dark" size="sm">Choose a file...</Button>
                    <input type="file" style={{ display: 'none' }} ref={(fileInput) => this.fileInput = fileInput} onChange={this.handleFileChanged} />
                  </Form.Row>
                  <Form.Row>
                    <div style={{ width: 100 }}>
                      <FlexHeightImage image={controls.profilePic.value || '/images/boy.svg'} />
                    </div>
                  </Form.Row>
                </Form.Group>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" value={controls.firstName.value} onChange={this.handleInputChange('firstName')} />
                  <Form.Text className="text-muted">
                    This field is required.
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" value={controls.lastName.value} onChange={this.handleInputChange('lastName')} />
                  <Form.Text className="text-muted">
                    This field is required.
                  </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Save changes
                </Button>
              </Form>
            </UserProfileSection>
          </Col>
        </Row>

      </MainContainer>
    );
  }
}

UpdateProfilePage.propTypes = {
  user: PropTypes.object.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.currentUser,
  isLoading: Boolean(state.ui.isLoading[USER_UPDATE]),
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateUser: (updates) => dispatch(updateUser(updates)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(UpdateProfilePage);
