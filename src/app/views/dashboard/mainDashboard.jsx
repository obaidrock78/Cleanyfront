import React from 'react'
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


const StylesTabsArea = styled(Box)(({ theme }) => ({
  p: 3,
  width: '100%',
  typography: 'body1',
  height: '725px',
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

const Notifications = styled(Box)(({ theme }) => ({
  marginTop: "20px",
  width: '100%',
  height: '200px',
  background: theme.palette.background.paper,
  boxShadow: '0px 3px 3px -2px rgb(0 0 0 / 6%),0px 3px 4px 0px rgb(0 0 0 / 4%),0px 1px 8px 0px rgb(0 0 0 / 4%)!important',
  borderRadius: '10px',
  padding: "10px"
}));

const NotificationsHeading = styled('h3')(({ theme }) => ({

  typography: 'body1',
  color: theme.palette.text.secondary,
  borderBottom: '1px solid',
  borderBottomColor: theme.palette.text.secondary
}))

const EasyAccessContent = styled(Box)(({ theme }) => ({
  overflowY: 'scroll',
  height: '200px'
}))
const NotificationsContent = styled(Box)(({ theme }) => ({
  overflowY: 'scroll',
  height: '100px'

}))
const easyAccessContentItems = [
  { link: 'Create Customer', color: 'red' },
  { link: 'Create Booking', color: 'yellow' },
  { link: 'Google Chat', color: 'orange' },
  { link: 'Nextiva', color: 'blue' },
  { link: 'Yelp', color: 'green' },
  { link: 'Google Business', color: 'yellow' },
  { link: 'Last Pass', color: 'lightgreen' },
  { link: 'Stripe', color: 'red' },
  { link: "Banking", color: 'red' }
]
const notifications = [
  {
    id: 1,
    notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
  },
  {
    id: 1,
    notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
  }, {
    id: 1,
    notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
  }, {
    id: 1,
    notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
  }, {
    id: 1,
    notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
  }, {
    id: 1,
    notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
  }, {
    id: 1,
    notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
  }, {
    id: 1,
    notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
  }, {
    id: 1,
    notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
  }, {
    id: 1,
    notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
  }, {
    id: 1,
    notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
  }, {
    id: 1,
    notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
  }, {
    id: 1,
    notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
  }, {
    id: 1,
    notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
  }, {
    id: 1,
    notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
  }, {
    id: 1,
    notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
  }, {
    id: 1,
    notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
  }, {
    id: 1,
    notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
  }, {
    id: 1,
    notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
  },
]



const MainDashboard = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={3} rowSpacing={2}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <StatCards />
        </Grid>

        <Grid item lg={8} md={8} sm={12} xs={12} >

          <StylesTabsArea >
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Your Scheduling Overview" value="1" />
                  <Tab label="Tasks" value="2" />
                  <Tab label="Chats" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Scheduler />
              </TabPanel>
              <TabPanel value="2">
                <SecondTab />
              </TabPanel>
              <TabPanel value="3">
                <Chat />
              </TabPanel>
            </TabContext>
          </StylesTabsArea>
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12} >
          <Grid container>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <EasyAccess >
                <EasyAccessHeading>
                  Easy Access

                </EasyAccessHeading>
                <EasyAccessContent>
                  {easyAccessContentItems.map((items) => {
                    return (
                      <p style={{ backgroundColor: items.color }}>
                        {
                          items.link
                        }
                      </p>
                    )
                  })}
                </EasyAccessContent>
              </EasyAccess>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} >
              <Notifications >
                <NotificationsHeading>
                  Notification's
                </NotificationsHeading>
                <NotificationsContent>
                  {notifications.map((items) => {
                    return (
                      <p>
                        {
                          items.notifications
                        }
                      </p>
                    )
                  })}
                </NotificationsContent>
              </Notifications>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} >
              <Notifications >
                <NotificationsHeading>
                  Weather
                </NotificationsHeading>
                <NotificationsContent>

                </NotificationsContent>
              </Notifications>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box >
  )
}

export default MainDashboard