import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import toast, { Toaster } from 'react-hot-toast';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import { DialogActions, Divider, Grid, MenuItem, TextField, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function StepThree({
  open,
  handleClose,
  handleFormData,
  formData,
  handleReset,
  setStepTwo,
  setStepFour,
}) {
  const [validated, setValidated] = useState(true);

  const handleNext = () => {
    setStepFour(true);
    handleClose();
    if (validateVendorForm()) {
    }
  };

  var validEmailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validateVendorForm = () => {
    if (formData.email == '' || formData.email.match(validEmailRegex) == null) {
      setValidated(false);
      return false;
    }
    setValidated(true);
    return true;
  };
  return (
    <>
      <Dialog
        open={open}
        maxWidth={'md'}
        PaperProps={{
          sx: {
            width: '100%',
          },
        }}
        aria-labelledby="package-item"
        aria-describedby="package-item-description"
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '1.5rem',
            backgroundColor: '#1D60B0',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'white', fontSize: '1.25rem' }}>
            <BookOutlinedIcon
              sx={{
                fill: 'white',
                width: '70px',
                height: '70px',
                transform: 'rotate(-10deg)',
                marginRight: '2rem',
              }}
            />
            <Box
              sx={{
                '& h1': {
                  fontSize: '1.25rem',
                  fontWeight: '500',
                },
                '& span': {
                  fontSize: '1.4rem',
                  fontWeight: 'bold',
                },
              }}
            >
              <Typography variant="h1">Create a new Booking</Typography>
              <Typography variant="h1">
                <span>Step 3 of 6</span> Booking Details
              </Typography>
            </Box>
          </Box>
          <CloseIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              handleReset();
              handleClose();
            }}
          />
        </Box>
        <Box
          sx={{
            padding: '1.5rem 2rem',
            '& h3': {
              margin: 'unset',
              paddingBottom: '5px',
            },
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              '& p': {
                margin: 'unset',
              },
            }}
          >
            <Grid item xs={6}>
              <p>Deep Clean Hours</p>
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                id="outlined-select-currency"
                select
                fullWidth
                name="deep_clean_hours"
                inputProps={{ placeholder: 'Select deep clean hours' }}
                value={formData?.deep_clean_hours}
                onChange={(e) => handleFormData(e.target.name, e.target.value)}
              >
                <MenuItem value={'2 Hours (1 Cleaner)'}>2 Hours (1 Cleaner)</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <p>Rooms</p>
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                id="outlined-select-currency"
                select
                fullWidth
                name="rooms"
                inputProps={{ placeholder: 'Select rooms' }}
                value={formData?.rooms}
                onChange={(e) => handleFormData(e.target.name, e.target.value)}
              >
                <MenuItem value={'Studio'}>Studio</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <p>Bathrooms</p>
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                id="outlined-select-currency"
                select
                fullWidth
                name="bath_rooms"
                inputProps={{ placeholder: 'Select bathrooms' }}
                value={formData?.bath_rooms}
                onChange={(e) => handleFormData(e.target.name, e.target.value)}
              >
                <MenuItem value={'1 Bathroom'}>1 Bathroom</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <p>Square Feet</p>
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                id="outlined-select-currency"
                select
                fullWidth
                name="square_feet"
                inputProps={{ placeholder: 'Select square feet' }}
                value={formData?.square_feet}
                onChange={(e) => handleFormData(e.target.name, e.target.value)}
              >
                <MenuItem value={'<1000 Sq Ft'}>{'<1000 Sq Ft'}</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Box>
        <DialogActions
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '2rem',
            '& button': {
              fontSize: '1rem',
            },
          }}
        >
          <Box></Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ArrowBackIcon />}
              onClick={() => {
                setStepTwo(true);
                handleClose();
              }}
              sx={{ marginRight: '1rem' }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              endIcon={<ArrowForwardIcon />}
              onClick={() => handleNext()}
            >
              Next
            </Button>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleReset();
              handleClose();
            }}
          >
            Cancel
          </Button>
        </DialogActions>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0.5rem 2rem 1.5rem 2rem',
            backgroundColor: '#1D60B0',
            '& h3': {
              margin: 'unset',
              color: 'white',
              fontWeight: 'bold',
              paddingBottom: '5px',
            },
            '& p': {
              color: 'white',
              margin: 'unset',
            },
          }}
        >
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <h3>Service: Cleany Miami - Custom Hourly</h3>
              <Grid container>
                <Grid item xs={10}>
                  <p>Minimum Time:</p>
                  <p>Maximum Price:</p>
                  <p>Base Time:</p>
                  <p>Base Price:</p>
                  <p>People:</p>
                </Grid>
                <Grid item xs={2}>
                  <p>0(hrs)</p>
                  <p>$0.00</p>
                  <p>0(hrs)</p>
                  <p>$0.00</p>
                  <p>1</p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={10}>
                  <p>Packages:</p>
                  <p>Discounts:</p>
                  <p>Extras:</p>
                  <p>Taxes:</p>
                  <p>Total:</p>
                </Grid>
                <Grid item xs={2}>
                  <p>$279.0</p>
                  <p>$0.00</p>
                  <p>$0.00</p>
                  <p>$19.53</p>
                  <p>$298.53</p>
                </Grid>
              </Grid>
              <Divider sx={{ borderColor: 'white', marginTop: '0.5rem', marginBottom: '0.5rem' }} />

              <Grid container>
                <Grid item xs={10}>
                  <p>Time Required(hrs):</p>
                </Grid>
                <Grid item xs={2}>
                  <p>5</p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Toaster position="top-right" />
      </Dialog>
    </>
  );
}

export default StepThree;
