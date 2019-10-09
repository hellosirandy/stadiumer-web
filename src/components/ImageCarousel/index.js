import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import Carousel from 'react-bootstrap/Carousel';
import styles from './styles';

class ImageCarousel extends React.PureComponent {
  render() {
    const { images } = this.props;
    return (
      <Carousel>
        {images.map((image) => (
          <Carousel.Item key={uuid()}>
            <div style={{
              backgroundImage: `url('${image}')`,
              ...styles.carousel,
            }}
            />
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
