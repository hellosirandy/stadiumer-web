import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';

const MainContainer = ({ children, style }) => (
  <Container style={{ maxWidth: 1000, ...style }}>
    {children}
  </Container>
);

MainContainer.defaultProps = {
  style: {},
};

MainContainer.propTypes = {
  children: PropTypes.object.isRequired,
  style: PropTypes.object,
};

export default MainContainer;
