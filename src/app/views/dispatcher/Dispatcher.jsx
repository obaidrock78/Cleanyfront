import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, CircularProgress, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useParams } from 'react-router-dom';
import axios from '../../../axios';
import { BOOKING_DISPATCH, GET_PROVIDER_WORK_LIST, GET_SERVICE_PROVIDER_LIST } from 'app/api';
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
  const [serviceProviderList, setServiceProviderList] = useState([]);

  useEffect(() => {
    serviceListAPI();
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
            start: moment.utc(item?.schedule?.start_time).format('YYYY-MM-DD HH:mm:ss'),
            end: moment.utc(item?.schedule?.end_time).format('YYYY-MM-DD HH:mm:ss'),
            resourceId: item?.service_provider === null ? 'r1' : item?.service_provider,
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
  const serviceListAPI = async () => {
    await axios
      .get(`${GET_SERVICE_PROVIDER_LIST}`, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        let arr = [
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
            name: 'Inactive',
            groupOnly: true,
          },
        ];
        res?.data?.data?.map((item) => {
          if (item?.is_active === true) {
            arr.push({
              ...item,
              id: item?.id,
              name:
                `${item?.user_profile?.first_name} ${item?.user_profile?.last_name}` +
                '\n' +
                `${item?.user_profile?.phone_number}`,
              parentId: 'r2',
            });
          } else {
            arr.push({
              ...item,
              id: item?.id,
              name:
                `${item?.user_profile?.first_name} ${item?.user_profile?.last_name}` +
                '\n' +
                `${item?.user_profile?.phone_number}`,
              parentId: 'r3',
            });
          }
        });
        setServiceProviderList(arr);
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
        <SimpleCard>
          {myEvents.length > 0 && serviceProviderList.length > 0 ? (
            <Basic
              myEvents={myEvents}
              serviceProviderList={serviceProviderList}
              getEventList={getEventList}
            />
          ) : (
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                height: '50vh',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </SimpleCard>
      </Container>
      <Toaster position="top-right" />
    </>
  );
}

export default Dispatcher;
