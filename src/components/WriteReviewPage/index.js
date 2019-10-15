import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Rating from 'react-rating';
import { getStadium } from '../../store/actions/stadium';
import { createReview } from '../../store/actions/review';

class WriteReviewPage extends React.PureComponent {
  constructor(props) {
    super(props);
    if (!props.stadium.id) {
      props.onGetStadium(props.match.params.stadiumId);
    }
    this.state = {
      controls: {
        rating: {
          value: 0,
        },
        review: {
          value: '',
        },
      },
    };
  }

  componentDidUpdate(prevProps) {
    const { match, onGetStadium } = this.props;
    if (prevProps.match.params.stadiumId !== match.params.stadiumId) {
      onGetStadium(match.params.stadiumId);
    }
  }

  handleInputChange = (key) => ({ target: { value } }) => {
    this.setState((prevState) => ({
      ...prevState,
      controls: {
        ...prevState.controls,
        [key]: {
          value,
        },
      },
    }));
  }

  handleRatingChange = (rating) => {
    this.setState((prevState) => ({
      ...prevState,
      controls: {
        ...prevState.controls,
        rating: {
          value: rating,
        },
      },
    }));
  }

  handleFormSubmitted = async (e) => {
    e.preventDefault();
    const { controls } = this.state;
    const { stadium, onCreateReview, history } = this.props;
    await onCreateReview(controls.rating.value, controls.review.value, stadium.id);
    history.push(`/stadium/${stadium.id}`);
  }

  render() {
    const { stadium } = this.props;
    const { controls } = this.state;
    return (
      <Container style={{ padding: 0, marginTop: 56, paddingTop: 20 }}>
        <h1>{stadium.name}</h1>
        <Form onSubmit={this.handleFormSubmitted}>
          <Form.Group>
            <Form.Label>Rating</Form.Label>
            <Form.Row>
              <Rating
                initialRating={controls.rating.value}
                emptySymbol="fa fa-star-o fa-2x low"
                fullSymbol="fa fa-star fa-2x low"
                onChange={this.handleRatingChange}
              />
            </Form.Row>

          </Form.Group>
          <Form.Group>
            <Form.Label>Review</Form.Label>
            <Form.Control as="textarea" rows="10" onChange={this.handleInputChange('review')} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

WriteReviewPage.propTypes = {
  stadium: PropTypes.object.isRequired,
  onGetStadium: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  onCreateReview: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  stadium: state.stadium.stadium,
});

const mapDispatchToProps = (dispatch) => ({
  onGetStadium: (id) => dispatch(getStadium(id)),
  onCreateReview: (rating, review, stadiumId) => dispatch(createReview(rating, review, stadiumId)),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(WriteReviewPage);
