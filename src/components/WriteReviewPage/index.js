import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Rating from 'react-rating';
import { getStadium } from '../../store/actions/stadium';
import { createReview } from '../../store/actions/review';
import MainContainer from '../MainContainer';

const WriteReviewPage = ({ match, history }) => {
  const dispatch = useDispatch();
  const stadium = useSelector((state) => state.stadium.stadium, shallowEqual);
  const [controls, setControls] = useState({
    rating: {
      value: 0,
    },
    review: {
      value: '',
    },
  });

  useEffect(() => {
    if (!stadium.id) {
      dispatch(getStadium(match.params.stadiumId));
    }
  }, [dispatch, stadium, match]);

  const handleInputChange = (key) => ({ target: { value } }) => {
    setControls({
      ...controls,
      [key]: {
        ...controls[key],
        value,
      },
    });
  };

  const handleRatingChange = (rating) => {
    setControls({
      ...controls,
      rating: {
        ...controls.rating,
        value: rating,
      },
    });
  };

  const handleFormSubmitted = async (e) => {
    e.preventDefault();
    await dispatch(createReview(controls.rating.value, controls.review.value, stadium.id));
    history.push(`/stadium/${stadium.id}`);
  };

  return (
    <MainContainer style={{ padding: 0, marginTop: 56, paddingTop: 20 }}>
      <>
        <h1>{stadium.name}</h1>
        <Form onSubmit={handleFormSubmitted}>
          <Form.Group>
            <Form.Label>Rating</Form.Label>
            <Form.Row>
              <Rating
                initialRating={controls.rating.value}
                emptySymbol="fa fa-star-o fa-2x low"
                fullSymbol="fa fa-star fa-2x low"
                onChange={handleRatingChange}
              />
            </Form.Row>

          </Form.Group>
          <Form.Group>
            <Form.Label>Review</Form.Label>
            <Form.Control as="textarea" rows="10" onChange={handleInputChange('review')} />
          </Form.Group>
          <Button variant="primary" type="submit">
          Submit
          </Button>
        </Form>
      </>
    </MainContainer>
  );
};

WriteReviewPage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(WriteReviewPage);
