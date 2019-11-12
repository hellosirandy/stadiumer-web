import React from 'react';
import PropTypes from 'prop-types';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

const WelcomeJumbo = ({ count }) => (
  <Jumbotron style={{ margin: '1rem 0' }}>
    <h1>
              Welcome to home for
      {' '}
      {count}
      {' '}
              stadiums.
    </h1>
    <p>
              Check photos and information or amazing stadiums worldwide.
              Besides that, see how people think about them!
    </p>
    <p>
      <Button size="sm" href="/#/auth/login">Login</Button>
    </p>
  </Jumbotron>
);

WelcomeJumbo.propTypes = {
  count: PropTypes.number.isRequired,
};

export default WelcomeJumbo;
