import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Container, Header } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import 'react-datepicker/dist/react-datepicker.css';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Opportunities } from '../../api/opportunity/OpportunitiesCollection';

const localizer = momentLocalizer(moment);

/** The calendar scheduler. */
const CalendarSchedule = () => {

  /* find the title, startDate and endDate from each event in the OpportunitiesCollection */
  const eventFields = Opportunities.find({ verification: 'Verified' }, { fields: { title: 1, startDate: 1, endDate: 1 } }).fetch();

  /* use map to rename the fields title to title, startDate to start, endDate to end and remove _id */
  const myEventsList = eventFields.map(({ title, startDate, endDate }) => ({ title: title, start: startDate, end: endDate }));

  return (
    <Container id={PAGE_IDS.CALENDAR_SCHEDULE}>
      <div className="organization-sign-up-top">
        <Header as="h2" textAlign="center" inverted>
            Calendar
        </Header>
        <Header as="h5" textAlign="center" inverted>
            View the schedule of upcoming opportunities
        </Header>
      </div>
      <br/>
      <Button floated='right' color='blue' as={NavLink}
        exact to="/browse-opportunities">
          See all Available Opportunities
      </Button>
      <br/>
      <br/>
      <br/>
      <div>
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
        />
      </div>
    </Container>
  );
};

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
  const opportunities = Opportunities.find({ verification: 'Verified' }, { sort: { name: 1 } }).fetch();
  return {
    opportunities,
    ready,
  };
})(CalendarSchedule);
