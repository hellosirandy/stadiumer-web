import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import { STADIUM_GET } from '../../store/loadingTypes';
import MainContainer from '../MainContainer';
import NavBarSearch from '../NavBarSearch';

const NavContainer = ({ children }) => (
  <Switch>
    <Route
      path="/"
      exact
      render={() => children}
    />
    <Route
      path="/(stadium|category|auth|writereview|userprofile|updateprofile)"
      render={() => (
        <MainContainer style={{ maxWidth: 1000 }}>
          { children }
        </MainContainer>
      )}
    />
  </Switch>
);

NavContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

class NavBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      displayProgress: true,
    };
    if (props.isLoading) {
      setTimeout(() => {
        const { progress } = this.state;
        if (progress < 60) {
          this.setState({ progress: 60 });
        }
      }, 300);
    }
  }

  componentDidUpdate(prevProps) {
    const { isLoading } = this.props;
    if (prevProps.isLoading && !isLoading) {
      this.setState({
        progress: 100,
      });
      setTimeout(() => {
        this.setState({
          displayProgress: false,
        });
      }, 600);
    }
  }

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

  handleProfileClicked = () => {
    const { history } = this.props;
    history.push('/userprofile/myprofile');
  }

  render() {
    const { isAuthenticated } = this.props;
    const { progress, displayProgress } = this.state;
    const buttonGroup = isAuthenticated ? (
      <>
        <Button variant="outline-secondary" size="sm" style={{ marginRight: 5 }} onClick={this.handleProfileClicked}>My Profile</Button>
        <Button variant="secondary" size="sm" onClick={this.handleLogOutClicked}>Log Out</Button>
      </>
    ) : (
      <>
        <Button variant="outline-secondary" size="sm" style={{ marginRight: 5 }} onClick={this.handleLogInClicked}>Log In</Button>
        <Button variant="secondary" size="sm" onClick={this.handleSignUpClicked}>Sign Up</Button>
      </>
    );
    return (
      <>
        <Navbar bg="light" variant="light" fixed="top">
          {displayProgress && (
          <ProgressBar
            style={{
              position: 'absolute', zIndex: 1200, height: 3, width: '100%', top: 0, left: 0,
            }}
            now={progress}
            label={`${60}%`}
            srOnly
            striped
          />
          )}
          <NavContainer>
            <>
              <Navbar.Brand style={{ cursor: 'pointer' }} onClick={this.handleBrandClicked}>
            Stadiumer
              </Navbar.Brand>
              <NavBarSearch />
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                {buttonGroup}
              </Navbar.Collapse>
            </>
          </NavContainer>

        </Navbar>
      </>
    );
  }
}

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  onSignOut: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: Boolean(state.ui.isLoading[STADIUM_GET]),
});

export default compose(
  withRouter,
  connect(mapStateToProps),
)(NavBar);
