import React, { useEffect, useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Box from '@mui/material/Box';
import { Grid, styled, Button, responsiveFontSizes } from '@mui/material';
import StatCards from './tabsPane/StatsCard/StatCards';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AddTask from './tabsPane/AddTask';
import Chat from './tabsPane/Chat';
import Scheduler from './tabsPane/Scheduler';
import axios from '../../../axios';
import { BOOKING_NOTIFICATION, COMPANY_PROFILE_DATA } from 'app/api';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import WeatherComponent from './weather';

const StylesTabsArea = styled(Box)(({ theme }) => ({
  p: 3,
  width: '100%',
  typography: 'body1',
  height: '660px',
  background: theme.palette.background.paper,
  boxShadow:
    '0px 3px 3px -2px rgb(0 0 0 / 6%),0px 3px 4px 0px rgb(0 0 0 / 4%),0px 1px 8px 0px rgb(0 0 0 / 4%)!important',
  borderRadius: '10px',
  borderTop: '5px solid blue',
  padding: '10px',
}));

const TaskArea = styled(Box)(({ theme }) => ({
  p: 3,
  width: '100%',
  typography: 'body1',
  height: '660px',
  background: theme.palette.background.paper,
  boxShadow:
    '0px 3px 3px -2px rgb(0 0 0 / 6%),0px 3px 4px 0px rgb(0 0 0 / 4%),0px 1px 8px 0px rgb(0 0 0 / 4%)!important',
  borderRadius: '10px',
  borderTop: '5px solid green',
  padding: '10px',
}));
const ChatArea = styled(Box)(({ theme }) => ({
  p: 3,
  width: '100%',
  typography: 'body1',
  height: '100%',
  background: theme.palette.background.paper,
  boxShadow:
    '0px 3px 3px -2px rgb(0 0 0 / 6%),0px 3px 4px 0px rgb(0 0 0 / 4%),0px 1px 8px 0px rgb(0 0 0 / 4%)!important',
  borderRadius: '10px',
  padding: '10px',

  borderTop: '5px solid green',
}));

const EasyAccess = styled(Box)(({ theme }) => ({
  width: '100%',

  borderTop: '5px solid orange ',
  background: theme.palette.background.paper,
  boxShadow:
    '0px 3px 3px -2px rgb(0 0 0 / 6%),0px 3px 4px 0px rgb(0 0 0 / 4%),0px 1px 8px 0px rgb(0 0 0 / 4%)!important',
  borderRadius: '10px',
  padding: '10px',
}));

const EasyAccessHeading = styled('h3')(({ theme }) => ({
  typography: 'body1',
  color: 'black',
  borderBottom: '1px solid',
  borderBottomColor: theme.palette.text.secondary,
  textAlign: 'center',
  fontWeight: '900 !important',
  fontSize: '24px !important',
}));

const EasyAccessContent = styled(Box)(({ theme }) => ({
  // overflowY: 'scroll',
  // height: '200px'
}));

const Notifications = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  background: theme.palette.background.paper,
  boxShadow:
    '0px 3px 3px -2px rgb(0 0 0 / 6%),0px 3px 4px 0px rgb(0 0 0 / 4%),0px 1px 8px 0px rgb(0 0 0 / 4%)!important',
  borderRadius: '10px',
  padding: '10px',
  marginBottom: '10px',

  borderTop: '5px solid red',
}));

const NotificationsHeading = styled('h3')(({ theme }) => ({
  typography: 'body1',
  color: 'black',
  borderBottom: '1px solid',
  borderBottomColor: theme.palette.text.secondary,
  textAlign: 'center',
  fontWeight: '900 !important',
  fontSize: '24px !important',
}));

const NotificationsContent = styled(Box)(({ theme }) => ({
  // overflowY: 'scroll',
  // height: '100px'
}));

