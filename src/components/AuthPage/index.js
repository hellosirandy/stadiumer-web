import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import styles from './styles';
import { signIn, signUp } from '../../store/actions/auth';

class AuthPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      controls: {
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
        },
      },
    }));
  }

  handleFormSubmitted = async (e) => {
    e.preventDefault();
    const {
      controls: {
        email: { value: email },
        password: { value: password },
        firstName: { value: firstName },
        lastName: { value: lastName },
      },
    } = this.state;
    const { match, onSignIn, onSignUp } = this.props;
    const isSignUp = match.params.action === 'signup';
    try {
      if (isSignUp) {
        await onSignUp({
          email, password, firstName, lastName,
        });
      } else {
        await onSignIn(email, password);
      }
    } catch (err) {
      this.setState({ errorMsg: err });
    }
  }

  render() {
    const { match } = this.props;
    const isSignUp = match.params.action === 'signup';
    const confirmPasswordInput = isSignUp ? (
      <Form.Group>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" onChange={this.handleInputChange('confirmPassword')} />
      </Form.Group>
    ) : null;
    const nameInput = isSignUp ? (
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Row>
          <Col>
            <Form.Control placeholder="First name" onChange={this.handleInputChange('firstName')} />
          </Col>
          <Col>
            <Form.Control placeholder="Last name" onChange={this.handleInputChange('lastName')} />
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
        <Form style={{ width: 500 }} onSubmit={this.handleFormSubmitted}>
          <Form.Text as="h1" style={styles.title}>{title}</Form.Text>
          {nameInput}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={this.handleInputChange('email')} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={this.handleInputChange('password')} />
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
  }
}

AuthPage.propTypes = {
  match: PropTypes.object.isRequired,
  onSignIn: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onSignIn: (email, password) => dispatch(signIn(email, password)),
  onSignUp: (options) => dispatch(signUp(options)),
});

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(AuthPage);
