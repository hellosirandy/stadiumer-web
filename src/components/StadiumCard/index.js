import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { GOOGLE_MAP_API_KEY } from '../../secrets';
import styles from './styles';

class StadiumCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
    };
    const { location } = props.stadium;
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?result_type=locality&latlng=${location.lat},${location.lon}&key=${GOOGLE_MAP_API_KEY}`,
    ).then((result) => result.json()).then((result) => {
      this.setState({ location: result.results[0].formatted_address.trim().replace(/-/g, '') });
    });
  }

  render() {
    const { stadium } = this.props;
    const { location } = this.state;
    return (
      <Card style={styles.card}>
        <div style={{
          ...styles.cover,
          backgroundImage: `url(${stadium.cover})`,
        }}
        />
        <Card.Body style={styles.body}>
          <Card.Title style={{ fontSize: '1rem' }}>{stadium.name}</Card.Title>
          <Card.Subtitle style={styles.subtitle}>{location}</Card.Subtitle>
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
};

export default StadiumCard;
