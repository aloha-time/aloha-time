import * as React from 'react';
import PropTypes from 'prop-types';
import Map, { Marker } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoicmFpbmxsbyIsImEiOiJjbDJia3Znam4wOGJtM2tsNmh3MHNoMDltIn0.x_Sj4gsHvYT0faOiijV9oQ'; // Set your mapbox token here

/** Renders a single row in the Browse Opportunity table. See pages/BrowseOpportunity.jsx. */
const MapInset = () => (
  <Map
    initialViewState={{
      latitude: 21.29828,
      longitude: -157.818694,
      zoom: 10.5,
    }}
    style={{ width: 700, height: 400 }}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    mapboxAccessToken={MAPBOX_TOKEN}
  >
    <Marker longitude={-157.800385} latitude={21.267996} color="red" />
    <Marker longitude={-157.894543} latitude={21.335468} color="orange" />
    <Marker longitude={-157.674078} latitude={21.285214} color="blue" />
    <Marker longitude={-157.817841} latitude={21.290279} color="green" />
  </Map>
);

// Require a document to be passed to this component.
MapInset.propTypes = {
  opportunity: PropTypes.shape({
    title: PropTypes.string,
    opportunityType: PropTypes.string,
    startDate: PropTypes.date,
    endDate: PropTypes.date,
    recurring: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    location: PropTypes.string,
    longitude: PropTypes.number,
    latitude: PropTypes.number,
    contactName: PropTypes.string,
    contactPosition: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    website: PropTypes.string,
    coverImage: PropTypes.string,
    galleryImg1: PropTypes.string,
    galleryImg2: PropTypes.string,
    galleryImg3: PropTypes.string,
    galleryImg4: PropTypes.string,
    ageGroup: PropTypes.string,
    environment: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }),
};

export default MapInset;
