import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import styles from './styles';
import { signIn, signUp } from '../../store/actions/auth';

const AuthPage = ({
  match,
}) => {
  const [controls, setControls] = useState({
    email: {
      value: '',
    },
    password: {
      value: '',
    },
    confirmPassword: {
      value: '',
    },
    firstName: {
      value: '',
    },
    lastName: {
      value: '',
    },
  });
  // const [errorMsg, setErrorMsg] = useState('');

  const dispatch = useDispatch();

  const handleInputChange = (key) => ({ target: { value } }) => {
    setControls({
      ...controls,
      [key]: {
        ...controls[key],
        value,
      },
    });
  };

  const handleFormSubmitted = async (e) => {
    e.preventDefault();
    const {
      email: { value: email },
      password: { value: password },
      firstName: { value: firstName },
      lastName: { value: lastName },
    } = controls;
    const isSignUp = match.params.action === 'signup';
    try {
      if (isSignUp) {
        await dispatch(signUp({
          email, password, firstName, lastName,
        }));
      } else {
        await dispatch(signIn(email, password));
      }
    } catch (err) {
      // setErrorMsg(err);
    }
  };

  const isSignUp = match.params.action === 'signup';
  const confirmPasswordInput = isSignUp ? (
    <Form.Group>
      <Form.Label>Confirm Password</Form.Label>
      <Form.Control type="password" placeholder="Confirm Password" onChange={handleInputChange('confirmPassword')} />
    </Form.Group>
  ) : null;
  const nameInput = isSignUp ? (
    <Form.Group>
      <Form.Label>Name</Form.Label>
      <Form.Row>
        <Col>
          <Form.Control placeholder="First name" onChange={handleInputChange('firstName')} />
        </Col>
        <Col>
          <Form.Control placeholder="Last name" onChange={handleInputChange('lastName')} />
        </Col>
      </Form.Row>
    </Form.Group>
  ) : null;
  const title = isSignUp ? 'Sign Up for Stadiumer' : 'Log In to Stadiumer';
  const footer = isSignUp ? (
    <span>
        Already on Stadiumer?&nbsp;
      <a href="/#/auth/login">Log in</a>
    </span>
  ) : (
    <span>
        New to Stadiumer?&nbsp;
      <a href="/#/auth/signup">Sign up</a>
    </span>
  );
  return (
    <Container style={styles.container}>
      <Form style={{ width: 500 }} onSubmit={handleFormSubmitted}>
        <Form.Text as="h1" style={styles.title}>{title}</Form.Text>
        {nameInput}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={handleInputChange('email')} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={handleInputChange('password')} />
        </Form.Group>
        {confirmPasswordInput}
        <div style={{ justifyContent: 'flex-end', display: 'flex' }}>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>

        <Form.Group style={{ justifyContent: 'flex-end', display: 'flex' }}>
          <Form.Text>{footer}</Form.Text>

        </Form.Group>

      </Form>
    </Container>
  );
};

AuthPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(AuthPage);
