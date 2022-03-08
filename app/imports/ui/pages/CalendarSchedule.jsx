import React from 'react';
// import { render } from 'react-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Container, Header } from 'semantic-ui-react';
import { PAGE_IDS } from '../utilities/PageIDs';
// import { Container, Header, Segment } from 'semantic-ui-react';
// import { PAGE_IDS } from '../utilities/PageIDs';

const localizer = momentLocalizer(moment);

/** The calendar scheduler. */
const CalendarSchedule = () => (
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
    <div>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
      />
    </div>
  </Container>
);

export default CalendarSchedule;
