import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


const NavContainer = ({ children }) => (
  <Switch>
    <Route
      path="/"
      exact
      render={() => (
        <>
          { children }
        </>
      )}
    />
    <Route
      path="/stadium"
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

  render() {
    return (
      <Navbar bg="light" variant="light" fixed="top">
        <NavContainer>
          <Row>
            <Col xs={12}>
              <Navbar.Brand style={{ cursor: 'pointer' }} onClick={this.handleBrandClicked}>
                Stadiumer
              </Navbar.Brand>
            </Col>
          </Row>

        </NavContainer>

      </Navbar>
    );
  }
}

NavBar.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(NavBar);
