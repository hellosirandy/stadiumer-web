import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StadiumCard from '../StadiumCard';

class StadiumList extends React.PureComponent {
  render() {
    const { stadiums, title } = this.props;
    return stadiums ? (
      <>
        <Row style={{ margin: 0 }}>
          <Col xs={12} style={{ padding: 5 }}>
            <h1 style={{ margin: '0.6rem 0', fontSize: '1.2rem' }}>{title}</h1>
          </Col>
          {stadiums.map((stadium) => (
            <Col xs={2} key={stadium.id} style={{ padding: 5 }}>
              <StadiumCard stadium={stadium} />
            </Col>
          ))}
        </Row>
      </>
    ) : null;
  }
}

StadiumList.defaultProps = {
  stadiums: [],
};

StadiumList.propTypes = {
  title: PropTypes.string.isRequired,
  stadiums: PropTypes.array,
};

export default StadiumList;