const Weather = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  background: theme.palette.background.paper,
  boxShadow:
    '0px 3px 3px -2px rgb(0 0 0 / 6%),0px 3px 4px 0px rgb(0 0 0 / 4%),0px 1px 8px 0px rgb(0 0 0 / 4%)!important',
  borderRadius: '10px',
  padding: '10px',
  marginBottom: '10px',

  borderTop: '5px solid  lightblue',
}));

const WeatherHeading = styled('h3')(({ theme }) => ({
  typography: 'body1',
  color: 'black',
  borderBottom: '1px solid',
  borderBottomColor: theme.palette.text.secondary,
  textAlign: 'center',
  fontWeight: '900 !important',
  fontSize: '24px !important',
}));

const WeatherContent = styled(Box)(({ theme }) => ({
  overflowY: 'scroll',
  height: '500px',
}));

const StatsArea = styled(Box)(({ theme }) => ({
  p: 3,
  width: '100%',
  typography: 'body1',
  background: theme.palette.background.paper,
  boxShadow:
    '0px 3px 3px -2px rgb(0 0 0 / 6%),0px 3px 4px 0px rgb(0 0 0 / 4%),0px 1px 8px 0px rgb(0 0 0 / 4%)!important',
  borderRadius: '10px',
  padding: '10px',
  borderTop: '5px solid purple',
}));
const StatHeading = styled('h3')(({ theme }) => ({
  typography: 'body1',
  color: 'black',
  borderBottom: '1px solid',
  borderBottomColor: theme.palette.text.secondary,
  textAlign: 'center',
  fontWeight: '900 !important',
  fontSize: '24px !important',
}));

const easyAccessContentItems = [
  {
    link: 'https://cleany-app.netlify.app/dashboard/customers/create',
    text: 'Create Customer',
    color: '#206bc4',
  },
  { link: '#', text: 'Create Booking', color: '#206bc4' },
  { link: 'https://mail.google.com/chat/u/0/', text: 'Google Chat', color: '#0b956c' },
  { link: 'https://www.nextiva.com/ ', text: 'Nextiva', color: '#daa520' },
  { link: 'https://business.yelp.com/', text: 'Yelp', color: '#ff0000' },
  { link: 'https://www.google.com/business/ ', text: 'Google Business', color: '#228b22' },
  { link: 'https://www.lastpass.com/', text: 'Last Pass', color: '#808080' },
  { link: 'https://dashboard.stripe.com/login ', text: 'Stripe', color: '#800080' },
  { link: 'https://www.bankofamerica.com/smallbusiness/ ', text: 'Banking', color: '#8b0000' },
];

