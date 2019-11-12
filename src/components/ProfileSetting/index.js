import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FlexHeightImage from '../FlexHeightImage';
import { updateUser } from '../../store/actions/user';

const ProfileSetting = ({ user }) => {
  const setFormValue = (profile) => ({
    firstName: {
      value: profile.firstName || '',
      touched: false,
    },
    lastName: {
      value: profile.lastName || '',
      touched: false,
    },
    profilePic: {
      value: profile.profilePic || '',
      touched: false,
    },
  });
  const [controls, setControls] = useState(setFormValue(user.profile));

  const userRef = useRef(user);
  const fileInputRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    if (userRef.current !== user) {
      setControls(setFormValue(user.profile));
    }
    userRef.current = user;
  }, [user]);

  const handleInputChange = (key) => ({ target: { value } }) => {
    setControls({
      ...controls,
      [key]: {
        value,
        touched: true,
      },
    });
  };

  const handleFormSubmitted = (e) => {
    e.preventDefault();
    const updates = {};
    Object.keys(controls).forEach((key) => {
      if (controls[key].touched) {
        updates[key] = controls[key].value;
      }
    });
    dispatch(updateUser(updates));
  };

  const handleChooseFileClicked = () => fileInputRef.click();

  const handleFileChanged = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      handleInputChange('profilePic')({ target: { value: reader.result } });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Form onSubmit={handleFormSubmitted}>
      <Form.Group>
        <Form.Label>
                  Profile Photo
          {' '}
        </Form.Label>
        <Form.Row style={{ marginBottom: 8 }}>
          <Button onClick={handleChooseFileClicked} variant="outline-dark" size="sm">Choose a file...</Button>
          <input type="file" style={{ display: 'none' }} ref={(fileInput) => { fileInputRef.current = fileInput; }} onChange={handleFileChanged} />
        </Form.Row>
        <Form.Row>
          <div style={{ width: 100 }}>
            <FlexHeightImage image={controls.profilePic.value || '/images/boy.svg'} />
          </div>
        </Form.Row>
      </Form.Group>
      <Form.Group>
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" value={controls.firstName.value} onChange={handleInputChange('firstName')} />
        <Form.Text className="text-muted">
                  This field is required.
        </Form.Text>
      </Form.Group>

      <Form.Group>
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" value={controls.lastName.value} onChange={handleInputChange('lastName')} />
        <Form.Text className="text-muted">
                  This field is required.
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
                Save changes
      </Button>
    </Form>
  );
};

ProfileSetting.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onUpdateUser: (updates) => dispatch(updateUser(updates)),
});

export default compose(
  connect(null, mapDispatchToProps),
)(ProfileSetting);
