import React from 'react';
import { withRouter } from 'react-router-dom';
import StadiumList from '../StadiumList';

class HomePage extends React.PureComponent {
  render() {
    return (
      <div style={{ padding: '0 2rem' }}>
        <StadiumList />
      </div>
    );
  }
}

export default withRouter(HomePage);
