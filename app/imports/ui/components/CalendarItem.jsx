import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter /* Link */ } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { ROLE } from '../../api/role/Role';

const localizer = momentLocalizer(moment);

const myEventsList = [
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

/** Renders a single row in the Calendar Schedule page. See pages/CalendarSchedule.jsx. */
const CalendarItem = (/* { stuff } */) => {

  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [allEvents, setAllEvents] = useState(myEventsList);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  return (
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
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
      />
    </div>
  );
};

// Require a document to be passed to this component.
CalendarItem.propTypes = {
  stuff: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    condition: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(CalendarItem);
