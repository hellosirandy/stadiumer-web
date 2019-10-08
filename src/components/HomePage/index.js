import React from 'react';
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

export default HomePage;
