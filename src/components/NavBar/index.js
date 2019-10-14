import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const NavContainer = ({ children }) => (
  <Switch>
    <Route
      path="/"
      exact
      render={() => children}
    />
    <Route
      path="/(stadium|category|auth)"
      render={() => (
        <Container>
          { children }
        </Container>
      )}
    />
  </Switch>
);

NavContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

class NavBar extends React.PureComponent {
  handleBrandClicked = () => {
    const { history } = this.props;
    history.push('/');
  }

  handleLogInClicked = () => {
    const { history } = this.props;
    history.push('/auth/login');
  }

  handleSignUpClicked = () => {
    const { history } = this.props;
    history.push('/auth/signup');
  }

  handleLogOutClicked = () => {
    const { onSignOut } = this.props;
    onSignOut();
  }

  render() {
    const { isAuthenticated } = this.props;
    const buttonGroup = isAuthenticated ? (
      <Button variant="secondary" size="sm" onClick={this.handleLogOutClicked}>Log Out</Button>
    ) : (
      <>
        <Button variant="outline-secondary" size="sm" style={{ marginRight: 5 }} onClick={this.handleLogInClicked}>Log In</Button>
        <Button variant="secondary" size="sm" onClick={this.handleSignUpClicked}>Sign Up</Button>
      </>
    );
    return (
      <Navbar bg="light" variant="light" fixed="top">
        <NavContainer>
          <>
            <Navbar.Brand style={{ cursor: 'pointer' }} onClick={this.handleBrandClicked}>
            Stadiumer
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              {buttonGroup}
            </Navbar.Collapse>

          </>
        </NavContainer>

      </Navbar>
    );
  }
}

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  onSignOut: PropTypes.func.isRequired,
};

export default withRouter(NavBar);
