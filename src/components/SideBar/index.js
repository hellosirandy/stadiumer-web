import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './styles';

const SideBar = () => (
  <div style={styles.container}>
    <ListGroup>
      <ListGroup.Item action style={styles.listItem}>Home</ListGroup.Item>
      <ListGroup.Item as="div" style={styles.divider}><hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} /></ListGroup.Item>
      <ListGroup.Item as="h6" style={styles.listItem}>Sports</ListGroup.Item>
      <ListGroup.Item action style={styles.listItem}>Football</ListGroup.Item>
      <ListGroup.Item action style={styles.listItem}>Baseball</ListGroup.Item>
      <ListGroup.Item action style={styles.listItem}>Soccer</ListGroup.Item>
      <ListGroup.Item action style={styles.listItem}>Hockey</ListGroup.Item>
      <ListGroup.Item action style={styles.listItem}>Basketball</ListGroup.Item>
      <ListGroup.Item as="div" style={styles.divider}><hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} /></ListGroup.Item>
      <ListGroup.Item as="h6" style={styles.listItem}>Leagues</ListGroup.Item>
      <ListGroup.Item action style={styles.listItem}>NFL</ListGroup.Item>
      <ListGroup.Item action style={styles.listItem}>MLB</ListGroup.Item>
      <ListGroup.Item action style={styles.listItem}>NHL</ListGroup.Item>
      <ListGroup.Item action style={styles.listItem}>Premier League</ListGroup.Item>
      <ListGroup.Item action style={styles.listItem}>NBA</ListGroup.Item>
    </ListGroup>
  </div>
);

export default SideBar;
