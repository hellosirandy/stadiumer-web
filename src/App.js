import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from './components/NavBar';
import StadiumCard from './components/StadiumCard';
import { getStadiums } from './store/actions/stadium';

class App extends React.PureComponent {
  componentDidMount() {
    const { onGetStadium } = this.props;
    onGetStadium();
  }

  render() {
    const { stadiums } = this.props;
    return (
      <>
        <NavBar />
        <Row>
          {stadiums.map((stadium) => (
            <Col xs={2} key={stadium.id}>
              <StadiumCard stadium={stadium} />
            </Col>
          ))}
        </Row>

      </>
    );
  }
}

App.propTypes = {
  stadiums: PropTypes.array.isRequired,
  onGetStadium: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stadiums: state.stadium.stadiums,
});

const mapDispatchToProps = (dispatch) => ({
  onGetStadium: () => dispatch(getStadiums()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
