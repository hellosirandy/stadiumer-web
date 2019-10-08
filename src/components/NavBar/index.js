import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
// import { getStadiums } from '../../apis/stadium';

class NavBar extends React.PureComponent {
  componentDidMount() {

  }

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          Stadiumer
        </Navbar.Brand>
      </Navbar>
    );
  }
}

export default NavBar;
