import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StadiumList from '../StadiumList';
import { getStadiums } from '../../store/actions/stadium';
import SideBar from '../SideBar';
import Map from '../Map';

class CategoryPage extends React.PureComponent {
  constructor(props) {
    super(props);
    const { location, onGetStadium, groupStadiums } = props;
    const values = queryString.parse(location.search);
    const { type, value } = values;
    if (!groupStadiums[value] || !groupStadiums[value].fullLoad) {
      onGetStadium({ type, value, limit: 500 });
    }
    this.state = {
      title: value,
    };
  }

  componentDidUpdate(prevProps) {
    const { location, onGetStadium, groupStadiums } = this.props;
    if (location.search !== prevProps.location.search) {
      const values = queryString.parse(location.search);
      const { type, value } = values;
      if (!groupStadiums[value] || !groupStadiums[value].fullLoad) {
        onGetStadium({ type, value, limit: 500 });
      }
      this.setState({ title: value });
    }
  }

  render() {
    const { title } = this.state;
    const { groupStadiums } = this.props;
    return (
      <>
        <SideBar />
        <div style={{ padding: '56px 2rem 0', marginLeft: 200 }}>
          {groupStadiums[title] && groupStadiums[title].stadiums.length > 0 && (
            <>
              <Row style={{ margin: '1rem 0' }}>
                <Col xs={6} style={{ padding: 5 }}>
                  <h1 style={{ fontSize: '2rem' }}>
                    {title}
                    {' '}
-
                    {' '}
                    {groupStadiums[title].stadiums.length}
                    {' '}
              stadiums
                  </h1>
                </Col>
                <Col xs={6} style={{ padding: 5 }}>
                  <Map locations={groupStadiums[title].stadiums.map((s) => s.location)} style={{ width: '100%' }} />

                </Col>
              </Row>


              <StadiumList stadiums={groupStadiums[title].stadiums} />
            </>

          )}
        </div>


      </>
    );
  }
}

CategoryPage.propTypes = {
  location: PropTypes.object.isRequired,
  onGetStadium: PropTypes.func.isRequired,
  groupStadiums: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onGetStadium: (options) => dispatch(getStadiums(options)),
});

const mapStateToProps = (state) => ({
  groupStadiums: state.stadium.stadiums,
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(CategoryPage);
