import React /* { useState } */ from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
/* import DatePicker from 'react-datepicker'; */
import 'react-datepicker/dist/react-datepicker.css';
/* import { Button } from 'semantic-ui-react'; */
import PropTypes from 'prop-types';
import { withRouter /* Link */ } from 'react-router-dom';
/* import { Meteor } from 'meteor/meteor'; */
/* import { Roles } from 'meteor/alanning:roles'; */
/* import { ROLE } from '../../api/role/Role'; */

/** Renders a single row in the Calendar Schedule page. See pages/CalendarSchedule.jsx. */
const CalendarItem = ({ opportunity }) => {
  const localizer = momentLocalizer(moment);

  const myEventsList = [
    {
      title: opportunity.title,
      start: new Date(opportunity.startDate),
      end: new Date(opportunity.endDate),
    },
  ];

  /* const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [allEvents, setAllEvents] = useState(myEventsList);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  } */
  console.log(myEventsList);
  return (
    <div>
      {/* {Roles.userIsInRole(Meteor.userId(), [ROLE.ORGANIZATION]) ? (
        <div>
          <input type="text" placeholder="Add Title"
            value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}/>
          <DatePicker showTimeSelect placeholderText="Start Date"
            selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
          <DatePicker showTimeSelect placeholderText="End Date"
            selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
          <Button style={{ marginTop: '10px', marginBottom: '10px' }} onClick={handleAddEvent}>Add Event</Button>
        </div>)
        : ''} */}
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
  opportunity: PropTypes.shape({
    title: PropTypes.string,
    opportunityType: PropTypes.string,
    startDate: PropTypes.date,
    endDate: PropTypes.date,
    recurring: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.array,
    location: PropTypes.string,
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
    ageGroup: PropTypes.array,
    environment: PropTypes.array,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(CalendarItem);
