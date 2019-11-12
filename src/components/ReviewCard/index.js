import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Rating from 'react-rating';
import moment from 'moment';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import FlexHeightImage from '../FlexHeightImage';
import { GOOGLE_MAP_API_KEY } from '../../secrets';
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

  const cover = `https://maps.googleapis.com/maps/api/place/photo?key=${GOOGLE_MAP_API_KEY}&photoreference=${review.stadium.cover}&maxwidth=300`;
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
      <FlexHeightImage image={cover} height="50%" />
      <Card.Body style={{ padding: '1rem' }}>
        <Card.Title style={{ fontWeight: 500 }} onClick={handleTitleClicked} as="a" href="/#/">{review.stadium.name}</Card.Title>
        <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
        <div>
          <Rating
            initialRating={review.rating}
            readonly
            emptySymbol="fa fa-star-o fa-lg low"
            fullSymbol="fa fa-star fa-lg low"
            style={{ marginRight: 8 }}
          />
        </div>
        <Card.Text>
          {review.review}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(ReviewCard);
