import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rating from 'react-rating';
import Pagination from 'react-bootstrap/Pagination';
import moment from 'moment';
import FlexHeightImage from '../FlexHeightImage';
import { GOOGLE_MAP_API_KEY } from '../../secrets';
import { getStadium } from '../../store/actions/stadium';
import ProfileReviewDropdown from '../ProfileReviewDropdown';

const pageSize = 6;

const ProfileReview = ({
  reviews, history, onGetStadium, match,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageItemClicked = (page) => () => {
    setCurrentPage(page);
  };

  const handleStadiumClicked = (id) => async (e) => {
    e.preventDefault();
    await onGetStadium(id);
    history.push(`/stadium/${id}`);
  };

  const pageNum = ((reviews.reviewIds.length - 1) / pageSize) + 1;
  const pageItems = [];
  for (let i = 1; i <= pageNum; i += 1) {
    pageItems.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={handlePageItemClicked(i)}>
        {i}
      </Pagination.Item>,
    );
  }
  const start = (currentPage - 1) * pageSize;

  return (
    <>
      {reviews.reviewIds.slice(start, start + 6).map((rid) => {
        const review = reviews.reviewTable[rid];
        return (
          <div key={review.id}>
            <div style={{ display: 'flex' }}>
              <div style={{ width: 'calc(100% - 15px)' }}>
                <Row style={{ marginBottom: 8 }}>
                  <Col xs={2}>
                    <div style={{ borderRadius: 10, overflow: 'hidden', width: '90%' }}>
                      <FlexHeightImage image={`https://maps.googleapis.com/maps/api/place/photo?key=${GOOGLE_MAP_API_KEY}&photoreference=${review.stadium.cover}&maxwidth=300`} />
                    </div>
                  </Col>
                  <Col xs={4}>
                    <a onClick={handleStadiumClicked(review.stadium.id)} href={`/#/stadium/${review.stadium.id}`} style={{ fontSize: '1.2rem', fontWeight: 500 }}>
                      {review.stadium.name}
                    </a>
                    <h6 style={{ color: 'dimgray', margin: 0 }}>{review.stadium.locality}</h6>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Rating
                        initialRating={review.rating}
                        readonly
                        emptySymbol="fa fa-star-o fa-sm low"
                        fullSymbol="fa fa-star fa-sm low"
                        style={{ marginRight: 8 }}
                      />

                      <span style={{ color: 'gray', fontSize: '0.9rem' }}>
                        {moment(review.timestamp).format('L')}
                      </span>
                    </div>
                  </Col>
                  <Col>
                    <p>{review.review}</p>
                  </Col>
                </Row>
              </div>
              {match.params.userId === 'myprofile' && (
              <div style={{
                width: 15, zIndex: 1,
              }}
              >
                <ProfileReviewDropdown reviewId={review.id} />
              </div>
              )}
            </div>
            <hr />

          </div>

        );
      })}
      <Pagination style={{ justifyContent: 'center' }}>
        {pageItems}
      </Pagination>
    </>
  );
};

ProfileReview.propTypes = {
  reviews: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onGetStadium: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onGetStadium: (id) => dispatch(getStadium(id)),
});

export default compose(withRouter, connect(null, mapDispatchToProps))(ProfileReview);
