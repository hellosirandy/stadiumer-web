import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './styles';

const StadiumKnownFor = ({ stadium }) => (
  <>
    <Row>
      <Col xs={2} style={styles.title}>
        <span>Capacity</span>
      </Col>
      <Col style={styles.content}>
        {Object.keys(stadium.capacities).map((sport) => (
          <div key={sport}>
            <span>
              {sport}
:
&nbsp;
              {stadium.capacities[sport].toLocaleString()}
            </span>
            <br />
          </div>
        ))}

      </Col>
    </Row>
    <Row>
      <Col xs={2} style={styles.title}>
        <span>Architects</span>
      </Col>
      <Col style={styles.content}><span>{stadium.architects.join(', ')}</span></Col>
    </Row>
    <Row>
      <Col xs={2} style={styles.title}>
        <span>Opened</span>
      </Col>
      <Col style={styles.content}>
        <span>{moment(stadium.opened).utc().format('LL')}</span>
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
              <a href={`/#/category?type=league&value=${encodeURIComponent(stadium.tenants[tenant])}`}>{stadium.tenants[tenant]}</a>

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
