import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import styles from './styles';
import { setStadium } from '../../store/actions/stadium';
import FlexHeightImage from '../FlexHeightImage';
import { GOOGLE_MAP_API_KEY } from '../../secrets';

class StadiumCard extends React.PureComponent {
  handleCardClicked = async () => {
    const { stadium, history, onSetStadium } = this.props;
    await onSetStadium(stadium);
    history.push(`/stadium/${stadium.id}`);
  }

  render() {
    const { stadium } = this.props;
    const cover = `https://maps.googleapis.com/maps/api/place/photo?key=${GOOGLE_MAP_API_KEY}&photoreference=${stadium.photoReferences[0]}&maxwidth=300`;
    return (
      <Card style={styles.card} onClick={this.handleCardClicked}>
        <FlexHeightImage image={cover} height="70%" />
        <Card.Body style={styles.body}>
          <Card.Title style={{ fontSize: '1rem' }}>{stadium.name}</Card.Title>
          <Card.Subtitle style={styles.subtitle}>{stadium.locality}</Card.Subtitle>
          <Card.Text style={styles.content}>
            {stadium.capacity.toLocaleString()}
            &nbsp;•&nbsp;
            {new Date(stadium.opened).getFullYear()}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

StadiumCard.propTypes = {
  stadium: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onSetStadium: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onSetStadium: (stadium) => dispatch(setStadium(stadium)),
});

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(StadiumCard);
