import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import Rating from 'react-rating';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { getStadium, getStadiumDetail } from '../../store/actions/stadium';
import ImageCarousel from '../ImageCarousel';
import Map from '../Map';
import StadiumIntroSection from '../StadiumIntroSection';
import StadiumRecommendation from '../StadiumRecommendation';
import styles from './styles';
import StadiumKnownFor from '../StadiumKnownFor';
import { getReview } from '../../store/actions/review';
import StadiumReview from '../StadiumReview';
import MainContainer from '../MainContainer';
import { GOOGLE_MAP_API_KEY } from '../../secrets';

const StadiumPage = ({
  stadium, onGetStadium, onGetReviews, match, history, reviews, onGetDetail,
}) => {
  const componentRef = useRef(false);
  if (componentRef.current === false) {
    if (!stadium.id) {
      onGetStadium(match.params.stadiumId);
    } else if (!stadium.rating) {
      onGetDetail(match.params.stadiumId);
    }
    if (!reviews) {
      onGetReviews(match.params.stadiumId);
    }
    window.scrollTo(0, 0);
    componentRef.current = true;
  }

  const matchRef = useRef(match);
  useEffect(() => {
    if (matchRef.current !== match) {
      onGetReviews(match.params.stadiumId);
    }
    matchRef.current = match;
  });

  const handleRecommendationClicked = (id) => async () => {
    await onGetStadium(id);
    window.scrollTo(0, 0);
    history.push(`/stadium/${id}`);
  };

  const handleWriteReivewClicked = () => {
    history.push(`/writereview/${stadium.id}`);
  };

  const images = (stadium.photoReferences || []).map((ref) => `https://maps.googleapis.com/maps/api/place/photo?key=${GOOGLE_MAP_API_KEY}&photoreference=${ref}&maxwidth=1920`);
  return stadium.id ? (
    <div style={{ paddingTop: 56 }}>
      <ImageCarousel images={images} />
      <MainContainer style={{ marginTop: 16, padding: 0 }}>
        <Row>
          <Col xs={8}>
            <h1 style={{ fontSize: '2rem', fontWeight: 600 }}>{stadium.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Rating
                initialRating={stadium.rating ? (stadium.rating.rating / stadium.rating.count) : 0}
                readonly
                emptySymbol="fa fa-star-o fa-2x low"
                fullSymbol="fa fa-star fa-2x low"
                style={{ marginRight: 8 }}
              />
              <span style={{ color: 'gray', fontSize: '1.1rem' }}>
                {stadium.rating ? stadium.rating.count : 0}
                {' '}
reviews
              </span>
            </div>

            <ButtonToolbar style={{ marginTop: 16 }}>
              <Button variant="outline-primary" size="sm" onClick={handleWriteReivewClicked}>Write a Review</Button>
              <Button variant="outline-dark" size="sm" style={{ marginLeft: 8 }}>Share</Button>
              <Button variant="outline-dark" size="sm" style={{ marginLeft: 8 }}>Save</Button>
            </ButtonToolbar>
            <StadiumIntroSection title="Known For">
              <StadiumKnownFor stadium={stadium} />
            </StadiumIntroSection>
            <StadiumIntroSection title="Location">
              <Map location={stadium.location} />
            </StadiumIntroSection>

            <StadiumIntroSection title="Reviews">
              <>
                <Alert variant="secondary">
Here are how people think about
                  {' '}
                  {stadium.name}
                </Alert>
                {reviews && reviews.reviewIds.map((rid) => (
                  <StadiumReview review={reviews.reviewTable[rid]} key={rid} />
                ))}
              </>
            </StadiumIntroSection>
          </Col>
          <Col xs={4}>
            <div style={{ position: 'sticky', top: 72 }}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item style={{ display: 'flex' }}>
                    <Row style={{ width: '100%' }}>
                      <Col xs={1}>
                        <i className="fa fa-external-link" style={{ fontSize: '1.4rem' }} />
                      </Col>
                      <Col style={styles.ellipsis}>
                        <a href={stadium.website} target="_blank" rel="noopener noreferrer">{stadium.website}</a>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col xs={1}>
                        <i className="fa fa-phone" style={{ fontSize: '1.4rem', marginRight: 4 }} />
                      </Col>
                      <Col>
                        <span>{stadium.phone}</span>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col xs={1}>
                        <i className="fa fa-map-marker" style={{ fontSize: '1.4rem', marginRight: 4 }} />
                      </Col>
                      <Col>
                        {stadium.address}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
              <StadiumIntroSection title="You might also like">
                <>
                  {(stadium.recommendations || []).map((recStadium) => (
                    <StadiumRecommendation
                      key={recStadium.id}
                      stadium={recStadium}
                      onClick={handleRecommendationClicked(recStadium.id)}
                    />
                  ))}
                </>
              </StadiumIntroSection>
            </div>
          </Col>
        </Row>
      </MainContainer>
    </div>
  ) : (
    <div />
  );
};

StadiumPage.defaultProps = {
  reviews: null,
};

StadiumPage.propTypes = {
  stadium: PropTypes.object.isRequired,
  onGetStadium: PropTypes.func.isRequired,
  onGetReviews: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  reviews: PropTypes.any,
  onGetDetail: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  stadium: state.stadium.stadium,
  reviews: state.review.reviews[props.match.params.stadiumId],
});

const mapDispatchToProps = (dispatch) => ({
  onGetStadium: (id) => dispatch(getStadium(id)),
  onGetReviews: (id) => dispatch(getReview(id)),
  onGetDetail: (id) => dispatch(getStadiumDetail(id)),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(StadiumPage);
