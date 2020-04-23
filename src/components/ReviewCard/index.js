import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Rating from 'react-rating';
import moment from 'moment';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { getStadium } from '../../store/actions/stadium';

const ReviewCard = ({
  review, history,
}) => {
  const dispatch = useDispatch();

  const handleTitleClicked = async (e) => {
    e.preventDefault();
    await dispatch(getStadium(review.stadium.id));
    history.push(`/stadium/${review.stadium.id}`);
  };

  return (
    <Card>
      <Card.Header style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
        <div style={{ display: 'flex' }}>
          <Image src={review.author.profilePic || '/images/boy.svg'} roundedCircle width={40} height={40} style={{ marginRight: 10, objectFit: 'cover' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <a style={{ fontSize: '.9rem' }} href={`/#/userprofile/${review.author.id}`}>
              {review.author.name}
            </a>
            <span style={{ fontSize: '.8rem', color: 'gray' }}>{moment(review.timestamp).format('LLL')}</span>
          </div>
        </div>

      </Card.Header>
      <Card.Body style={{ padding: '1rem' }}>
        <Card.Title style={{ fontWeight: 500 }} onClick={handleTitleClicked} as="a" href="/#/">{review.stadium.name}</Card.Title>
        <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
        <div>
          <Rating
            initialRating={review.rating}
            readonly
            emptySymbol="fa fa-star fa-lg"
            fullSymbol="fa fa-star fa-lg"
            style={{ marginRight: 8 }}
          />
        </div>
        <Card.Text>
          {review.review}
        </Card.Text>
      </Card.Body>
      <Card.Footer style={{ padding: '0.5rem 1rem' }}>
        <Button variant="link" size="sm" style={{ color: '#5c5c5c' }}>
          <i className="fa fa-thumbs-up fa-sm" />
          {' '}
123
        </Button>
      </Card.Footer>
    </Card>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(ReviewCard);
