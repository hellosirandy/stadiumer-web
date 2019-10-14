import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import Rating from 'react-rating';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { getStadium } from '../../store/actions/stadium';
import ImageCarousel from '../ImageCarousel';
import Map from '../Map';
import StadiumIntroSection from '../StadiumIntroSection';
import StadiumRecommendation from '../StadiumRecommendation';
import styles from './styles';
import StadiumKnownFor from '../StadiumKnownFor';

class StadiumPage extends React.PureComponent {
  constructor(props) {
    super(props);
    if (!props.stadium.id) {
      props.onGetStadium(props.match.params.stadiumId);
    }
  }

  componentDidUpdate(prevProps) {
    const { match, onGetStadium } = this.props;
    if (prevProps.match.params.stadiumId !== match.params.stadiumId) {
      onGetStadium(match.params.stadiumId);
    }
  }

  handleRecommendationClicked = (id) => () => {
    const { history } = this.props;
    history.push(`/stadium/${id}`);
  }

  render() {
    const { stadium } = this.props;
    return stadium.id ? (
      <div style={{ paddingTop: 56 }}>
        <ImageCarousel images={[stadium.cover]} />
        <Container style={{ marginTop: 16, padding: 0 }}>
          <Row>
            <Col xs={8}>
              <h1 style={{ fontSize: '2rem', fontWeight: 600 }}>{stadium.name}</h1>
              <Rating
                initialRating={0}
                readonly
                emptySymbol="fa fa-star-o fa-2x low"
                fullSymbol="fa fa-star fa-2x low"
              />
              <ButtonToolbar style={{ marginTop: 16 }}>
                <Button variant="outline-primary" size="sm">Write a Review</Button>
                <Button variant="outline-dark" size="sm" style={{ marginLeft: 8 }}>Share</Button>
                <Button variant="outline-dark" size="sm" style={{ marginLeft: 8 }}>Save</Button>
              </ButtonToolbar>
              <StadiumIntroSection title="Known For">
                <StadiumKnownFor stadium={stadium} />
              </StadiumIntroSection>
              <StadiumIntroSection title="Location">
                <Map location={stadium.location} />
              </StadiumIntroSection>

            </Col>
            <Col xs={4}>
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
                      onClick={this.handleRecommendationClicked(recStadium.id)}
                    />
                  ))}
                </>
              </StadiumIntroSection>
            </Col>
          </Row>
        </Container>
      </div>
    ) : (
      <div />
    );
  }
}

StadiumPage.propTypes = {
  stadium: PropTypes.object.isRequired,
  onGetStadium: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  stadium: state.stadium.stadium,
});

const mapDispatchToProps = (dispatch) => ({
  onGetStadium: (id) => dispatch(getStadium(id)),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(StadiumPage);
