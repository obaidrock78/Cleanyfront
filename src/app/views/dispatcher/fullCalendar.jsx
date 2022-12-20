import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'; // a plugin!
import axios from '../../../axios';
import { FULL_CALENDAR_EVENTS, FULL_CALENDAR_RESOURCES } from 'app/api';

function DemoApp() {
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
        debugger;
      })
      .catch((err) => console.log(err));
  };
  const getResources = async () => {
    await axios
      .get(`${FULL_CALENDAR_RESOURCES}`)
      .then((res) => {
        debugger;
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
    debugger;
    // return (
    //   <>
    //     <b>{eventInfo.timeText}</b>
    //     <i>{eventInfo.event.title}</i>
    //   </>
    // );
    // return <span>Hello</span>;
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
      //   $(info.el).find('.fc-event-title').append(event_desc);
      return event_desc;
    }
  };
  return (
    <FullCalendar
      schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
      plugins={[resourceTimelinePlugin]}
      headerToolbar={{
        right: 'today prev,next',
        center: 'title',
        left: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth',
      }}
      resourceAreaWidth="20%"
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
      resources={[
        { id: '0', building: 'None', title: 'Unassigned', eventColor: 'orange', sort: 0 },
        {
          id: 1,
          building: 'Active',
          title: 'obaidsa Rehman',
          ph: '+923034142927',
          sort: 1,
          html: '<i class="material-icons">edit</i>',
        },
      ]}
      events={[
        {
          resourceId: 1,
          dispatch_id: 1,
          booking_id: 72,
          title: 'fcgvhjb fgvhbjk, 22:32 - 23:32',
          description: 'vgh, jkjk',
          recur: true,
          draggable: true,
          start: '2022-12-19T22:32:55+00:00',
          end: '2022-12-19T23:32:58+00:00',
        },
      ]}
      resourceLabelContent={(args) => resourceContent(args)}
      eventContent={(info) => eventRender(info)}
    />
  );
}

export default DemoApp;
