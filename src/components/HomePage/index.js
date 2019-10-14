import React from 'react';
import { withRouter } from 'react-router-dom';
import StadiumList from '../StadiumList';
import SideBar from '../SideBar';

class HomePage extends React.PureComponent {
  render() {
    return (
      <>
        <SideBar />
        <div style={{ padding: '0 2rem', marginLeft: 200, paddingTop: 56 }}>
          <StadiumList />
          <StadiumList type="league" value="MLB" />
          <StadiumList type="league" value="NFL" />
        </div>
      </>
    );
  }
}

export default withRouter(HomePage);