const MainDashboard = () => {
  const [bookingNotification, setBookingNotification] = React.useState();
  const [formData, setformData] = useState(null);

  useEffect(() => {
    companyProfileApi();
  }, []);

  const companyProfileApi = async () => {
    await axios
      .get(`${COMPANY_PROFILE_DATA}`, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => setformData(res?.data?.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const getNotification = async () => {
      await axios
        .get(`${BOOKING_NOTIFICATION}`)
        .then((res) => {
          const dataToMap = res?.data?.data;
          setBookingNotification(dataToMap);
        })
        .catch((err) => console.log(err));
    };

    getNotification();
  }, []);

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={3} rowSpacing={2}>
        <Grid item lg={9} md={9} sm={12} xs={12}>
          <StatsArea>
            <StatHeading>Analytical Overview</StatHeading>
            <StatCards />
          </StatsArea>
        </Grid>

        <Grid item lg={3} md={3} sm={12} xs={12}>
          <Notifications>
            <NotificationsHeading>Recent Activity</NotificationsHeading>
            <NotificationsContent>
              <List sx={{ width: '100%', overflowY: 'auto', maxHeight: '220px', height: '220px' }}>
                {bookingNotification?.map((items) => {
                  return (
                    <ListItem
                      sx={{
                        mb: 1.5,
                        borderRadius: '10px',
                        boxShadow:
                          '0px 3px 3px -2px rgb(0 0 0 / 6%),0px 3px 4px 0px rgb(0 0 0 / 4%),0px 1px 8px 0px rgb(0 0 0 / 4%)!important',
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <ImageIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <a
                        href={`https://cleany-app.netlify.app/dashboard/booking-appointments/${items.booking_id}/details/`}
                      >
                        <ListItemText
                          primary={items.title}
                          secondary={new Date(items.created_at).toJSON().slice(0, 10)}
                        />
                      </a>
                    </ListItem>
                  );
                })}
              </List>
            </NotificationsContent>
          </Notifications>
        </Grid>

        <Grid item lg={9} md={9} sm={12} xs={12}>
          <StylesTabsArea>
            <Scheduler />
          </StylesTabsArea>
        </Grid>

        <Grid item lg={3} md={3} sm={12} xs={12}>
          <EasyAccess>
            <EasyAccessHeading>Easy Access</EasyAccessHeading>
            <EasyAccessContent>
              <Grid container>
                {easyAccessContentItems.map((items) => {
                  return (
                    <Grid item md={12}>
                      <Box component={'p'}>
                        <Button
                          href={items.link}
                          sx={{
                            backgroundColor: items.color,
                            color: 'white',
                            '&.MuiButton-root:hover': {
                              color: 'black',
                            },
                          }}
                          fullWidth
                        >
                          {items.text}
                        </Button>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </EasyAccessContent>
          </EasyAccess>
        </Grid>

        <Grid item lg={8} md={8} sm={12} xs={12}>
          <TaskArea>
            <AddTask />
          </TaskArea>
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Weather>
            <WeatherHeading>Weather</WeatherHeading>
            <WeatherContent>
              {formData !== null && <WeatherComponent formData={formData} />}
            </WeatherContent>
          </Weather>
        </Grid>

        <Grid item md={12}>
          <ChatArea>
            <Chat />
          </ChatArea>
        </Grid>
        <Grid item md={12}>
          <ChatArea>
            <Editor
              onInit={(evt, editor) => editorRef.current = editor}
              initialValue='<table role=" presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate;width:100%">
            <tbody><tr>
              <td style="font-family:sans-serif;font-size:14px;vertical-align:top;box-sizing:border-box;background:#ffffff;padding:10px 20px;border-radius:3px 3px 0 0;border-bottom:none;border-top:3px solid #347efb">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate;width:100%">
                  <tbody><tr>
                    <td width="NaN" height="32" id="m_-7908327151059634069m_-7421923159361587435logo" style="font-family:sans-serif;font-size:14px;vertical-align:top;color:#ffffff;text-align:right">
                      <table role="presentation" width="100%" height="32" border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate;width:100%">
                        <tbody><tr>
                          <td width="NaN" height="32" style="font-family:sans-serif;font-size:14px;vertical-align:top;color:#ffffff;text-align:center">
                            <img width="0" height="32" src="https://ci5.googleusercontent.com/proxy/XJSpzDcEwi51lj8m40J4gXS2GiZMnn3o1YkgHHcrudIgvjgS1B2U0IW_ZBIhkf2vUNOJZO1WPKvbsf5yhlXqhAf-gjoqLAVhfzXhikcbWvoKDF_AF2MsWElUIxm3dmd5p2VPoApqVP61nw=s0-d-e1-ft#https://storage.podiumio.com/06dee2ae-30ab-4acf-9189-6ed124ca6a72/images/logo_64x64.jpg" style="border:none;max-width:100%;vertical-align:middle" class="CToWUd" data-bit="iit" jslog="138226; u014N:xr6bB; 53:W2ZhbHNlLDJd">
                          </td>
                        </tr>
                        </tbody></table>
                    </td>
                    <td id="m_-7908327151059634069m_-7421923159361587435company" style="font-family:sans-serif;font-size:18px;vertical-align:top;color:#333333;text-align:left;padding-left:10px;line-height:32px;font-weight:bold;margin:0">Cleany Miami</td>
                    <td id="m_-7908327151059634069m_-7421923159361587435type" style="font-family:sans-serif;font-size:14px;vertical-align:top;color:#000000;text-align:right;line-height:32px">Confirmation</td>
                  </tr>
                  </tbody></table>
              </td>
            </tr>

              <tr>
                <td style="font-family:sans-serif;font-size:14px;vertical-align:top;box-sizing:border-box;background:#e9e9e9;padding:15px 20px;border-top:1px solid #e6e6e6">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate;width:100%">
                    <tbody><tr>
                      <td style="font-family:sans-serif;font-size:16px;vertical-align:top;color:#ffffff"><h3 style="color:#000000;font-family:sans-serif;font-weight:400;line-height:1.4;margin:0;text-align:center">Cleany Miami - Deep Clean</h3>

                        <h2 style="color:#000000;font-family:sans-serif;font-weight:bold;line-height:1.4;margin:0;text-align:center">Thursday, July 7, 2022 2:00 AM</h2>
                      </td>
                    </tr>
                    </tbody></table>
                </td>
              </tr>


              <tr>
                <td style="font-family:sans-serif;font-size:14px;vertical-align:top;box-sizing:border-box;padding:20px;background:#ffffff;border-radius:0 0 3px 3px;border-top:1px solid #e6e6e6">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:separate;width:100%">
                    <tbody><tr>
                      <td style="font-family:sans-serif;font-size:14px;vertical-align:top"><p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;margin-bottom:15px">Hello Obed Rehman,</p><p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;margin-bottom:15px">Thank you for your booking! Your booking number is 0000-0462.</p>                                <hr style="border:0;border-bottom:1px solid #f6f6f6;Margin:20px 0"><h4 style="color:#000000;font-family:sans-serif;font-weight:400;line-height:1.4;margin:0;text-align:center"><b>Your Information</b></h4><table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:separate;width:100%">    <tbody><tr>        <td style="font-family:sans-serif;font-size:14px;vertical-align:top">Name</td>        <td style="font-family:sans-serif;font-size:14px;vertical-align:top;text-align:right">Obed Rehman</td>    </tr>    <tr>        <td style="font-family:sans-serif;font-size:14px;vertical-align:top">Email</td>        <td style="font-family:sans-serif;font-size:14px;vertical-align:top;text-align:right"><a href="mailto:obaidrock78@gmail.com" target="_blank">obaidrock78@gmail.com</a></td>    </tr>    <tr>        <td style="font-family:sans-serif;font-size:14px;vertical-align:top">Phone</td>        <td style="font-family:sans-serif;font-size:14px;vertical-align:top;text-align:right">+923034142927</td>    </tr>    <tr>        <td style="font-family:sans-serif;font-size:14px;vertical-align:top">Address</td>        <td style="font-family:sans-serif;font-size:14px;vertical-align:top;text-align:right">2 - assa, 54999</td>    </tr>    <tr>        <td style="font-family:sans-serif;font-size:14px;vertical-align:top">City</td>        <td style="font-family:sans-serif;font-size:14px;vertical-align:top;text-align:right">sasaas</td>    </tr>    </tbody></table><hr style="border:0;border-bottom:1px solid #f6f6f6;Margin:20px 0"><h4 style="color:#000000;font-family:sans-serif;font-weight:400;line-height:1.4;margin:0;text-align:center"><b>Booking Details</b></h4><div><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:separate;width:100%">
                        <tbody><tr>
                          <td style="font-family:sans-serif;font-size:14px;vertical-align:top">Bedrooms</td>
                          <td align="right" style="font-family:sans-serif;font-size:14px;vertical-align:top;text-align:right">Studio Deep Clean (&lt;500 Sq Ft)</td>
                        </tr>
                          <tr>
                            <td style="font-family:sans-serif;font-size:14px;vertical-align:top">Bathrooms</td>
                            <td align="right" style="font-family:sans-serif;font-size:14px;vertical-align:top;text-align:right">1 Bathroom</td>
                          </tr>
                          <tr>
                            <td style="font-family:sans-serif;font-size:14px;vertical-align:top">Do You Have Any Pets?</td>
                            <td align="right" style="font-family:sans-serif;font-size:14px;vertical-align:top;text-align:right">No Pets</td>
                          </tr>
                          <tr>
                            <td style="font-family:sans-serif;font-size:14px;vertical-align:top">Dropdown Option</td>
                            <td align="right" style="font-family:sans-serif;font-size:14px;vertical-align:top;text-align:right">Ill be home</td>
                          </tr>
                          <tr>
                            <td style="font-family:sans-serif;font-size:14px;vertical-align:top">Frequency</td>
                            <td align="right" style="font-family:sans-serif;font-size:14px;vertical-align:top;text-align:right">Daily</td>
                          </tr>
                          <tr>
                            <td style="font-family:sans-serif;font-size:14px;vertical-align:top">Frequency</td>
                            <td align="right" style="font-family:sans-serif;font-size:14px;vertical-align:top;text-align:right">Daily</td>
                          </tr>

                        </tbody></table></div><div></div><hr style="border:0;border-bottom:1px solid #f6f6f6;Margin:20px 0"><div><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:separate;width:100%">
                          <tbody><tr>
                            <td align="right" style="font-family:sans-serif;font-size:14px;vertical-align:top;text-align:right;font-weight:bold">Subtotal</td>
                            <td align="right" style="font-family:sans-serif;font-size:14px;vertical-align:top;text-align:right"> $219.00</td>
                          </tr>



                            <tr>
                              <td align="right" style="font-family:sans-serif;font-size:14px;vertical-align:top;text-align:right;font-weight:bold">Tax</td>
                              <td align="right" style="font-family:sans-serif;font-size:14px;vertical-align:top;text-align:right"> $15.33</td>
                            </tr>

                            <tr>
                              <td align="right" style="font-family:sans-serif;font-size:14px;vertical-align:top;text-align:right;font-weight:bold">Total</td>
                              <td align="right" style="font-family:sans-serif;font-size:14px;vertical-align:top;text-align:right"> $234.33</td>
                            </tr>

                          </tbody></table>


                        </tbody></table>
                      </td>
                      </tr>


                      </tbody></table>'


              init={{
                height: 600,
                menubar: true,
                branding: false,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],

                toolbar1:
                  'print |template' +
                  'undo redo | formatselect | ' +
                  'bold italic backcolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help | template   ',

                template_preview_replace_values: {
                  preview_userfirstname: 'participant First Name',
                  preview_userlastname: 'participant Last Name',
                  preview_useraddress: 'participant Address',
                  preview_nationality: 'participant nationality ',
                  preview_gender: ' participant gender',
                },
                templates: [
                  // {
                  //   title: "Date modified example",
                  //   description:
                  //     "Adds a timestamp indicating the last time the document modified.",
                  //   content:
                  //     "<p>Last Modified: <time class="mdate">This will be replaced with the date modified.</time></p>",
                  // },
                  {
                    title: 'Participant first  name',
                    description: '',
                    content: '<span> {{userfirstname}} </span>',
                  },
                  {
                    title: 'Participant last name',
                    description: '',
                    content: '<span> {{userlastname}} </span>',
                  },
                  {
                    title: 'Participant address',
                    description: '',
                    content: '<span> {{useraddress}} </span>',
                  },
                  {
                    title: 'Participant nationality',
                    description: '',
                    content: '<span> {{nationality}} </span>',
                  },
                  {
                    title: 'Participant gender',
                    description: '',
                    content: '<span> {{nationality}} </span>',
                  },
                ],
              }}
            />
            <button onClick={log}>Log editor content</button>
          </ChatArea>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainDashboard;
