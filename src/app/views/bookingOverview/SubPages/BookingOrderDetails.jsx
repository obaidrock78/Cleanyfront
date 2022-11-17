import React, { useState, useCallback, useMemo, useEffect } from 'react';
import moment from 'moment';
import { Box, Button, Divider, Grid, styled, Tab, Tabs, Typography } from '@mui/material';
import { Breadcrumb } from 'app/components';
import { useParams } from 'react-router-dom';
import axios from '../../../../axios';
import { GET_PROVIDER_WORK_LIST } from 'app/api';
import toast from 'react-hot-toast';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PentagonOutlinedIcon from '@mui/icons-material/PentagonOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import GpsFixedOutlinedIcon from '@mui/icons-material/GpsFixedOutlined';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
  '& .formMain': {
    borderTop: '1px solid #d5d1d1',
  },
  '& .heading': {
    marginTop: '1rem',
    marginBottom: '1rem',
    color: 'rgba(52, 49, 76, 1)',
  },
}));

function BookingOrderDetails() {
  const params = useParams();
  const [value, setValue] = useState(0);
  useEffect(() => {
    getEventList();
  }, []);
  const getEventList = async () => {
    await axios
      .get(`${GET_PROVIDER_WORK_LIST}?service_provider=${params?.id}`)
      .then((res) => {})
      .catch((err) => console.log(err));
  };
  const steps = ['Call in', 'Unscheduled', 'Scheduled', 'Dispatched', 'Complete'];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              { name: 'Bookings', path: '/dashboard/booking-orders' },
              { name: 'Booking Orders', path: '/dashboard/booking-orders' },
              { name: 'Booking Overview' },
            ]}
          />
          <h3>Booking Overview</h3>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    boxShadow: 'rgb(30 41 59 / 4%) 0 2px 4px 0',
                    border: ' 1px solid rgba(98,105,118,.16)',
                    background: '#fff',
                    borderTop: ' 5px solid #1976d2',
                    padding: ' 1rem 1rem',
                    borderRadius: '4px',
                  }}
                >
                  <Stepper activeStep={2} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        boxShadow: 'rgb(30 41 59 / 4%) 0 2px 4px 0',
                        border: ' 1px solid rgba(98,105,118,.16)',
                        background: '#fff',
                        borderTop: ' 5px solid #1976d2',
                        padding: ' 1rem 1rem',
                        borderRadius: '4px',
                        '& .headingSubTxt': {
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          paddingBottom: '1rem',
                        },
                        '& p': {
                          margin: 'unset',
                          paddingLeft: '5px',
                        },
                      }}
                    >
                      <Typography variant="h3" className="headingSubTxt">
                        Booking
                      </Typography>
                      <Box
                        display={'flex'}
                        alignItems="center"
                        paddingBottom="5px"
                        fontWeight={'bold'}
                      >
                        <TodayOutlinedIcon sx={{ paddingRight: '5px' }} />
                        <p>Oct. 2, 2022, 3:26 a.m.</p>
                      </Box>
                      <Box
                        display={'flex'}
                        alignItems="center"
                        paddingBottom="5px"
                        fontWeight={'bold'}
                      >
                        <AccessTimeOutlinedIcon sx={{ paddingRight: '5px' }} />
                        <p>11:00 - 5.00 (hrs)</p>
                      </Box>
                      <Box
                        display={'flex'}
                        alignItems="center"
                        paddingBottom="5px"
                        fontWeight={'bold'}
                      >
                        <PentagonOutlinedIcon sx={{ paddingRight: '5px' }} />
                        <p>B-1</p>
                      </Box>
                      <Box
                        display={'flex'}
                        alignItems="center"
                        paddingBottom="5px"
                        fontWeight={'bold'}
                      >
                        <SpeedOutlinedIcon sx={{ paddingRight: '5px' }} />
                        <p>None Cleaning</p>
                      </Box>
                      <Box
                        display={'flex'}
                        alignItems="center"
                        paddingBottom="5px"
                        fontWeight={'bold'}
                      >
                        <ViewInArIcon sx={{ paddingRight: '5px' }} />
                        <p>Service</p>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Box
                      sx={{
                        boxShadow: 'rgb(30 41 59 / 4%) 0 2px 4px 0',
                        border: ' 1px solid rgba(98,105,118,.16)',
                        background: '#fff',
                        borderTop: ' 5px solid #1976d2',
                        padding: ' 1rem 1rem',
                        borderRadius: '4px',
                        '& .headingSubTxt': {
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          paddingBottom: '1rem',
                        },
                        '& p': {
                          margin: 'unset',
                          paddingLeft: '5px',
                        },
                      }}
                    >
                      <Typography variant="h3" className="headingSubTxt">
                        Details
                      </Typography>
                      <Box display="flex" justifyContent={'space-between'}>
                        <Box>
                          <p>Bedrooms</p>

                          <p>Bathrooms</p>

                          <p>Dropdown Option</p>

                          <p>Do you have pets?</p>

                          <p>How will we get in?</p>

                          <p>Is parking available?</p>
                        </Box>
                        <Box sx={{ fontWeight: 'bold', textAlign: 'right' }}>
                          <p>Studio ( 500 Sq Ft)</p>

                          <p>1 Bathroom</p>

                          <p>Standard Cleany</p>

                          <p>No Pets</p>

                          <p>I'll be at home</p>

                          <p>Yes - no fee</p>
                        </Box>
                      </Box>
                      <Box display={'flex'} alignItems="center" paddingBottom="10px">
                        <GpsFixedOutlinedIcon sx={{ paddingRight: '5px' }} />
                        <p>1245 Main Street, FLorida</p>
                      </Box>
                      <Box textAlign={'right'}>
                        <Button
                          variant="text"
                          startIcon={<LocationOnOutlinedIcon />}
                          endIcon={<ArrowRightAltOutlinedIcon />}
                        >
                          see on the Google Map
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Box
                      sx={{
                        boxShadow: 'rgb(30 41 59 / 4%) 0 2px 4px 0',
                        border: ' 1px solid rgba(98,105,118,.16)',
                        background: '#fff',
                        borderTop: ' 5px solid #1976d2',
                        padding: ' 1rem 1rem',
                        borderRadius: '4px',
                        '& .headingSubTxt': {
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          paddingBottom: '1rem',
                        },
                        '& p': {
                          margin: 'unset',
                          paddingLeft: '5px',
                        },
                      }}
                    >
                      <Typography variant="h3" className="headingSubTxt">
                        See Customer On Stripe
                      </Typography>

                      <Box display={'flex'} alignItems="center" paddingBottom="10px">
                        <CreditCardOutlinedIcon sx={{ paddingRight: '5px' }} />
                        <p>Card Details</p>
                      </Box>
                      <Box textAlign={'right'}>
                        <Button
                          variant="text"
                          startIcon={<CreditCardOutlinedIcon />}
                          endIcon={<ArrowRightAltOutlinedIcon />}
                          href="https://dashboard.stripe.com/login?redirect=%2Ftest%2Fcustomers%2Fcus_MXNagLEmS4YskQ"
                          target={'_blank'}
                        >
                          Logs
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Box
                      sx={{
                        boxShadow: 'rgb(30 41 59 / 4%) 0 2px 4px 0',
                        border: ' 1px solid rgba(98,105,118,.16)',
                        background: '#fff',
                        borderTop: ' 5px solid #1976d2',
                        padding: ' 1rem 1rem',
                        borderRadius: '4px',
                        '& .headingSubTxt': {
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          paddingBottom: '1rem',
                        },
                        '& p': {
                          margin: 'unset',
                          paddingLeft: '5px',
                        },
                      }}
                    >
                      <Typography variant="h3" className="headingSubTxt">
                        Assigned Service Providers
                      </Typography>
                      <Grid container>
                        <Grid item xs={3} textAlign="center" fontWeight={'bold'}>
                          Assigned On
                        </Grid>
                        <Grid item xs={3} textAlign="center" fontWeight={'bold'}>
                          Service Provider
                        </Grid>
                        <Grid item xs={3} textAlign="center" fontWeight={'bold'}>
                          Phone
                        </Grid>
                        <Grid item xs={3} textAlign="center" fontWeight={'bold'}>
                          View Profile
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={3}>
                          Oct. 2, 2022, 11 a.m.
                        </Grid>
                        <Grid item xs={3} textAlign="center">
                          jon
                        </Grid>
                        <Grid item xs={3} textAlign="center">
                          23423423
                        </Grid>
                        <Grid item xs={3} textAlign="center">
                          <Button variant="text">
                            <ArrowRightAltOutlinedIcon />
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Box
                      sx={{
                        boxShadow: 'rgb(30 41 59 / 4%) 0 2px 4px 0',
                        border: ' 1px solid rgba(98,105,118,.16)',
                        background: '#fff',
                        borderTop: ' 5px solid #1976d2',
                        padding: ' 1rem 1rem',
                        borderRadius: '4px',
                        '& .headingSubTxt': {
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          paddingBottom: '1rem',
                        },
                        '& p': {
                          margin: 'unset',
                          paddingLeft: '5px',
                        },
                      }}
                    >
                      <Typography variant="h3" className="headingSubTxt">
                        Payment Transactions
                      </Typography>
                      <Grid container>
                        <Grid item xs={3} textAlign="center" fontWeight={'bold'}>
                          Processed On
                        </Grid>
                        <Grid item xs={3} textAlign="center" fontWeight={'bold'}>
                          Mode
                        </Grid>
                        <Grid item xs={3} textAlign="center" fontWeight={'bold'}>
                          Amount
                        </Grid>
                        <Grid item xs={3} textAlign="center" fontWeight={'bold'}></Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={3}>
                          Oct. 2, 2022, 3:26 a.m.
                        </Grid>
                        <Grid item xs={3} textAlign="center">
                          card
                        </Grid>
                        <Grid item xs={3} textAlign="center">
                          $ 15.0
                        </Grid>
                        <Grid item xs={3} textAlign="center">
                          <Button variant="text">
                            <ArrowRightAltOutlinedIcon />
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        boxShadow: 'rgb(30 41 59 / 4%) 0 2px 4px 0',
                        border: ' 1px solid rgba(98,105,118,.16)',
                        background: '#fff',
                        borderTop: ' 5px solid #1976d2',
                        padding: ' 1rem 1rem',
                        borderRadius: '4px',
                        '& .headingSubTxt': {
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          paddingBottom: '1rem',
                        },
                        '& p': {
                          margin: 'unset',
                          paddingLeft: '5px',
                        },
                      }}
                    >
                      <Typography variant="h3" className="headingSubTxt">
                        Customer
                      </Typography>
                      <Box
                        display={'flex'}
                        alignItems="center"
                        paddingBottom="5px"
                        fontWeight={'bold'}
                      >
                        <AccountCircleOutlinedIcon sx={{ paddingRight: '5px' }} />
                        <p style={{ fontSize: '1.25rem' }}>Obaid Test</p>
                      </Box>
                      <Box
                        display={'flex'}
                        alignItems="center"
                        paddingBottom="5px"
                        fontWeight={'bold'}
                      >
                        <EmailOutlinedIcon sx={{ paddingRight: '5px' }} />
                        <p>Test@test.com</p>
                      </Box>
                      <Box
                        display={'flex'}
                        alignItems="center"
                        paddingBottom="5px"
                        fontWeight={'bold'}
                      >
                        <LocalPhoneOutlinedIcon sx={{ paddingRight: '5px' }} />
                        <p>1346546564</p>
                      </Box>
                      <Box
                        display={'flex'}
                        alignItems="center"
                        paddingBottom="5px"
                        fontWeight={'bold'}
                      >
                        <HomeOutlinedIcon sx={{ paddingRight: '5px' }} />
                        <p>1245 Main Street</p>
                      </Box>
                      <Box
                        display={'flex'}
                        alignItems="center"
                        paddingBottom="5px"
                        fontWeight={'bold'}
                      >
                        <LocationOnOutlinedIcon sx={{ paddingRight: '5px' }} />
                        <p>From: USA,FLorida</p>
                      </Box>
                      <Box
                        display={'flex'}
                        alignItems="center"
                        paddingBottom="5px"
                        fontWeight={'bold'}
                      >
                        <EventOutlinedIcon sx={{ paddingRight: '5px' }} />
                        <p>Since:</p>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Box
                      sx={{
                        boxShadow: 'rgb(30 41 59 / 4%) 0 2px 4px 0',
                        border: ' 1px solid rgba(98,105,118,.16)',
                        background: '#fff',
                        borderTop: ' 5px solid #1976d2',
                        padding: ' 1rem 1rem',
                        borderRadius: '4px',
                        '& .headingSubTxt': {
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          paddingBottom: '1rem',
                        },
                        '& p': {
                          margin: 'unset',
                          paddingLeft: '5px',
                        },
                        '& h3': {
                          margin: 'unset',
                          paddingLeft: '5px',
                        },
                      }}
                    >
                      <Typography variant="h3" className="headingSubTxt">
                        Recurring
                      </Typography>
                      <Box display="flex">
                        <AutorenewIcon sx={{ fontSize: '3rem' }} />
                        <Box>
                          <h3>
                            <span style={{ fontWeight: '400' }}>Frequency: </span>Every 2 Weeks
                          </h3>
                          <Box display={'flex'} alignItems="center">
                            <AccessTimeIcon sx={{ paddingRight: '5px' }} />
                            <p>11:00 - 5.00 (hrs)</p>
                          </Box>
                          <Box display={'flex'} alignItems="center">
                            <TodayOutlinedIcon sx={{ paddingRight: '5px' }} />
                            <p>
                              Start <span style={{ fontWeight: 'bold' }}>January 8, 2022</span>
                            </p>
                          </Box>
                          <Box display={'flex'} alignItems="center">
                            <TodayOutlinedIcon sx={{ paddingRight: '5px' }} />
                            <p>
                              <span style={{ fontWeight: 'bold' }}>End No end date</span>
                            </p>
                          </Box>
                        </Box>
                      </Box>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="icon tabs example"
                        sx={{
                          height: '35px',
                          '& button': {
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'row',
                          },
                        }}
                      >
                        <Tab
                          icon={<NoteAddOutlinedIcon sx={{ marginRight: '3px' }} />}
                          label="Upcoming"
                          aria-label="phone"
                        />
                        <Tab
                          icon={<CancelPresentationIcon sx={{ marginRight: '3px' }} />}
                          label="Unscheduled"
                          aria-label="favorite"
                        />
                        <Tab
                          icon={<DoneAllIcon sx={{ marginRight: '3px' }} />}
                          label="passed"
                          aria-label="person"
                        />
                      </Tabs>
                      <Grid container sx={{ paddingTop: '10px' }}>
                        <Grid item xs={2} textAlign="center">
                          <Box display="flex" alignItems={'center'}>
                            <BookOutlinedIcon sx={{ marginRight: '10px' }} /> <span> 1</span>
                          </Box>
                        </Grid>
                        <Grid item xs={8} textAlign="center">
                          <span>Oct. 2, 2022, 11 a.m.</span>
                        </Grid>
                        <Grid item xs={2} textAlign="center">
                          <span>11:00</span>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Box
                      sx={{
                        boxShadow: 'rgb(30 41 59 / 4%) 0 2px 4px 0',
                        border: ' 1px solid rgba(98,105,118,.16)',
                        background: '#fff',
                        borderTop: ' 5px solid #1976d2',
                        padding: ' 1rem 1rem',
                        borderRadius: '4px',
                        '& .headingSubTxt': {
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          paddingBottom: '1rem',
                        },
                        '& p': {
                          margin: 'unset',
                          paddingLeft: '5px',
                        },
                      }}
                    >
                      <Typography variant="h3" className="headingSubTxt">
                        Payment Information
                      </Typography>
                      <Box display={'flex'} alignItems="center" justifyContent={'space-between'}>
                        <Box display={'flex'} alignItems="center" paddingBottom="10px">
                          <CreditCardOutlinedIcon sx={{ paddingRight: '5px' }} />
                          <p>Preferred Payment Method</p>
                        </Box>
                        <Box paddingBottom="10px">Credit Card</Box>
                      </Box>

                      <Box textAlign={'right'}>
                        <Button
                          variant="text"
                          startIcon={<CreditCardOutlinedIcon />}
                          endIcon={<ArrowRightAltOutlinedIcon />}
                        >
                          Payment Options
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Box
                      sx={{
                        boxShadow: 'rgb(30 41 59 / 4%) 0 2px 4px 0',
                        border: ' 1px solid rgba(98,105,118,.16)',
                        background: '#fff',
                        borderTop: ' 5px solid #1976d2',
                        padding: ' 1rem 1rem',
                        borderRadius: '4px',
                        '& .headingSubTxt': {
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          paddingBottom: '1rem',
                        },
                        '& p': {
                          margin: 'unset',
                          paddingLeft: '5px',
                        },
                      }}
                    >
                      <Typography variant="h3" className="headingSubTxt">
                        Communications
                      </Typography>
                      <Box display="flex" justifyContent={'space-between'}>
                        <Box
                          sx={{
                            '& p': {
                              fontWeight: 'bold',
                            },
                          }}
                        >
                          <p>Customer Wants Email</p>

                          <p>Customer Wants SMS</p>

                          <p>Customer Requested Emails for this</p>

                          <p>Booking</p>

                          <p>Requested SMS for this Booking</p>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <p>Yes</p>

                          <p>Yes</p>

                          <p>Yes</p>

                          <p>-</p>

                          <p>Yes</p>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box
              sx={{
                boxShadow: 'rgb(30 41 59 / 4%) 0 2px 4px 0',
                border: ' 1px solid rgba(98,105,118,.16)',
                background: '#fff',
                borderTop: ' 5px solid #1976d2',
                padding: ' 0.7rem 1rem',
                borderRadius: '4px',
                textAlign: 'center',
                '& .headingSubTxt': {
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  paddingBottom: '1px',
                  textAlign: 'center',
                },
                '& p': {
                  margin: 'unset',
                  paddingLeft: '5px',
                },
                '& button': {
                  marginTop: '10px',
                  fontWeight: 'bold',
                },
              }}
            >
              <Typography variant="h3" className="headingSubTxt">
                Fully Charged
              </Typography>
              <Button variant="contained" color="inherit">
                Charge Now
              </Button>
            </Box>
            <Box
              sx={{
                boxShadow: 'rgb(30 41 59 / 4%) 0 2px 4px 0',
                border: ' 1px solid rgba(98,105,118,.16)',
                background: '#fff',
                borderTop: ' 5px solid #1976d2',
                padding: ' 1rem 1rem',
                borderRadius: '4px',
                '& .headingSubTxt': {
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  paddingBottom: '1rem',
                },
                '& p': {
                  margin: 'unset',
                },
              }}
            >
              <Typography variant="h3" className="headingSubTxt">
                Cost Information
              </Typography>
              <Box display="flex" alignItems={'center'} justifyContent="space-between">
                <Typography variant="body1">Type Cleaning</Typography>
                <Typography variant="body1">None</Typography>
              </Box>
              <Box display="flex" alignItems={'center'} justifyContent="space-between">
                <Typography variant="body1">Status</Typography>
                <Typography variant="body1">completed</Typography>
              </Box>
              <Divider sx={{ paddingTop: '1.5rem', marginBottom: '1.5rem' }} />
              <Box display="flex" alignItems={'center'} justifyContent="space-between">
                <Typography variant="body1">Total</Typography>
                <Typography variant="body1">15.0</Typography>
              </Box>
              <Box display="flex" alignItems={'center'} justifyContent="space-between">
                <Typography variant="body1">Required Time (Hrs)</Typography>
                <Typography variant="body1">2.0</Typography>
              </Box>
              <Divider sx={{ paddingTop: '1.5rem', marginBottom: '1.5rem' }} />
              <Box display="flex" alignItems={'center'} justifyContent="space-between">
                <Typography variant="body1">Charged</Typography>
                <Typography variant="body1">$15.0</Typography>
              </Box>
              <Box display="flex" alignItems={'center'} justifyContent="space-between">
                <Typography variant="body1">Outstanding Balance</Typography>
                <Typography variant="body1">$0.0</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                boxShadow: 'rgb(30 41 59 / 4%) 0 2px 4px 0',
                border: ' 1px solid rgba(98,105,118,.16)',
                background: '#fff',
                borderTop: ' 5px solid #1976d2',
                padding: ' 1rem 1rem',
                borderRadius: '4px',
                '& .headingSubTxt': {
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  paddingBottom: '1rem',
                },
                '& p': {
                  margin: 'unset',
                },
                '& button': {
                  fontWeight: '500',
                },
              }}
            >
              <Typography variant="h3" className="headingSubTxt">
                Actions
              </Typography>
              <Box display={'flex'} alignItems={'center'} flexDirection={'column'} gap={1}>
                <Button fullWidth variant="contained">
                  Refresh
                </Button>
                <Button fullWidth variant="contained">
                  Edit
                </Button>
                <Button fullWidth variant="contained">
                  Reschedule Booking
                </Button>
                <Button fullWidth variant="contained">
                  Manual Dispatch
                </Button>
                <Button fullWidth variant="contained">
                  Raise Problem
                </Button>
                <Button fullWidth variant="contained">
                  Attach File
                </Button>
                <Button fullWidth variant="contained" color="success">
                  Charge Customer
                </Button>
                <Button fullWidth variant="contained">
                  Mark Complete
                </Button>
                <Button fullWidth variant="contained">
                  Generate Invoice
                </Button>
                <Button fullWidth variant="contained" color="success">
                  Charge Tip
                </Button>
                <Button fullWidth variant="contained" color="warning">
                  Cancel Booking
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                boxShadow: 'rgb(30 41 59 / 4%) 0 2px 4px 0',
                border: ' 1px solid rgba(98,105,118,.16)',
                background: '#fff',
                borderTop: ' 5px solid #1976d2',
                padding: ' 1rem 1rem',
                borderRadius: '4px',
                '& .headingSubTxt': {
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  margin: 'unset',
                  paddingTop: '1rem',
                },
                '& p': {
                  margin: 'unset',
                },
                '& button': {
                  fontWeight: 'bold',
                },
              }}
            >
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent="center"
                flexDirection={'column'}
              >
                <Box
                  sx={{ width: '5rem', height: '5rem', borderRadius: '50%', background: 'gray' }}
                ></Box>
                <h4 className="headingSubTxt">Buyer test</h4>
                <p>Customer</p>
                <Divider sx={{ paddingTop: '1rem', marginBottom: '0.5rem', width: '100%' }} />
                <Button fullWidth variant="text">
                  Edit Profile
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default BookingOrderDetails;
