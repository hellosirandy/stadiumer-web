import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import StadiumList from '../StadiumList';

class CategoryPage extends React.PureComponent {
  render() {
    const { location } = this.props;
    const values = queryString.parse(location.search);
    const { type, value } = values;
    return (
      <Container style={{ padding: 0, paddingTop: 56 }}>
        <StadiumList type={type} value={value} limit={100} />
      </Container>
    );
  }
}

CategoryPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(CategoryPage);
