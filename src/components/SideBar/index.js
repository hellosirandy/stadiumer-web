import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './styles';

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
  'Russian Premier League',
  'Ligue 1',
  'NPB',
];

const tournaments = [
  'UEFA Euro 2016',
  'UEFA Euro 2012',
  '2018 FIFA World Cup',
  '2014 FIFA World Cup',
];

const SideBar = () => (
  <div style={styles.container}>
    <ListGroup>
      <ListGroup.Item href="/#/" action style={styles.listItem}>Home</ListGroup.Item>
      <ListGroup.Item href="/#/browse" action style={styles.listItem}>Browse</ListGroup.Item>
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
      <ListGroup.Item as="div" style={styles.divider}><hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} /></ListGroup.Item>
      <ListGroup.Item as="h6" style={styles.listItem}>Tournaments</ListGroup.Item>
      {tournaments.map((tournament) => (
        <ListGroup.Item
          key={tournament}
          action
          style={styles.listItem}
          href={`/#/category?type=tournament&value=${encodeURIComponent(tournament)}`}
        >
          {tournament}
        </ListGroup.Item>
      ))}
    </ListGroup>
  </div>
);

export default SideBar;
