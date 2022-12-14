import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, Button, CircularProgress, Divider, styled, Typography } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../../axios';
import {
  BOOKING_DISPATCH,
  BOOKING_DISPATCH_TWO,
  GET_PROVIDER_WORK_LIST,
  GET_SERVICE_PROVIDER_LIST,
} from 'app/api';
import toast, { Toaster } from 'react-hot-toast';
import 'react-big-scheduler/lib/css/style.css';
import Basic from './Basic.js';
import * as _ from 'lodash';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
  '& .event-text': {
    fontSize: '11px !important',
  },
  '& .header2-text-label': {
    fontSize: '1.3rem !important',
    fontWeight: 'bold !important',
  },
  '& .icon-nav': {
    '& svg': {
      width: '20px !important',
      height: '20px !important',
    },
  },
  '& .header3-text': {
    fontSize: '0.9rem !important',
    fontWeight: 'bold !important',
  },
  '& .slot-text': {
    fontWeight: 'bold !important',
  },
  '& .event-item': {
    paddingRight: '0px important',
  },
}));
const DrawerMain = styled('div')(({ theme }) => ({
  height: 'calc(100vh - 63px)',
}));
function Dispatcher() {
  const params = useParams();
  const navigate = useNavigate();
  const [myEvents, setMyEvents] = useState([]);
  const [serviceProviderList, setServiceProviderList] = useState([]);
  const [leaveTime, setLeaveTime] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [drawerState, setDrawerState] = useState(false);
  const [myEventsTwo, setMyEventsTwo] = useState([]);
  const [compareEvents, setCompareEvents] = useState([]);
  const [loaderShow, setLoaderShow] = useState([false, false]);

  useEffect(() => {
    serviceListAPI();
    getEventList();
  }, []);
  const getEventList = async () => {
    setLoaderShow([true, true]);
    await axios
      .get(`${BOOKING_DISPATCH_TWO}`)
      .then((res) => {
        const mapData = res.data.data.map((item) => {
          return {
            ...item,
            id: item?.booking?.id,
            start: moment.utc(item?.booking?.schedule?.start_time).format('YYYY-MM-DD HH:mm:ss'),
            end: moment.utc(item?.booking?.schedule?.end_time).format('YYYY-MM-DD HH:mm:ss'),
            resourceId: item?.service_provider === null ? 'r1' : item?.service_provider,
            title: `${item?.booking?.bod?.bod_contact_info?.first_name} ${item?.booking?.bod?.bod_contact_info?.last_name}`,
            // rrule: 'FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR',
            resizable: false,
            bgColor: '#488FAB',
            type: 1,
            bod: item?.booking?.bod,
            schedule: item?.booking?.schedule,
            dispatch_id: item?.id,
            customer_notes: item?.booking?.customer_notes,
            cleaner_notes: item?.booking?.cleaner_notes,
          };
        });
        setMyEventsTwo(_.sortBy(mapData, ['start']));
        setLoaderShow([false, true]);
      })
      .catch((err) => console.log(err));
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
            type: 1,
          };
        });
        setCompareEvents(mapData);
        setMyEvents(
          _.sortBy(
            mapData.filter((obj) => obj.status === 'scheduled' && obj.resourceId === 'r1'),
            ['start']
          )
        );
        setLoaderShow([false, false]);
      })
      .catch((err) => console.log(err));
  };
  const serviceListAPI = async () => {
    const dupEvent = [];
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
          if (item.leave_time.length > 0) {
            item.leave_time.forEach((leave) => {
              dupEvent.push({
                id: `leave${leave.id}`,
                start: moment.utc(leave?.start).format('YYYY-MM-DD HH:mm:ss'),
                end: moment.utc(leave?.end).format('YYYY-MM-DD HH:mm:ss'),
                resourceId: leave?.service_provider,
                title: leave?.title,
                resizable: false,
                bgColor: 'rgb(217, 35, 53)',
                movable: false,
                type: 3,
                schedule: { start_time: leave?.start, end_time: leave?.end },
              });
            });
          }

          if (item?.is_active === true) {
            arr.push({
              ...item,
              id: item?.id,
              name: `${item?.user_profile?.first_name} ${item?.user_profile?.last_name}`,
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
        setLeaveTime(dupEvent);
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
          {!loaderShow[0] &&
          !loaderShow[1] &&
          myEvents.length > 0 &&
          serviceProviderList.length > 0 ? (
            <Basic
              myEvents={myEvents}
              myEventsTwo={myEventsTwo}
              leaveTimeList={leaveTime}
              serviceProviderList={serviceProviderList}
              getEventList={getEventList}
              setDrawerState={setDrawerState}
              setSelectedBooking={setSelectedBooking}
              compareEvents={compareEvents}
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
      <Drawer
        anchor={'right'}
        open={drawerState}
        sx={{
          '& .MuiDrawer-paperAnchorRight': {
            width: '400px',
          },
        }}
        onClose={() => setDrawerState(false)}
      >
        <DrawerMain>
          <Box
            display={'flex'}
            alignItems="center"
            justifyContent={'space-between'}
            sx={{ padding: '15px', position: 'sticky' }}
          >
            <Typography variant="h5">Booking</Typography>
            <CloseIcon sx={{ cursor: 'pointer' }} onClick={() => setDrawerState(false)} />
          </Box>
          <Divider />
          <Box
            sx={{ padding: '15px' }}
            display={'flex'}
            justifyContent={'space-between'}
            flexDirection="column"
            height={'100%'}
          >
            <Box>
              <Typography variant="body1" fontWeight={'bold'} fontSize={'14px'}>
                Service Name
              </Typography>
              <Typography variant="body1" paddingBottom={'0.5rem'}>
                Cleany Miami - Maid Service
              </Typography>
              <Typography variant="body1" fontWeight={'bold'} fontSize={'14px'}>
                Booking Number
              </Typography>
              <Typography variant="body1" paddingBottom={'0.5rem'}>
                {selectedBooking?.id}
              </Typography>
              <Typography variant="body1" fontWeight={'bold'} fontSize={'14px'}>
                Schedule Id
              </Typography>
              <Typography variant="body1" paddingBottom={'0.5rem'}>
                {selectedBooking?.schedule?.id}
              </Typography>
              <Typography variant="body1" fontWeight={'bold'} fontSize={'14px'}>
                Dispatch Id
              </Typography>
              <Typography variant="body1" paddingBottom={'0.5rem'}>
                {selectedBooking?.dispatch_id}
              </Typography>
              <Typography variant="body1" fontWeight={'bold'} fontSize={'14px'}>
                Customer
              </Typography>
              <Typography variant="body1" paddingBottom={'0.5rem'}>
                {selectedBooking?.bod?.bod_contact_info?.first_name}{' '}
                {selectedBooking?.bod?.bod_contact_info?.last_name}
              </Typography>
              <Typography variant="body1" fontWeight={'bold'} fontSize={'14px'}>
                Location
              </Typography>
              <Typography variant="body1" paddingBottom={'0.5rem'}>
                {selectedBooking?.bod?.bod_service_location?.street_address}
              </Typography>
              <Typography variant="body1" fontWeight={'bold'} fontSize={'14px'}>
                Start
              </Typography>
              <Typography variant="body1" paddingBottom={'0.5rem'}>
                {moment.utc(selectedBooking?.schedule?.start_time).format('LLL')}
              </Typography>
              <Typography variant="body1" fontWeight={'bold'} fontSize={'14px'}>
                End
              </Typography>
              <Typography variant="body1" paddingBottom={'0.5rem'}>
                {moment.utc(selectedBooking?.schedule?.end_time).format('LLL')}
              </Typography>
              <Typography variant="body1" fontWeight={'bold'} fontSize={'14px'}>
                Frequency
              </Typography>
              <Typography variant="body1" paddingBottom={'0.5rem'} textTransform="capitalize">
                {selectedBooking?.bod?.frequency?.type}
              </Typography>
              <Typography variant="body1" fontWeight={'bold'} fontSize={'14px'}>
                Booking Notes
              </Typography>
              <Typography variant="body1" paddingBottom={'0.5rem'} textTransform="capitalize">
                {selectedBooking?.cleaner_notes === 'null'
                  ? 'No booking notes'
                  : selectedBooking?.cleaner_notes}
              </Typography>
              <Typography variant="body1" fontWeight={'bold'} fontSize={'14px'}>
                Customer Notes
              </Typography>
              <Typography variant="body1" paddingBottom={'0.5rem'} textTransform="capitalize">
                {selectedBooking?.customer_notes === 'null'
                  ? 'No customer notes'
                  : selectedBooking?.customer_notes}
              </Typography>
            </Box>
            <Box display={'flex'} alignItems="center" gap={2} paddingBottom={'1rem'}>
              <Button variant="outlined" color="error" onClick={() => setDrawerState(false)}>
                Close
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  navigate(`/dashboard/booking-appointments/${selectedBooking?.id}/details/`)
                }
              >
                View Details
              </Button>
            </Box>
          </Box>
        </DrawerMain>
      </Drawer>
      <Toaster position="top-right" />
    </>
  );
}

export default Dispatcher;
