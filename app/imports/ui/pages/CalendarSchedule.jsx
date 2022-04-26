import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Container, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarItem from '../components/CalendarItem';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Opportunities } from '../../api/opportunity/OpportunitiesCollection';

/** The calendar scheduler. */
const CalendarSchedule = ({ ready /* stuffs */ }) => ((ready) ? (
  <Container id={PAGE_IDS.CALENDAR_SCHEDULE}>
    <CalendarItem/>
  </Container>
) : <Loader active>Getting data</Loader>);

// Require an array of Opportunity documents in the props.
CalendarSchedule.propTypes = {
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
  const opportunities = Opportunities.find({}, { sort: { name: 1 } }).fetch();
  return {
    opportunities,
    ready,
  };
})(CalendarSchedule);
