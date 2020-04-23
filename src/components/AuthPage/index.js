import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import styles from './styles';
import { signIn, signUp } from '../../store/actions/auth';
import { validate, validateForm } from '../../utils/validation';

const AuthPage = ({
  match,
}) => {
  const [controls, setControls] = useState({
    email: {
      value: '',
      valid: true,
      validationRules: ['isEmail'],
      errorMsg: 'Please fill email correctly.',
    },
    password: {
      value: '',
      valid: true,
      validationRules: ['notEmpty'],
      errorMsg: 'Password cannot be empty.',
    },
    confirmPassword: {
      value: '',
      valid: true,
      validationRules: ['equalsTo'],
      errorMsg: 'Confirm password and password should be identical',
    },
    firstName: {
      value: '',
      valid: true,
      validationRules: ['notEmpty'],
      errorMsg: 'First name cannot be empty.',
    },
    lastName: {
      value: '',
      valid: true,
      validationRules: ['notEmpty'],
      errorMsg: 'Last name cannot be empty.',
    },
  });
  const [errorMsg, setErrorMsg] = useState('');

  const dispatch = useDispatch();

  const handleInputChange = (key) => ({ target: { value } }) => {
    setControls({
      ...controls,
      [key]: {
        ...controls[key],
        value,
      },
    });
    // setTouched(true);
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
    const keys = isSignUp
      ? ['email', 'password', 'confirmPassword', 'firstName', 'lastName']
      : ['email', 'password', 'confirmPassword'];
    try {
      validateForm(controls, keys);
      try {
        if (isSignUp) {
          await dispatch(signUp({
            email, password, firstName, lastName,
          }));
        } else {
          await dispatch(signIn(email, password));
        }
      } catch (err) {
        setErrorMsg(err);
      }
    } catch (err) {
      setErrorMsg(err);
    }
  };

  const handleInputBlurred = (key) => () => {
    const valid = key === 'confirmPassword'
      ? validate(controls[key].value, controls[key].validationRules, controls.password.value)
      : validate(controls[key].value, controls[key].validationRules);
    if (valid !== controls[key].valid) {
      setControls({
        ...controls,
        [key]: {
          ...controls[key],
          valid,
        },
      });
    }
  };

  const isSignUp = match.params.action === 'signup';
  const confirmPasswordInput = isSignUp ? (
    <Form.Group>
      <Form.Label>Confirm Password</Form.Label>
      <Form.Control
        isInvalid={!controls.confirmPassword.valid}
        onBlur={handleInputBlurred('confirmPassword')}
        type="password"
        placeholder="Confirm Password"
        onChange={handleInputChange('confirmPassword')}
      />
    </Form.Group>
  ) : null;
  const nameInput = isSignUp ? (
    <Form.Group>
      <Form.Label>Name</Form.Label>
      <Form.Row>
        <Col>
          <Form.Control
            isInvalid={!controls.firstName.valid}
            onBlur={handleInputBlurred('firstName')}
            placeholder="First name"
            onChange={handleInputChange('firstName')}
          />
        </Col>
        <Col>
          <Form.Control
            isInvalid={!controls.lastName.valid}
            onBlur={handleInputBlurred('lastName')}
            placeholder="Last name"
            onChange={handleInputChange('lastName')}
          />
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
        {!!errorMsg && (
        <Alert variant="danger">
          {errorMsg}
        </Alert>
        )}
        {nameInput}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            isInvalid={!controls.email.valid}
            onBlur={handleInputBlurred('email')}
            type="email"
            placeholder="Enter email"
            onChange={handleInputChange('email')}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            isInvalid={!controls.password.valid}
            onBlur={handleInputBlurred('password')}
            type="password"
            placeholder="Password"
            onChange={handleInputChange('password')}
          />
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
