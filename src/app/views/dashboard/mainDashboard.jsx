import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { Grid, styled, Button, responsiveFontSizes } from '@mui/material';
import StatCards from './tabsPane/StatsCard/StatCards';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AddTask from './tabsPane/AddTask';
import Chat from './tabsPane/Chat';
import Scheduler from './tabsPane/Scheduler';
import axios from '../../../axios';
import { BOOKING_NOTIFICATION } from 'app/api';
import ReactWeather, { useWeatherBit } from 'react-open-weather';

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

  borderTop: '5px solid blue',
}));

const EasyAccess = styled(Box)(({ theme }) => ({
  width: '100%',

  borderTop: '5px solid blue',
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
  fontSize: '24px !important'
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

  borderTop: '5px solid blue',
}));

const NotificationsHeading = styled('h3')(({ theme }) => ({
  typography: 'body1',
  color: 'black',
  borderBottom: '1px solid',
  borderBottomColor: theme.palette.text.secondary,
  textAlign: 'center',
  fontWeight: '900 !important',
  fontSize: '24px !important'
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

  borderTop: '5px solid blue',
}));

const WeatherHeading = styled('h3')(({ theme }) => ({
  typography: 'body1',
 color:'black',
  borderBottom: '1px solid',
  borderBottomColor: theme.palette.text.secondary,
  textAlign: 'center',
  fontWeight: '900 !important',
  fontSize: '24px !important'
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
  borderTop: '5px solid blue',
}));
const StatHeading = styled('h3')(({ theme }) => ({
  typography: 'body1',
 color:'black',
  borderBottom: '1px solid',
  borderBottomColor: theme.palette.text.secondary,
  textAlign: 'center',
  fontWeight: '900 !important',
  fontSize: '24px !important'
}));

const easyAccessContentItems = [
  { link: '#', text: 'Create Customer', color: '#206bc4' },
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

  const { data, isLoading, errorMessage } = useWeatherBit({
    key: 'ac69bc70043f4c47aec73dfd3a19007e',
    lat: '27.6648',
    lon: '81.5158',
    lang: 'en',
    unit: 'metric',
  });

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
            <NotificationsHeading>Notification's</NotificationsHeading>
            <NotificationsContent>
              {bookingNotification?.map((items) => {
                return <p>{items.title}</p>;
              })}
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
                              color: 'black'
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
          <StylesTabsArea>
            <AddTask />
          </StylesTabsArea>
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Weather>
            <WeatherHeading>Weather</WeatherHeading>
            <WeatherContent>
              <ReactWeather
                isLoading={isLoading}
                errorMessage={errorMessage}
                data={data}
                lang="en"
                locationLabel="Munich"
                unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
                showForecast
              />
            </WeatherContent>
          </Weather>
        </Grid>

        <Grid item md={12}>
          <ChatArea>
            <Chat />
          </ChatArea>
        </Grid>

      </Grid>
    </Box>
  );
};

export default MainDashboard;
