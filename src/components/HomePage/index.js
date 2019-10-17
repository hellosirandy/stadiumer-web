import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import StadiumList from '../StadiumList';
import SideBar from '../SideBar';

class HomePage extends React.PureComponent {
  render() {
    const { groupStadiums } = this.props;
    const groupNames = Object.keys(groupStadiums);
    groupNames.sort((x, y) => {
      if (x === 'Recommended') {
        return -1;
      }
      if (y === 'Recommended') {
        return 1;
      }
      return 0;
    });
    return (
      <>
        <SideBar />
        <div style={{ padding: '0 2rem', marginLeft: 200, paddingTop: 56 }}>
          {groupNames.map((groupName) => (
            <StadiumList key={groupName} title={groupName} stadiums={groupStadiums[groupName].slice(0, (groupName === 'Recommended' ? 12 : 6))} />
          ))}
        </div>
      </>
    );
  }
}

HomePage.propTypes = {
  groupStadiums: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  groupStadiums: state.stadium.stadiums,
});

export default compose(
  withRouter,
  connect(mapStateToProps),
)(HomePage);
