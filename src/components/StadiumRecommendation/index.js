import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './styles';

const StadiumRecommendation = ({ stadium, onClick }) => (
  <Row style={styles.container} onClick={onClick}>
    <Col xs={6}>
      <div style={{ backgroundImage: `url('${stadium.cover}')`, ...styles.cover }} />
    </Col>
    <Col xs={6} style={{ padding: 0 }}>
      <h1 style={styles.title}>{stadium.name}</h1>
      <h2 style={styles.subtitle}>
        {stadium.leagues.map((league) => <span key={league}>{league}</span>)}
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
