import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import styles from './styles';
import { setStadium } from '../../store/actions/stadium';
import FlexHeightImage from '../FlexHeightImage';
import { GOOGLE_MAP_API_KEY } from '../../secrets';

const StadiumCard = ({ stadium, history }) => {
  const dispatch = useDispatch();

  const handleCardClicked = () => {
    dispatch(setStadium(stadium));
    history.push(`/stadium/${stadium.id}`);
  };
  const cover = `https://maps.googleapis.com/maps/api/place/photo?key=${GOOGLE_MAP_API_KEY}&photoreference=${stadium.photoReferences[0]}&maxwidth=300`;
  return (
    <Card style={styles.card} onClick={handleCardClicked}>
      <FlexHeightImage image={cover} height="70%" />
      <Card.Body style={styles.body}>
        <Card.Title style={{ fontSize: '1rem' }}>{stadium.name}</Card.Title>
        <Card.Subtitle style={styles.subtitle}>{stadium.locality}</Card.Subtitle>
        <Card.Text style={styles.content}>
          {stadium.maxCapacity.toLocaleString()}
            &nbsp;•&nbsp;
          {new Date(stadium.opened).getFullYear()}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

StadiumCard.propTypes = {
  stadium: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(StadiumCard);
