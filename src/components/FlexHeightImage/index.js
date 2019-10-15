import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

const FlexHeightImage = ({ image, height }) => (
  <>
    <div style={{ ...styles.cover, paddingTop: height }}>
      <img src={image} style={styles.coverImg} alt="" />
    </div>
  </>
);

FlexHeightImage.defaultProps = {
  height: '100%',
};

FlexHeightImage.propTypes = {
  image: PropTypes.string.isRequired,
  height: PropTypes.string,
};

export default FlexHeightImage;
