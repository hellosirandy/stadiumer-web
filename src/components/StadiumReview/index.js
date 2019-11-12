import React from 'react';
import PropTypes from 'prop-types';
import Rating from 'react-rating';
import moment from 'moment';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FlexHeightImage from '../FlexHeightImage';

const StadiumReview = ({ review }) => (
  <>
    <Row>
      <Col xs={5}>
        <Row>
          <Col xs={4}>
            <FlexHeightImage image={review.author.profilePic || '/images/boy.svg'} />
          </Col>
          <Col style={{ paddingLeft: 0 }}>
            <a href={`/#/userprofile/${review.author.id}`}>
              {review.author.name}
            </a>


          </Col>
        </Row>

      </Col>
      <Col xs={7}>
        <div style={{ alignItems: 'center', display: 'flex' }}>

          <Rating
            initialRating={review.rating}
            readonly
            emptySymbol="fa fa-star-o fa-lg low"
            fullSymbol="fa fa-star fa-lg low"
            style={{ marginRight: 8 }}
          />
          <span style={{ color: 'gray' }}>
            {moment(review.timestamp).format('L')}
          </span>
        </div>
        <div style={{ marginTop: 6 }}>
          {review.review}
        </div>

      </Col>
    </Row>
    <hr />
  </>
);

StadiumReview.propTypes = {
  review: PropTypes.object.isRequired,
};

export default StadiumReview;
