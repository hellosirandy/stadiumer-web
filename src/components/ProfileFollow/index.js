import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const ProfileFollow = ({ users }) => (
  <Row>
    {users.ids.map((uid) => (
      <Col xs={4} key={uid} style={{ marginBottom: 10 }}>
        <Image src={users.table[uid].profilePic || '/images/boy.svg'} roundedCircle width={50} height={50} style={{ marginRight: 10, objectFit: 'cover' }} />
        <a href={`/#/userprofile/${users.table[uid].id}`}>{users.table[uid].name}</a>
      </Col>
    ))}
  </Row>
);

ProfileFollow.propTypes = {
  users: PropTypes.object.isRequired,
};

export default ProfileFollow;
