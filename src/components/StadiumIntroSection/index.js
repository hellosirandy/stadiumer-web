import React from 'react';
import PropTypes from 'prop-types';

const StadiumIntroSection = ({ title, children }) => (
  <>
    <hr />
    <h2 style={{ fontSize: '1.3rem' }}>{title}</h2>
    {children}
  </>
);

StadiumIntroSection.defaultProps = {
  title: '',
  children: null,
};

StadiumIntroSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
};

export default StadiumIntroSection;
