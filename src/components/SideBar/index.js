import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './styles';

const sports = [
  'Football',
  'Baseball',
  'Soccer',
  'Hockey',
  'Basketball',
];

const leagues = [
  'NFL',
  'MLB',
  'NHL',
  'Premier League',
  'NBA',
  'NCAA',
  'La Liga',
  'MLS',
  'Serie A',
];

const SideBar = () => (
  <div style={styles.container}>
    <ListGroup>
      <ListGroup.Item action style={styles.listItem}>Home</ListGroup.Item>
      <ListGroup.Item as="div" style={styles.divider}><hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} /></ListGroup.Item>
      <ListGroup.Item as="h6" style={styles.listItem}>Sports</ListGroup.Item>
      {sports.map((sport) => (
        <ListGroup.Item
          key={sport}
          action
          style={styles.listItem}
          href={`/#/category?type=sport&value=${encodeURIComponent(sport.toLowerCase())}`}
        >
          {sport}
        </ListGroup.Item>
      ))}
      <ListGroup.Item as="div" style={styles.divider}><hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} /></ListGroup.Item>
      <ListGroup.Item as="h6" style={styles.listItem}>Leagues</ListGroup.Item>
      {leagues.map((league) => (
        <ListGroup.Item
          key={league}
          action
          style={styles.listItem}
          href={`/#/category?type=league&value=${encodeURIComponent(league)}`}
        >
          {league}
        </ListGroup.Item>
      ))}
    </ListGroup>
  </div>
);

export default SideBar;
