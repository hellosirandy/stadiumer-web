import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StadiumList from '../StadiumList';
import SideBar from '../SideBar';
import WelcomeJumbo from '../WelcomeJumbo';

const BrowsePage = () => {
  const isAuthenticated = useSelector((state) => Boolean(state.auth.token));
  const stadiumCount = useSelector((state) => state.stadium.totalCount);
  const groupStadiums = useSelector((state) => state.stadium.stadiums);
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
        {!isAuthenticated && <WelcomeJumbo count={stadiumCount} />}
        {groupNames.map((groupName) => (
          <StadiumList
            key={groupName}
            title={groupName}
            stadiums={groupStadiums[groupName].stadiums.slice(0, 8)}
          />
        ))}
      </div>
    </>
  );
};

export default withRouter(BrowsePage);
