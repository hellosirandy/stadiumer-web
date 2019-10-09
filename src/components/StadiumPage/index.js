import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { getStadium } from '../../store/actions/stadium';
import ImageCarousel from '../ImageCarousel';
import Map from '../Map';
import StadiumIntroSection from '../StadiumIntroSection';
import StadiumRecommendation from '../StadiumRecommendation';

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
      <>
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
              <StadiumIntroSection title="Location">
                <Map location={stadium.location} />
              </StadiumIntroSection>

            </Col>
            <Col xs={4}>
              <StadiumIntroSection title="You might also like">
                <>
                  {(stadium.recommendations || []).map((recStadium) => (
                    <StadiumRecommendation key={recStadium.id} stadium={recStadium} onClick={this.handleRecommendationClicked(recStadium.id)} />
                  ))}
                </>
              </StadiumIntroSection>
            </Col>
          </Row>
        </Container>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(StadiumPage);
