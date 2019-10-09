import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { withRouter } from 'react-router-dom';

class NavBar extends React.PureComponent {
  handleBrandClicked = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Container style={{ padding: 0 }}>
          <Row>
            <Col xs={12}>
              <Navbar.Brand style={{ cursor: 'pointer' }} onClick={this.handleBrandClicked}>
          Stadiumer
              </Navbar.Brand>
            </Col>
          </Row>

        </Container>

      </Navbar>
    );
  }
}

NavBar.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(NavBar);
