import React from 'react';
import Card from 'react-bootstrap/Card';

class StadiumCard extends React.PureComponent {
  render() {
    return (
      <Card style={{ width: '18rem' }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Hello there
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default StadiumCard;
