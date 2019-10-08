import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getStadiums } from '../../store/actions/stadium';
import StadiumCard from '../StadiumCard';

class StadiumList extends React.PureComponent {
  componentDidMount() {
    const { onGetStadium } = this.props;
    onGetStadium();
  }

  render() {
    const { stadiums } = this.props;
    return (
      <>
        <Row style={{ margin: 0 }}>
          <Col xs={12} style={{ padding: 5 }}>
            <h1 style={{ margin: '0.6rem 0', fontSize: '1.2rem' }}>Recommended</h1>
          </Col>
          {stadiums.map((stadium) => (
            <Col xs={2} key={stadium.id} style={{ padding: 5 }}>
              <StadiumCard stadium={stadium} />
            </Col>
          ))}
        </Row>
      </>
    );
  }
}

StadiumList.propTypes = {
  stadiums: PropTypes.array.isRequired,
  onGetStadium: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stadiums: state.stadium.stadiums,
});

const mapDispatchToProps = (dispatch) => ({
  onGetStadium: () => dispatch(getStadiums()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StadiumList);
