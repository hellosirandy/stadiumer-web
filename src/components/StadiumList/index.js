import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getStadiums } from '../../store/actions/stadium';
import StadiumCard from '../StadiumCard';

class StadiumList extends React.PureComponent {
  componentDidMount() {
    const { onGetStadium, type, value } = this.props;
    onGetStadium({ type, value });
  }

  render() {
    const { stadiums, type, value } = this.props;
    const title = type === '' ? 'Recommended' : value;
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
  type: '',
  value: '',
  stadiums: [],
};

StadiumList.propTypes = {
  stadiums: PropTypes.array,
  onGetStadium: PropTypes.func.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
};

const mapStateToProps = (state, props) => ({
  stadiums: state.stadium.stadiums[props.value || 'Recommended'],
});

const mapDispatchToProps = (dispatch) => ({
  onGetStadium: (options) => dispatch(getStadiums(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StadiumList);
