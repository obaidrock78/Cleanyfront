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
import * as _ from 'lodash';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import DemoApp from './fullCalendar';

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
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [drawerState, setDrawerState] = useState(false);
  console.log(selectedBooking);
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
          <DemoApp setDrawerState={setDrawerState} setSelectedBooking={setSelectedBooking} />
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
                {selectedBooking?.booking_id}
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
                  navigate(
                    `/dashboard/booking-appointments/${selectedBooking?.booking_id}/details/`
                  )
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
