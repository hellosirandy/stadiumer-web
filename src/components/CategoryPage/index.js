import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import StadiumList from '../StadiumList';
import { getStadiums } from '../../store/actions/stadium';
import MainContainer from '../MainContainer';

class CategoryPage extends React.PureComponent {
  constructor(props) {
    super(props);
    const { location, onGetStadium, groupStadiums } = props;
    const values = queryString.parse(location.search);
    const { type, value } = values;
    if (!groupStadiums[value] || groupStadiums[value].length === 6) {
      onGetStadium({ type, value, limit: 500 });
    }
    this.state = {
      title: value,
    };
  }

  render() {
    const { title } = this.state;
    const { groupStadiums } = this.props;
    return (
      <MainContainer style={{ padding: 0, paddingTop: 56 }}>
        <StadiumList title={title} stadiums={groupStadiums[title]} />
      </MainContainer>
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
