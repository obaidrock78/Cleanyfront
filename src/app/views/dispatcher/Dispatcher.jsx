import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useParams } from 'react-router-dom';
import axios from '../../../axios';
import { BOOKING_DISPATCH, GET_PROVIDER_WORK_LIST } from 'app/api';
import toast, { Toaster } from 'react-hot-toast';
import 'react-big-scheduler/lib/css/style.css';
import Basic from './Basic.js';
import * as _ from 'lodash';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
  '& .event-text': {
    fontSize: 'small !important',
  },
}));

function Dispatcher() {
  const params = useParams();

  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    getEventList();
  }, []);
  const getEventList = async () => {
    await axios
      .get(`${BOOKING_DISPATCH}`)
      .then((res) => {
        const mapData = res.data.data.map((item) => {
          return {
            ...item,
            id: item?.schedule?.booking,
            start: moment.utc(item?.schedule?.start_time).format('YYYY-MM-DD HH:mm:s'),
            end: moment.utc(item?.schedule?.end_time).format('YYYY-MM-DD HH:mm:s'),
            resourceId: 'r1',
            title: `${item?.bod?.bod_contact_info?.first_name} ${item?.bod?.bod_contact_info?.last_name}`,
            // rrule: 'FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR',
            resizable: false,
            bgColor: '#488FAB',
          };
        });
        setMyEvents(_.sortBy(mapData, ['start']));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              { name: 'Dispatcher', path: '/dashboard/dispatcher' },
              { name: 'Overview' },
            ]}
          />
        </Box>
        <SimpleCard>{!!myEvents.length && <Basic myEvents={myEvents} />}</SimpleCard>
      </Container>
      <Toaster position="top-right" />
    </>
  );
}

export default Dispatcher;
