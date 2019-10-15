import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './styles';
import FlexHeightImage from '../FlexHeightImage';

const StadiumRecommendation = ({ stadium, onClick }) => (
  <Row style={styles.container} onClick={onClick}>
    <Col xs={6}>
      <FlexHeightImage image={stadium.cover} height="60%" />
    </Col>
    <Col xs={6} style={{ padding: 0 }}>
      <h1 style={styles.title}>{stadium.name}</h1>
      <h2 style={styles.subtitle}>
        <span>{stadium.leagues.join(', ')}</span>
      </h2>
      <h2 style={styles.subtitle}>{stadium.locality}</h2>
      <h2 style={styles.subtitle}>
        {stadium.capacity}
        &nbsp;•&nbsp;
        {new Date(stadium.opened).getFullYear()}
      </h2>
    </Col>
  </Row>
);

StadiumRecommendation.propTypes = {
  stadium: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default StadiumRecommendation;
