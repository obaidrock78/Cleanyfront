import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import { Button, Grid, IconButton, styled } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import StatCards from './shared/StatCards';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { TabPanel } from '@mui/lab'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import SecondTab from './tabsPane/secondTab';
import Chat from './tabsPane/thirdTab';
import Scheduler from './tabsPane/firstTab';
import axios from '../../../axios';
import { BOOKING_NOTIFICATION } from 'app/api';
import ReactWeather, { useWeatherBit } from 'react-open-weather';

const StylesTabsArea = styled(Box)(({ theme }) => ({
  p: 3,
  width: '100%',
  typography: 'body1',
  height: '510px',
  background: theme.palette.background.paper,
  boxShadow: '0px 3px 3px -2px rgb(0 0 0 / 6%),0px 3px 4px 0px rgb(0 0 0 / 4%),0px 1px 8px 0px rgb(0 0 0 / 4%)!important',
  borderRadius: '10px'
}));
const ChatArea = styled(Box)(({ theme }) => ({
  p: 3,
  width: '100%',
  typography: 'body1',
  height: '100%',
  background: theme.palette.background.paper,
  boxShadow: '0px 3px 3px -2px rgb(0 0 0 / 6%),0px 3px 4px 0px rgb(0 0 0 / 4%),0px 1px 8px 0px rgb(0 0 0 / 4%)!important',
  borderRadius: '10px'
}));

const EasyAccess = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '300px',
  background: theme.palette.background.paper,
  boxShadow: '0px 3px 3px -2px rgb(0 0 0 / 6%),0px 3px 4px 0px rgb(0 0 0 / 4%),0px 1px 8px 0px rgb(0 0 0 / 4%)!important',
  borderRadius: '10px',
  padding: "10px"
}));

const EasyAccessHeading = styled('h3')(({ theme }) => ({

  typography: 'body1',
  color: theme.palette.text.secondary,
  borderBottom: '1px solid',
  borderBottomColor: theme.palette.text.secondary
}))

const EasyAccessContent = styled(Box)(({ theme }) => ({
  overflowY: 'scroll',
  height: '200px'
}))

const Notifications = styled(Box)(({ theme }) => ({

  width: '100%',
  height: '200px',
  background: theme.palette.background.paper,
  boxShadow: '0px 3px 3px -2px rgb(0 0 0 / 6%),0px 3px 4px 0px rgb(0 0 0 / 4%),0px 1px 8px 0px rgb(0 0 0 / 4%)!important',
  borderRadius: '10px',
  padding: "10px",
  marginBottom: '10px'
}));

const NotificationsHeading = styled('h3')(({ theme }) => ({

  typography: 'body1',
  color: theme.palette.text.secondary,
  borderBottom: '1px solid',
  borderBottomColor: theme.palette.text.secondary
}))


const NotificationsContent = styled(Box)(({ theme }) => ({
  overflowY: 'scroll',
  height: '100px'

}))

const Weather = styled(Box)(({ theme }) => ({

  width: '100%',
  height: '100%',
  background: theme.palette.background.paper,
  boxShadow: '0px 3px 3px -2px rgb(0 0 0 / 6%),0px 3px 4px 0px rgb(0 0 0 / 4%),0px 1px 8px 0px rgb(0 0 0 / 4%)!important',
  borderRadius: '10px',
  padding: "10px",
  marginBottom: '10px'
}));

const WeatherHeading = styled('h3')(({ theme }) => ({

  typography: 'body1',
  color: theme.palette.text.secondary,
  borderBottom: '1px solid',
  borderBottomColor: theme.palette.text.secondary
}))


const WeatherContent = styled(Box)(({ theme }) => ({
  overflowY: 'scroll',
  height: '500px'

}))
const easyAccessContentItems = [
  { link: 'Create Customer', color: '#206bc4' },
  { link: 'Create Booking', color: '#206bc4' },
  { link: 'Google Chat', color: '#0b956c' },
  { link: 'Nextiva', color: '#daa520' },
  { link: 'Yelp', color: '#ff0000' },
  { link: 'Google Business', color: '#228b22' },
  { link: 'Last Pass', color: '#808080' },
  { link: 'Stripe', color: '#800080' },
  { link: "Banking", color: '#8b0000' }
]




const MainDashboard = () => {
  const { data, isLoading, errorMessage } = useWeatherBit({
    key: 'ac69bc70043f4c47aec73dfd3a19007e',
    lat: '27.6648',
    lon: '81.5158',
    lang: 'en',
    unit: 'metric',
  });
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getNotification()
  }, [])
  const getNotification = async () => {
    await axios

      .get(`${BOOKING_NOTIFICATION}`)
      .then((res) => {

        const dataToMap = res?.data?.data
        setBookingNotification(dataToMap);
      })
      .catch((err) => console.log(err));
  }
  const [bookingNotification, setBookingNotification] = React.useState()
  console.log(bookingNotification)
  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={3} rowSpacing={2}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <StatCards />
        </Grid>
        <Grid item lg={9} md={9} sm={12} xs={12} >
          <StylesTabsArea >
            <Scheduler />
          </StylesTabsArea>
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12}>
          <Notifications >
            <NotificationsHeading>
              Notification's
            </NotificationsHeading>
            <NotificationsContent>
              {bookingNotification?.map((items) => {
                return (
                  <p>
                    {
                      items.title
                    }
                  </p>
                )
              })}
            </NotificationsContent>
          </Notifications>
          <EasyAccess >
            <EasyAccessHeading>
              Easy Access
            </EasyAccessHeading>
            <EasyAccessContent>
              {easyAccessContentItems.map((items) => {
                return (
                  <Box component={'p'} sx={{
                    backgroundColor: items.color,
                    color: 'white',
                    fontWeight: 900,
                    fontSize: '19px',
                    py: 1,
                    pl: 1,
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    backdropFilter: ' blur(11.3px)',
                    border: '1px solid rgba(255, 255, 255, 0.4)'
                  }}>
                    {
                      items.link
                    }
                  </Box>
                )
              })}
            </EasyAccessContent>
          </EasyAccess>
        </Grid>
        <Grid item lg={9} md={9} sm={12} xs={12} >
          <StylesTabsArea>
            <SecondTab />
          </StylesTabsArea>
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12} >
          <Weather >
            <WeatherHeading>
              Weather
            </WeatherHeading>
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
    </Box >
  )
}

export default MainDashboard