import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import Carousel from 'react-bootstrap/Carousel';
import FlexHeightImage from '../FlexHeightImage';

class ImageCarousel extends React.PureComponent {
  render() {
    const { images } = this.props;
    return (
      <Carousel>
        {images.map((image) => (
          <Carousel.Item key={uuid()}>
            <FlexHeightImage image={image} height="30%" />
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }
}

ImageCarousel.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageCarousel;
