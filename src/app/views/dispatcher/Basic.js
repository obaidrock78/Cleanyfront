import React, { Component } from 'react';
//import moment from 'moment'
//import 'moment/locale/zh-cn';
import moment from 'moment';
import Scheduler, { SchedulerData, ViewTypes, DATE_FORMAT, DemoData } from 'react-big-scheduler';
import withDragDropContext from './withDnDContext';
import 'react-big-scheduler/lib/css/style.css';
import { Box } from '@mui/material';

let schedulerData = new SchedulerData(
  moment(new Date()).format('YYYY-MM-DD'),
  ViewTypes.Week,
  false,
  false,
  {
    schedulerWidth: '72%',

    schedulerMaxHeight: 550,
    eventItemHeight: 58,
    eventItemLineHeight: 63,
    displayWeekend: true,
    eventItemPopoverEnabled: false,
    views: [
      {
        viewName: 'Day',
        viewType: ViewTypes.Day,
        showAgenda: false,
        isEventPerspective: false,
      },
      {
        viewName: 'Week',
        viewType: ViewTypes.Week,
        showAgenda: false,
        isEventPerspective: false,
      },
      {
        viewName: 'Month',
        viewType: ViewTypes.Month,
        showAgenda: false,
        isEventPerspective: false,
      },
    ], // minuteStep: 15
  }
);

class Basic extends Component {
  constructor(props) {
    super(props);
    let resources = [
      {
        id: 'r0',
        name: 'None',
        groupOnly: true,
      },
      {
        id: 'r1',
        name: 'Unassigned',
        parentId: 'r0',
      },
      {
        id: 'r2',
        name: 'Active',
        groupOnly: true,
      },
      {
        id: 'r3',
        // name: 'Staff_Val sdfddf\n+923344666108',
        name: 'ASD',
        parentId: 'r2',
      },
      {
        id: 'r4',
        name: 'Inactive',
        groupOnly: true,
      },
      {
        id: 'r5',
        // name: 'Staff_Val sdfddf\n+923344666108',
        name: 'Abdul',
        parentId: 'r4',
      },
      {
        id: 'r6',
        name: 'Staff_Val sdfddf asdas dasd asd ',
        parentId: 'r4',
      },
    ];

    // schedulerData.localeMoment.locale('en');

    schedulerData.setResources(resources);
    //schedulerData.setEvents(DemoData.events);
    let events = [
      // {
      //   id: 1,
      //   start: '2017-12-18 09:30:00',
      //   end: '2017-12-19 23:30:00',
      //   resourceId: 'r1',
      //   title: 'A1',
      //   bgColor: '#488FAB',
      //   resizable: false,
      // },
      // {
      //   id: 2,
      //   start: '2017-12-18 12:30:00',
      //   end: '2017-12-26 23:30:00',
      //   resourceId: 'r1',
      //   title: 'A2',
      //   resizable: false,
      //   bgColor: '#488FAB',
      // },
      // {
      //   id: 3,
      //   start: '2017-12-19 12:30:00',
      //   end: '2017-12-20 23:30:00',
      //   resourceId: 'r3',
      //   title: 'Fixed',
      //   bgColor: '#488FAB',
      //   resizable: false,
      // },
      // {
      //   id: 4,
      //   start: '2017-12-19 14:30:00',
      //   end: '2017-12-20 23:30:00',
      //   resourceId: 'r1',
      //   title: 'Training',
      //   resizable: false,
      //   bgColor: '#488FAB',
      // },
      // {
      //   id: 5,
      //   start: '2017-12-19 15:30:00',
      //   end: '2017-12-20 23:30:00',
      //   resourceId: 'r1',
      //   title: 'R2',
      //   rrule: 'FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR',
      //   resizable: false,
      //   bgColor: '#488FAB',
      // },
    ];
    //
    schedulerData.setEvents(props.myEvents);
    this.state = {
      viewModel: schedulerData,
    };
  }

