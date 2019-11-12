import React from 'react';
import PropTypes from 'prop-types';

const UserProfileSection = ({ title, children }) => (
  <>
    <h1 style={{ fontSize: '1.6rem' }}>{title}</h1>
    <hr />
    {children}
  </>
);

UserProfileSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default UserProfileSection;
