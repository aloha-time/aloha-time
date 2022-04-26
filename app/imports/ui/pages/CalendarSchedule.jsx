import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { _ } from 'meteor/underscore';
import { Button, Container, Header } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import 'react-datepicker/dist/react-datepicker.css';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Opportunities } from '../../api/opportunity/OpportunitiesCollection';
import { ROLE } from '../../api/role/Role';

const localizer = momentLocalizer(moment);

const events = [
  {
    title: 'Health Help',
    start: new Date(2022, 3, 15),
    end: new Date(2022, 3, 28),
  },
  {
    title: 'Beach Cleanup',
    start: new Date(2022, 3, 17),
    end: new Date(2022, 3, 25),
  },
  {
    title: 'Food Drive',
    start: new Date(2022, 3, 18),
    end: new Date(2022, 3, 28),
  },
  {
    title: 'Virtual Dog Walk',
    start: new Date(2022, 3, 5),
    end: new Date(2022, 3, 10),
  },
];

/** The calendar scheduler. */
const CalendarSchedule = () => {

  const allTitles = _.pick(Opportunities.find({}, {}).fetch(), 'title');
  const allStartDates = _.pick(Opportunities.find({}, {}).fetch(), 'startDate');
  const allEndDates = _.pick(Opportunities.find({}, {}).fetch(), 'endDate');
  const allNeeded = Opportunities.find({}, { fields: { title: 1, startDate: 1, endDate: 1 } }).fetch();

  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  console.log(allTitles);
  console.log(allStartDates);
  console.log(allEndDates);
  console.log(allNeeded);
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
        {Roles.userIsInRole(Meteor.userId(), [ROLE.ORGANIZATION]) ? (
          <div>
            <input type="text" placeholder="Add Title"
              value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}/>
            <DatePicker showTimeSelect placeholderText="Start Date"
              selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
            <DatePicker showTimeSelect placeholderText="End Date"
              selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
            <Button style={{ marginTop: '10px', marginBottom: '10px' }} onClick={handleAddEvent}>Add Event</Button>
          </div>)
          : ''}
        <Calendar
          localizer={localizer}
          events={allEvents}
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
  const opportunities = Opportunities.find({}, { sort: { name: 1 } }).fetch();
  return {
    opportunities,
    ready,
  };
})(CalendarSchedule);