  render() {
    const { viewModel } = this.state;
    console.log(viewModel);
    return (
      <Box
        sx={{
          '& .slot-text': {
            // whiteSpace: 'pre-wrap !important',
          },
          // '& .scheduler': {
          //   width: '100% !important',
          // },
        }}
        style={{ width: '100%', overflowX: 'auto' }}
      >
        <Scheduler
          schedulerData={viewModel}
          prevClick={this.prevClick}
          nextClick={this.nextClick}
          onSelectDate={this.onSelectDate}
          onViewChange={this.onViewChange}
          eventItemClick={this.eventClicked}
          moveEvent={this.moveEvent}
          eventItemTemplateResolver={this.eventItemTemplateResolver}
          toggleExpandFunc={this.toggleExpandFunc}
        />
      </Box>
    );
  }

  prevClick = (schedulerData) => {
    schedulerData.prev();
    schedulerData.setEvents(this.props.myEvents);
    this.setState({
      viewModel: schedulerData,
    });
  };

  nextClick = (schedulerData) => {
    schedulerData.next();
    schedulerData.setEvents(this.props.myEvents);
    this.setState({
      viewModel: schedulerData,
    });
  };

  onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
    schedulerData.setEvents(this.props.myEvents);
    this.setState({
      viewModel: schedulerData,
    });
  };

  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(this.props.myEvents);
    this.setState({
      viewModel: schedulerData,
    });
  };

  eventClicked = (schedulerData, event) => {
    alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
  };

  moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    if (
      window.confirm(
        `Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`
      )
    ) {
      schedulerData.moveEvent(event, slotId, slotName, start, end);
      this.setState({
        viewModel: schedulerData,
      });
    }
  };
  eventItemTemplateResolver = (
    schedulerData,
    event,
    bgColor,
    isStart,
    isEnd,
    mustAddCssClass,
    mustBeHeight,
    agendaMaxEventWidth
  ) => {
    let borderWidth = isStart ? '4' : '0';
    let borderColor = 'rgba(0,139,236,1)',
      backgroundColor = '#80C5F6';
    let titleText = schedulerData.behaviors.getEventTextFunc(schedulerData, event);
    if (!!event.type) {
      borderColor =
        event.type == 1 ? 'rgba(0,139,236,1)' : event.type == 3 ? 'rgba(245,60,43,1)' : '#999';
      backgroundColor = event.type == 1 ? '#80C5F6' : event.type == 3 ? '#FA9E95' : '#D9D9D9';
    }
    let divStyle = {
      borderLeft: borderWidth + 'px solid ' + borderColor,
      backgroundColor: backgroundColor,
      height: mustBeHeight,
      fontSize: '2px !important',
    };
    if (!!agendaMaxEventWidth) divStyle = { ...divStyle, maxWidth: agendaMaxEventWidth };
    let start = moment.utc(event.schedule?.start_time).format('HH:mm');
    let end = moment.utc(event.schedule?.end_time).format('HH:mm');
    return (
      <div key={event.id} className={mustAddCssClass} style={divStyle}>
        <p style={{ margin: 'unset', marginLeft: '4px' }} className="event-text">
          {titleText}, {start} - {end}
        </p>
        <p
          style={{
            fonstSize: '5px',
            margin: 'unset',
            marginLeft: '4px',
          }}
          className="event-text"
        >
          {event.bod.bod_service_location.street_address}
        </p>
        <p
          style={{
            fonstSize: '5px',
            margin: 'unset',
            marginLeft: '4px',
          }}
          className="event-text"
        >
          &#8635; B-{event.id}
        </p>
      </div>
    );
  };
  toggleExpandFunc = (schedulerData, slotId) => {
    schedulerData.toggleExpandStatus(slotId);
    this.setState({
      viewModel: schedulerData,
    });
  };
}

export default withDragDropContext(Basic);
