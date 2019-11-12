import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import CardColumns from 'react-bootstrap/CardColumns';
import SideBar from '../SideBar';
import ReviewCard from '../ReviewCard';
import WelcomeJumbo from '../WelcomeJumbo';

const ResponsiveCardColumns = ({ children }) => {
  const isBigScreen = useMediaQuery({ query: '(min-width: 1250px)' });
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1400px)' });
  let columnCount = 3;
  if (isLargeScreen) {
    columnCount = 5;
  } else if (isBigScreen) {
    columnCount = 4;
  }
  return (
    <CardColumns style={{ marginTop: 10, columnCount }}>
      {children}
    </CardColumns>
  );
};

ResponsiveCardColumns.propTypes = {
  children: PropTypes.any.isRequired,
};

const HomePage = () => {
  const isAuthenticated = useSelector((state) => Boolean(state.auth.token));
  const reviews = useSelector((state) => state.follow.reviews);
  const stadiumCount = useSelector((state) => state.stadium.totalCount);
  return (
    <>
      <SideBar />
      <div style={{ padding: '56px 2rem 0', marginLeft: 200 }}>
        {!isAuthenticated && <WelcomeJumbo count={stadiumCount} />}
        <ResponsiveCardColumns>
          {reviews.map((review) => (
            <ReviewCard review={review} key={review.id} />
          ))}
        </ResponsiveCardColumns>
      </div>
    </>
  );
};

export default HomePage;
