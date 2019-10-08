import React from 'react';
import PropTypes from 'prop-types';

class StadiumPage extends React.PureComponent {
  render() {
    const { stadium } = this.props;
    return (
      <>
        <h1>{stadium.name}</h1>
      </>
    );
  }
}

StadiumPage.propTypes = {
  stadium: PropTypes.object.isRequired,
};

export default StadiumPage;
