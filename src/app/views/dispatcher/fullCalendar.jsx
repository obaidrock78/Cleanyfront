import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'; // a plugin!
import axios from '../../../axios';
import {
  ASSIGN_BOOKING_OLD_DISPATCH,
  DELETE_BOOKING_OLD_DISPATCH,
  FULL_CALENDAR_EVENTS,
  FULL_CALENDAR_RESOURCES,
  UPDATE_BOOKING_OLD_DISPATCH,
} from 'app/api';
import $ from 'jquery';
import interactionPlugin from '@fullcalendar/interaction';
import { toast, Toaster } from 'react-hot-toast';
import { Box } from '@mui/material';

function DemoApp({ setDrawerState, setSelectedBooking }) {
  const [resources, setResources] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents();
    getResources();
  }, []);
  const getEvents = async () => {
    await axios
      .get(`${FULL_CALENDAR_EVENTS}`)
      .then((res) => {
        setEvents(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };
  const getResources = async () => {
    await axios
      .get(`${FULL_CALENDAR_RESOURCES}`)
      .then((res) => {
        setResources(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };
  const resourceContent = (arg) => {
    return (
      <span>
        {arg.resource.title !== 'Unassigned' && (
          <img
            style={{ marginBottom: '-5px', width: '24px', height: '24px' }}
            src="https://cdn.podiumio.com/platform/entities/entity-employee-blue-100.png"
          />
        )}

        <span style={{ fontWeight: 'bold', fontSize: '1rem', paddingLeft: '5px', margin: 'unset' }}>
          {arg.resource.title}
        </span>
      </span>
    );
  };
  const eventRender = (info) => {
    if (
      info.event.extendedProps.description != '' &&
      typeof info.event.extendedProps.description !== 'undefined'
    ) {
      if (info.event.extendedProps.booking_id) {
        var event_desc =
          '<br/>' +
          info.event.extendedProps.description +
          '</br>' +
          'B-' +
          info.event.extendedProps.booking_id;
        if (info.event.extendedProps.recur) {
          event_desc =
            '<br/>' +
            info.event.extendedProps.description +
            "</br><i class='ti ti-repeat'></i> " +
            'B-' +
            info.event.extendedProps.booking_id;
        }
      } else {
        event_desc = '<br/>' + info.event.extendedProps.description;
      }
      $(info.el).find('.fc-event-title').append(event_desc);
    }
  };
  const eventDrop = (info) => {
    if (!info.event.extendedProps.draggable) {
      info.revert();
      return;
    }
    if (info.oldResource === null && info.newResource === null) {
      info.revert();
      return;
    }

    if (info.oldEvent.start.toISOString() !== info.event.start.toISOString()) {
      info.revert();
    } else {
      if (info?.oldResource?.id === '0') {
        if (info.oldEvent.start.toISOString() !== info.event.start.toISOString()) {
          info.revert();
        }
        toast.promise(
          axios.post(`${ASSIGN_BOOKING_OLD_DISPATCH}`, {
            schedule_id: info.event.extendedProps.schedule_id,
            cleaner_id: info.newResource.id,
          }),
          {
            loading: () => {
              return `Assigning Booking!`;
            },
            success: (res) => {
              getEvents();
              return res?.data?.message;
            },
            error: (err) => {
              info.revert();
              return err?.message;
            },
          }
        );
      } else if (info?.newResource?.id === '0') {
        toast.promise(
          axios.delete(
            `${DELETE_BOOKING_OLD_DISPATCH}?dispatch_id=${info.event.extendedProps.dispatch_id}`
          ),
          {
            loading: () => {
              return `Unassigning Booking!`;
            },
            success: (res) => {
              getEvents();
              return res?.data?.message;
            },
            error: (err) => {
              info.revert();
              return err?.message;
            },
          }
        );
      } else {
        toast.promise(
          axios.put(`${UPDATE_BOOKING_OLD_DISPATCH}`, {
            schedule_id: info.event.extendedProps.schedule_id,
            dispatch_id: info.event.extendedProps.dispatch_id,
            cleaner_id: info?.newResource?.id,
          }),
          {
            loading: () => {
              return `Assigning Booking to Other Cleaners!`;
            },
            success: (res) => {
              getEvents();
              return res?.data?.message;
            },
            error: (err) => {
              info.revert();
              return err?.message;
            },
          }
        );
      }
    }
  };
  const eventClick = (info) => {
    if (!info.event.extendedProps.draggable) {
      return;
    }
    setDrawerState(true);
    setSelectedBooking({
      ...info.event.extendedProps,
      start: info.event.start,
      end: info.event.end,
    });
  };
  return (
    <Box
      sx={{
        '& .fc-datagrid-cell-cushion': {
          overflow: 'auto !important',
          width: 'fit-content !important',
        },
      }}
    >
      <FullCalendar
        schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
        plugins={[resourceTimelinePlugin, interactionPlugin]}
        headerToolbar={{
          right: 'today prev,next',
          center: 'title',
          left: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth',
        }}
        // resourceAreaWidth="20%"
        contentHeight="auto"
        aspectRatio={1.5}
        initialView="resourceTimelineDay"
        scrollTime="06=00"
        resourceGroupField="building"
        timeZone="utc"
        slotDuration="00:30:00"
        snapDuration="00:30:00"
        editable={false}
        eventResourceEditable={true}
        eventDurationEditable={false}
        dayMaxEvents={true}
        resources={resources}
        events={events}
        resourceLabelContent={(args) => resourceContent(args)}
        eventDidMount={(info) => eventRender(info)}
        eventDrop={(info) => eventDrop(info)}
        eventClick={(info) => eventClick(info)}
      />
      <Toaster position="top-right" />
    </Box>
  );
}

export default DemoApp;
