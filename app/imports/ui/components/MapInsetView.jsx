import * as React from 'react';
import PropTypes from 'prop-types';
import Map, { Marker, FullscreenControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { withTracker } from 'meteor/react-meteor-data';
import { Loader } from 'semantic-ui-react';
import { useParams } from 'react-router';
import { Opportunities } from '../../api/opportunity/OpportunitiesCollection';

const MAPBOX_TOKEN = 'pk.eyJ1IjoicmFpbmxsbyIsImEiOiJjbDJia3Znam4wOGJtM2tsNmh3MHNoMDltIn0.x_Sj4gsHvYT0faOiijV9oQ'; // Set your mapbox token here

/** Renders a single row in the Browse Opportunity table. See pages/BrowseOpportunity.jsx. */
const MapInsetView = ({ ready, opportunity }) => {

  const openDirection = () => {
    const link = `https://www.google.com/maps/place/${opportunity.location}`;
    // eslint-disable-next-line no-undef
    window.open(link);
  };

  return ((ready) ? (
    <Map
      initialViewState={{
        latitude: opportunity.latitude,
        longitude: opportunity.longitude,
        zoom: 15,
      }}
      style={{ width: 700, height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <Marker
        longitude={opportunity.longitude}
        latitude={opportunity.latitude}
        color='red'
        onClick={openDirection}/>
      <FullscreenControl/>
    </Map>
  ) : <Loader active>Getting data</Loader>);
};

// Require a document to be passed to this component.
MapInsetView.propTypes = {
  opportunity: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  const opportunityId = _id;
  // Get access to Opportunity documents.
  const subscription = Opportunities.subscribeOpportunity();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Opportunity documents and sort them by name.
  const opportunity = (ready) ? Opportunities.findDoc(opportunityId) : undefined;
  // console.log(opportunity);
  return {
    opportunity,
    ready,
  };
})(MapInsetView);
