import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import styles from './styles';
import { setStadium } from '../../store/actions/stadium';

class StadiumCard extends React.PureComponent {
  handleCardClicked = () => {
    const { stadium, history, onSetStadium } = this.props;
    onSetStadium(stadium);
    history.push(`/stadium/${stadium.id}`);
  }

  render() {
    const { stadium } = this.props;
    return (
      <Card style={styles.card} onClick={this.handleCardClicked}>
        <div style={styles.cover}>
          <img src={stadium.cover} style={styles.coverImg} alt="" />
        </div>
        <Card.Body style={styles.body}>
          <Card.Title style={{ fontSize: '1rem' }}>{stadium.name}</Card.Title>
          <Card.Subtitle style={styles.subtitle}>{stadium.locality}</Card.Subtitle>
          <Card.Text style={styles.content}>
            {stadium.capacity.toLocaleString()}
            &nbsp;•&nbsp;
            {new Date(stadium.opened).getFullYear()}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

StadiumCard.propTypes = {
  stadium: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onSetStadium: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onSetStadium: (stadium) => dispatch(setStadium(stadium)),
});

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(StadiumCard);
