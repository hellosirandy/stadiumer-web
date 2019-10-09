import React from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { GOOGLE_MAP_API_KEY } from '../../secrets';

class Map extends React.PureComponent {
  render() {
    const { location } = this.props;
    return (
      <LoadScript
        id="script-loader"
        googleMapsApiKey={GOOGLE_MAP_API_KEY}
      >
        <GoogleMap
          id="example-map"
          mapContainerStyle={{
            height: '400px',
            width: '100%',
          }}
          zoom={7}
          center={{
            lat: location.lat,
            lng: location.lon,
          }}
        >
          <Marker
            position={{
              lat: location.lat,
              lng: location.lon,
            }}
          />
        </GoogleMap>
      </LoadScript>
    );
  }
}

Map.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Map;
