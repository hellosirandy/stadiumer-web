import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './styles';

const StadiumKnownFor = ({ stadium }) => (
  <>
    <Row>
      <Col xs={2} style={styles.title}>
        <span>Capacity</span>
      </Col>
      <Col style={styles.content}><span>{stadium.capacity}</span></Col>
    </Row>
    <Row>
      <Col xs={2} style={styles.title}>
        <span>Architects</span>
      </Col>
      <Col style={styles.content}><span>{stadium.architects.join(', ')}</span></Col>
    </Row>
    <Row>
      <Col xs={2} style={styles.title}>
        <span>Sports</span>
      </Col>
      <Col style={styles.content}>
        <span>{stadium.sports.join(', ')}</span>
      </Col>
    </Row>
    <Row>
      <Col xs={2} style={styles.title}>
        <span>Tenants</span>
      </Col>
      <Col style={styles.content}>
        {Object.keys(stadium.tenants).map((tenant) => (
          <div key={tenant}>
            <span>
              {tenant}
&nbsp;
(
              {stadium.tenants[tenant]}
)
            </span>
            <br />
          </div>
        ))}
      </Col>
    </Row>
  </>
);

StadiumKnownFor.propTypes = {
  stadium: PropTypes.object.isRequired,
};

export default StadiumKnownFor;
