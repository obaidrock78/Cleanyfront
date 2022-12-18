import React, { Component } from 'react';
import moment from 'moment';
import Scheduler, { SchedulerData, ViewTypes, DATE_FORMAT, DemoData } from 'react-big-scheduler';
import withDragDropContext from './withDnDContext';
import 'react-big-scheduler/lib/css/style.css';
import { Box } from '@mui/material';
import { CREATE_BOOKING_DISPATCH, DELETE_BOOKING_DISPATCH } from 'app/api';
import axios from '../../../axios';
import toast, { Toaster } from 'react-hot-toast';
import * as _ from 'lodash';

let schedulerData = new SchedulerData(
  moment(new Date()).format('YYYY-MM-DD'),
  ViewTypes.Day,
  false,
  false,
  {
    schedulerWidth: '72%',
    resourceName: 'Resources',
    eventItemHeight: 49,
    eventItemLineHeight: 52,
    nonAgendaSlotMinHeight: 30,
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
    ],
  }
);

class Basic extends Component {
  constructor(props) {
    super(props);

    schedulerData.setResources(props.serviceProviderList);

    schedulerData.setEvents(
      _.sortBy(_.concat(props.myEvents, props.myEventsTwo, props.leaveTimeList), ['start'])
    );
    this.state = {
      viewModel: schedulerData,
    };
  }

  render() {
    const { viewModel } = this.state;
    return (
      <Box
        sx={{
          '& .slot-text': {
            // whiteSpace: 'pre-wrap !important',
          },
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
          conflictOccurred={this.conflictOccurred}
          toggleExpandFunc={this.toggleExpandFunc}
        />
        <Toaster position="top-right" />
      </Box>
    );
  }

  prevClick = (schedulerData) => {
    schedulerData.prev();
    schedulerData.setEvents(
      _.sortBy(_.concat(this.props.myEvents, this.props.myEventsTwo, this.props.leaveTimeList), [
        'start',
      ])
    );
    this.setState({
      viewModel: schedulerData,
    });
  };

  nextClick = (schedulerData) => {
    schedulerData.next();
    schedulerData.setEvents(
      _.sortBy(_.concat(this.props.myEvents, this.props.myEventsTwo, this.props.leaveTimeList), [
        'start',
      ])
    );
    this.setState({
      viewModel: schedulerData,
    });
  };

  onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
    schedulerData.setEvents(
      _.sortBy(_.concat(this.props.myEvents, this.props.myEventsTwo, this.props.leaveTimeList), [
        'start',
      ])
    );
    this.setState({
      viewModel: schedulerData,
    });
  };

  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(
      _.sortBy(_.concat(this.props.myEvents, this.props.myEventsTwo, this.props.leaveTimeList), [
        'start',
      ])
    );
    this.setState({
      viewModel: schedulerData,
    });
  };

  eventClicked = (schedulerData, event) => {
    if (typeof event.id === 'number') {
      const filteredData = this.props.myEvents.find((item) => item.id === event.id);
      this.props.setSelectedBooking(event);
      this.props.setDrawerState(true);
    }
  };

  moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    if (event?.resourceId !== slotId) {
      const filteredData = this.props.compareEvents.find((item) => item.id === event.id);
      if (
        schedulerData.resources
          .filter((item) => item.is_active === true)
          .some((item) => item.id === slotId)
      ) {
        if (filteredData.dispatch_id === null) {
          this.handleAssignBooking(event, slotId, schedulerData, slotName);
        } else {
          const values = {
            status: 'Dispatched',
            shift_started: true,
            shift_ended: true,
            shift_status: 'pending',
            service_provider: slotId,
            booking: event?.id,
          };
          toast.promise(axios.post(`${CREATE_BOOKING_DISPATCH}`, values), {
            loading: () => {
              return `In process!`;
            },
            success: (res) => {
              this.props.getEventList();

              return res?.data?.message;
            },
            error: (err) => {
              return err?.message;
            },
          });
        }
      } else if (slotId === 'r1') {
        this.handleDeleteBooking(event, slotId, schedulerData, slotName);
      } else {
        alert(`Selected Booking cannot be assigned to inactive workers!`);
      }
    }
  };
  handleDeleteBooking(event, slotId, schedulerData, slotName) {
    const filteredData = this.props.myEventsTwo.find((item) => item.id === event.id);
    toast.promise(axios.delete(`${DELETE_BOOKING_DISPATCH}/${filteredData?.dispatch_id}`), {
      loading: () => {
        return `Unassigning Booking!`;
      },
      success: (res) => {
        schedulerData.moveEvent(event, slotId, slotName, event.start, event.end);
        this.setStateIn(schedulerData);
        this.props.getEventList();
        return res?.data?.message;
      },
      error: (err) => {
        return err?.message;
      },
    });
  }
  handleAssignBooking(event, slotId, schedulerData, slotName) {
    const values = {
      status: 'Dispatched',
      shift_started: true,
      shift_ended: true,
      shift_status: 'pending',
      service_provider: slotId,
      booking: event?.id,
    };
    toast.promise(axios.post(`${CREATE_BOOKING_DISPATCH}`, values), {
      loading: () => {
        return `Assigning Booking!`;
      },
      success: (res) => {
        this.props.getEventList();
        schedulerData.moveEvent(event, slotId, slotName, event.start, event.end);

        this.setStateIn(schedulerData);

        return res?.data?.message;
      },
      error: (err) => {
        return err?.message;
      },
    });
  }
  setStateIn(schedulerData) {
    this.setState({
      viewModel: schedulerData,
    });
  }
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
      paddingRight: '0px',
    };
    if (!!agendaMaxEventWidth) divStyle = { ...divStyle, maxWidth: agendaMaxEventWidth };
    let start = moment.utc(event.schedule?.start_time).format('HH:mm');
    let end = moment.utc(event.schedule?.end_time).format('HH:mm');
    return (
      <div key={event.id} className={mustAddCssClass} style={divStyle}>
        <p style={{ margin: 'unset', marginLeft: '4px' }} className="event-text">
          {titleText}
          {event.type === 1 && `, ${start} - ${end}`}
        </p>
        {event.type === 3 && (
          <p
            style={{
              fonstSize: '5px',
              margin: 'unset',
              marginLeft: '4px',
            }}
            className="event-text"
          >
            {start} - {end}
          </p>
        )}
        {event.type === 1 && (
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
        )}
        {event.type === 1 && (
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
        )}
      </div>
    );
  };
  conflictOccurred = (schedulerData, action, event, type, slotId, slotName, start, end) => {
    alert(`Conflict occurred. {action: ${action}, event: ${event}`);
  };
  toggleExpandFunc = (schedulerData, slotId) => {
    schedulerData.toggleExpandStatus(slotId);
    this.setState({
      viewModel: schedulerData,
    });
  };
}

export default withDragDropContext(Basic);
