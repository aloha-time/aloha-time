import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Map, { Marker, Popup, FullscreenControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { withTracker } from 'meteor/react-meteor-data';
import { Loader } from 'semantic-ui-react';
import { Opportunities } from '../../api/opportunity/OpportunitiesCollection';
import OpportunityItem from './OpportunityItem';

const MAPBOX_TOKEN = 'pk.eyJ1IjoicmFpbmxsbyIsImEiOiJjbDJia3Znam4wOGJtM2tsNmh3MHNoMDltIn0.x_Sj4gsHvYT0faOiijV9oQ'; // Set your mapbox token here

/** Renders a single row in the Browse Opportunity table. See pages/BrowseOpportunity.jsx. */
const MapInset = ({ ready, opportunities }) => {
  const [popupInfo, setPopupInfo] = useState(null);

  return ((ready) ? (
    <Map
      initialViewState={{
        latitude: 21.48213,
        longitude: -157.945738,
        zoom: 9.1,
      }}
      style={{ width: 1130, height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      {opportunities.map((opportunity) => <Marker
        key={opportunity._id}
        longitude={opportunity.longitude}
        latitude={opportunity.latitude}
        color='red'
        onClick={e => {
          e.originalEvent.stopPropagation();
          setPopupInfo(opportunity);
        }}/>)}
      {popupInfo && (
        <Popup
          longitude={Number(popupInfo.longitude)}
          latitude={Number(popupInfo.latitude)}
          onClose={() => setPopupInfo(null)}>
          <OpportunityItem key={popupInfo._id} opportunity={popupInfo}/>
        </Popup>
      )}
      <FullscreenControl />
    </Map>
  ) : <Loader active>Getting data</Loader>);
};

// Require a document to be passed to this component.
MapInset.propTypes = {
  opportunities: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Opportunity documents.
  const subscription = Opportunities.subscribeOpportunity();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Opportunity documents and sort them by name.
  const opportunities = Opportunities.find({ verification: 'Verified' }, { sort: { name: 1 } }).fetch();
  return {
    opportunities,
    ready,
  };
})(MapInset);
