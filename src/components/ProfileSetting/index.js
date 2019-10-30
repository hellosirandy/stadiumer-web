import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FlexHeightImage from '../FlexHeightImage';
import { updateUser } from '../../store/actions/user';

class ProfileSetting extends React.PureComponent {
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
      errorMsg: '',
    };
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
    const { controls } = this.state;
    return (
      <Form onSubmit={this.handleFormSubmitted}>
        <Form.Group>
          <Form.Label>
                    Profile Photo
            {' '}
          </Form.Label>
          <Form.Row style={{ marginBottom: 8 }}>
            <Button onClick={this.handleChooseFileClicked} variant="outline-dark" size="sm">Choose a file...</Button>
            <input type="file" style={{ display: 'none' }} ref={(fileInput) => { this.fileInput = fileInput; }} onChange={this.handleFileChanged} />
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
    );
  }
}

ProfileSetting.propTypes = {
  onUpdateUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onUpdateUser: (updates) => dispatch(updateUser(updates)),
});

export default compose(
  connect(null, mapDispatchToProps),
)(ProfileSetting);
