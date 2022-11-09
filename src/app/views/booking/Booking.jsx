import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  MenuItem,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { GET_BOOKING_DATA } from 'app/api';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../axios';
import LoginIcon from '@mui/icons-material/Login';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Logo from '../../../assets/logo.png';
import CoverImage from '../../../assets/coverImage.png';

const MainBox = styled(Box)(({ theme }) => ({
  '& .topHeader': {
    position: 'fixed',
    width: '100%',
    backgroundColor: '#3498db',
    '& .signInBtn': {
      color: 'white',
      fontSize: '1rem',
      fontWeight: '600',
    },
    '& .bodyTxt': {
      color: 'white',
      paddingRight: '0.3rem',
    },
  },
  '& .secondHeader': {
    position: 'fixed',
    width: '100%',
    backgroundColor: 'rgb(52 152 219 / 50%);',
    top: '40px',
    padding: '10px',
    '& .logoContainer': {
      '& img': {
        width: '200px',
      },
    },
    '& .btn1': {
      color: 'white',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginRight: '10px',
    },
  },
  '& .contentMain': {
    paddingTop: '10rem',
    '& .bookingTitle': {
      textAlign: 'center',
      fontWeight: 'bold',
      paddingBottom: '1rem',
      paddingTop: '1rem',
    },
    '& .coverImage': {
      width: '100%',
    },
    '& .tell-us': {},
    '& .subHeadings': {
      fontWeight: 'bold',
      fontSize: '1.4rem',
      paddingTop: '1rem',
      paddingBottom: '1rem',
    },
  },
}));

function Booking() {
  const params = useParams();
  const [bookingData, setBookingData] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(async () => {
    await axios
      .get(`${GET_BOOKING_DATA}/${params?.slug}`)
      .then((res) => setBookingData(res?.data?.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSelectPackageData = (value, index) => {
    const dupArr = [...selectedItems];
    dupArr[index] = value;
    setSelectedItems(dupArr);
  };
  return (
    <MainBox>
      <Box className="topHeader">
        <Container maxWidth="lg">
          <Box display={'flex'} alignItems="center" justifyContent={'space-between'}>
            <Button variant="text" startIcon={<LoginIcon />} className="signInBtn">
              Customer Sign in
            </Button>
            <Box display={'flex'} alignItems="center">
              <Box display={'flex'} alignItems="center">
                <PhoneIcon className="bodyTxt" />
                <Typography variant="body1" className="bodyTxt">
                  +12128516134
                </Typography>
              </Box>
              <Box display={'flex'} alignItems="center" sx={{ marginLeft: '1rem' }}>
                <EmailIcon className="bodyTxt" />
                <Typography variant="body1" className="bodyTxt">
                  support@bookcleany.com
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      <Box className="secondHeader">
        <Container maxWidth="lg">
          <Box display={'flex'} alignItems="center" justifyContent={'space-between'}>
            <Box className="logoContainer">
              <img src={Logo} alt="logo" className="logoImg" />
            </Box>
            <Box display={'flex'} alignItems="center">
              <Button variant="text" className="btn1">
                Book Now
              </Button>
              <Button variant="text" className="btn1">
                Contact Us
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="lg" className="contentMain">
        <Grid container columnSpacing={5}>
          <Grid item xs={9}>
            <Box
              sx={{
                background: 'white',
                padding: '1rem',
                paddingTop: '2rem',
                width: '100%',
                height: '100%',
                border: '1px solid #dddada',
              }}
            >
              <Typography variant="h4" className="bookingTitle">
                {bookingData?.title}
              </Typography>
              <img src={CoverImage} alt="cover-image" className="coverImage" />
              <Typography variant="h4" className="bookingTitle">
                Booking in just 60 seconds!
              </Typography>
              <Divider />
              <Box className="tell-us">
                <Typography variant="h6" className="subHeadings">
                  Tell us about your cleaning
                </Typography>
                <Grid container spacing={3}>
                  {bookingData?.packages?.length > 0 &&
                    bookingData?.packages?.map((data, index) => (
                      <Grid item xs={12} md={6} lg={4}>
                        <TextField
                          fullWidth
                          type="text"
                          label={`${data?.title}*`}
                          select
                          value={selectedItems[index]}
                          onChange={(e) => handleSelectPackageData(e.target.value, index)}
                        >
                          <MenuItem value={0}>None</MenuItem>
                          {data?.item?.length > 0 &&
                            data?.item?.map((item) => (
                              <MenuItem value={item}>
                                {item?.title} ${item?.price}
                              </MenuItem>
                            ))}
                        </TextField>
                      </Grid>
                    ))}
                </Grid>
                <Divider sx={{ marginTop: '2rem' }} />
                <Typography variant="h6" className="subHeadings">
                  Extras
                </Typography>
                <Typography variant="body1">
                  Select the extras you require for your booking. Price per cleaning:
                </Typography>
                <Divider sx={{ marginTop: '2rem' }} />
                <Typography variant="h6" className="subHeadings">
                  Choose your frequency
                </Typography>
                <Typography variant="body1">
                  You can always adjust the frequency, reschedule, or postpone cleanings.
                </Typography>
                <Divider sx={{ marginTop: '2rem' }} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ position: 'sticky', top: '8rem' }}>dfg</Box>
          </Grid>
        </Grid>
      </Container>
    </MainBox>
  );
}

export default Booking;
