import * as React from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PropTypes from 'prop-types';
import { Icon, Image, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { useState } from 'react';
import { Opportunities } from '../../api/opportunities/OpportunitiesCollection';
import { decode } from '../utilities/ImageDecode';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoib3NoaXJvYzMiLCJhIjoiY2wxb3NtaW9uMG11ZTNlbzRycG5wMzV0ayJ9.iN_NLgc29HxqgG6J6Vj_9w'; // Set your mapbox token here
const TheMap = ({ opps, ready }) => {
  const [popup, setPopup] = useState('');
  const closePopup = () => {
    setPopup('');
  };
  const openPopup = (one) => {
    setPopup(one);
  };
  return (ready) ? (
    <Map
      initialViewState={{
        latitude: 21.5864533,
        longitude: -158.1056343,
        zoom: 14,
      }}
      style={{ width: 280, height: 500 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      {
        opps.map((marker, index) => ((marker.coordinates) ? (
          <Marker
            key={marker._id}
            longitude={marker.coordinates.log}
            latitude={marker.coordinates.lat}
            index={index}
            marker={marker}
            onClick={() => openPopup(marker)}
            color='red'
          />
        ) : ''))
      }
      {
        (popup) ? (
          <Popup
            latitude={popup.coordinates.lat}
            longitude={popup.coordinates.log}
            onClose={closePopup}
            closeButton={true}
            closeOnClick={false}
            offsetTop={-30}
          >
            <p>
              {popup.event}
              <Image style={{ paddingTop: '5px', paddingBottom: '5px' }} centered size='mini' src={decode(popup.img)} />
              <Icon name='map marker alternate'/>
              {popup.address}</p>
          </Popup>
        ) : ''
      }
    </Map>
  ) : <Loader active>Getting opp</Loader>;
};

TheMap.propTypes = {
  opps: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};
export default withTracker(() => {
  const subscription = Opportunities.subscribeOpportunity();
  const ready = subscription.ready();
  const opps = Opportunities.find({}).fetch();
  return {
    opps,
    ready,
  };
})(TheMap);
