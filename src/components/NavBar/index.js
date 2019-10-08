import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import { withRouter } from 'react-router-dom';

class NavBar extends React.PureComponent {
  handleBrandClicked = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand style={{ cursor: 'pointer' }} onClick={this.handleBrandClicked}>
          Stadiumer
        </Navbar.Brand>
      </Navbar>
    );
  }
}

NavBar.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(NavBar);
