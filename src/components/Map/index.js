import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  GoogleMap, LoadScript, Marker, OverlayView, InfoWindow,
} from '@react-google-maps/api';
import { GOOGLE_MAP_API_KEY } from '../../secrets';

const Map = ({ locations, location, style }) => {
  const [mapRef, setMapRef] = useState(null);
  const [center, setCenter] = useState(
    locations.length > 0 ? locations[0] : location,
  );
  useEffect(() => {
    if (locations.length === 0) {
      setCenter(location);
    }
  }, [location, locations.length]);
  const fitBounds = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    if (locations.length > 0) {
      locations.forEach((loc) => {
        bounds.extend({ lat: loc.lat, lng: loc.lng });
      });
      map.fitBounds(bounds);
    }
  };
  const loadHandler = (map) => {
    setMapRef(map);
    fitBounds(map);
  };
  const handleCenterChanged = () => {
    if (mapRef) {
      const json = mapRef.getCenter().toJSON();
      if (json.lat !== center.lat || json.lng !== center.lng) {
        setCenter(json);
      }
    }
  };
  const key = locations.length > 0 ? `${locations[0].lat}${locations[0].lng}` : `${location.lat}${location.lng}`;
  return (
    <LoadScript
      id="script-loader"
      googleMapsApiKey={GOOGLE_MAP_API_KEY}
    >
      <GoogleMap
        key={key}
        onCenterChanged={handleCenterChanged}
        id="example-map"
        mapContainerStyle={{
          height: '400px',
          width: style.width || '100%',
        }}
        zoom={7}
        center={center}
        onLoad={loadHandler}
      >
        {locations.map((l) => (
          <Marker
            key={`${l.lat}${l.lng}`}
            position={{
              lat: l.lat,
              lng: l.lng,
            }}
           />
        ))}
        {locations.length === 0 && (
          <Marker
            position={{
              lat: location.lat,
              lng: location.lng,
            }}
          />
        )}

      </GoogleMap>
    </LoadScript>
  );
};

Map.defaultProps = {
  locations: [],
  location: {},
  style: {},
};

Map.propTypes = {
  locations: PropTypes.array,
  location: PropTypes.object,
  style: PropTypes.object,
};

export default Map;
