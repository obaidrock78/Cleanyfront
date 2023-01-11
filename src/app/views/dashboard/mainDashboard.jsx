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
import { BOOKING_NOTIFICATION, COMPANY_PROFILE_DATA, EMAIL_TEMPLATE } from 'app/api';
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
  marginTop: 'unset',
  paddingBottom: '10px',
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
  marginTop: 'unset',
  paddingBottom: '10px',
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
  marginTop: 'unset',
  paddingBottom: '10px',
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
  marginTop: 'unset',
  paddingBottom: '10px',
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

  const post_email_template_type = async (data) => {
    await axios.post(`${EMAIL_TEMPLATE}`, {
      subject: 'string',
      body: data,
      email_type: 'Confirmation',
    });
  };
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      post_email_template_type(editorRef.current.getContent());
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
                          primary={`${items.title} (Obaid)`}
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
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={''}
              init={{
                height: 600,
                menubar: true,
                branding: false,
                plugins: [
                  'template',
                  'advlist',
                  'autolink',
                  'lists',
                  'link',
                  'image',
                  'charmap',
                  'preview',
                  'anchor',
                  'searchreplace',
                  'visualblocks',
                  'code',
                  'fullscreen',
                  'insertdatetime',
                  'media',
                  'table',
                  'code',
                  'help',
                  'wordcount',
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
                  {
                    title: 'Participant bill',
                    description: '',
                    content: '<span> {{bill}} </span>',
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
