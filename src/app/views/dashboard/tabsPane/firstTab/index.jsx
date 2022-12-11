import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { GET_BOOKING_DASHBOARD } from '../../../../api'
import axios from '../../../../../axios'
import moment from 'moment';
import { Box, Chip, Grid, Icon, Stack, Typography } from '@mui/material';

const GetDayFormDate = (date) => {
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let d = new Date(date);
  let dayName = days[d.getDay()];
  return dayName
}
function Scheduler() {
  const [events, setEvents] = useState()
  const currentDate = new Date().toJSON().slice(0, 10)
  React.useEffect(() => { getEvents() }, [])
  const getEvents = async () => {
    await axios
      .get(`${GET_BOOKING_DASHBOARD}?start_date=${currentDate}`)
      .then((res) => {

        const dataToMap = res?.data?.data
        setEvents(dataToMap);
      })
      .catch((err) => console.log(err));
  }
  return (
    <Box>
      <Typography sx={{ fontWeight: 900, fontSize: '20px', textAlign: 'center', mb: 4, py: 2 }}>
        Your Scheduling Overview
      </Typography>
      <Grid container>
        {events?.slice(0, 5)?.map((ele) => {
          return (
            <Grid item md={2.4} textAlign="center">
              <Typography component={'h2'} variant="h3" color='darkgray' sx={{ fontWeight: 900, fontSize: '29px' }}>
                {GetDayFormDate(ele.value)}
              </Typography>
              <Box>
                {ele.data.length > 0 ? <>  <p>{ele.data.length} Bookings </p>  </> : <p>No Bookings</p>}
              </Box>
              {ele?.data?.map((e) => {
                return (
                  <>
                    {currentDate === ele.value ?
                      <>
                        <Box sx={{ textAlign: 'left' }} >
                          <Box sx={{ display: 'flex', justifyContent: 'space-evenly', py: 3, }}>
                            <Icon sx={{ fontSize: '50px' }}>
                              woman
                            </Icon>
                            <Box >
                              <Typography sx={{ display: 'flex', py: '2px' }}>
                                <Icon sx={{ pr: 2 }}>  alarm</Icon>  {moment(e.bod.start_time, "hh").format('LT')} - {e.bod.total_hours}(Hours)
                              </Typography>
                              <Typography sx={{ display: 'flex', py: '2px' }}>
                                <Icon sx={{ pr: 2 }} >public</Icon>{e.id}
                              </Typography>
                              <Stack>
                                <Box sx={{ bgcolor: 'blue', px: '10px', borderRadius: '20px', color: 'white' }}>
                                  {e.status}
                                </Box>
                              </Stack>
                            </Box>

                          </Box>
                        </Box>
                      </> :
                      <>
                        <Box component="span" sx={{ bgcolor: 'blue', px: '10px', borderRadius: '20px', color: 'white' }}>
                          {moment(e.bod.start_time, "hh").format('LT')}
                        </Box>
                      </>
                    }

                  </>
                )
              })}
            </Grid>
          )
        })}
      </Grid>
    </Box >
  )
}

export default Scheduler
