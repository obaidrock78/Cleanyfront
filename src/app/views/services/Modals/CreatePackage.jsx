import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import toast, { Toaster } from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/system';
import axios from '../../../../axios';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { Grid, TextField, Tooltip } from '@mui/material';
import { CREATE_EXTRA, UPDATE_EXTRA } from 'app/api';

function CreatePackageModal({ open, handleClose, serviceData, retrieveService, selectedExtra }) {
  const defaultFormData = {
    items: [
      {
        title: '',
        time_hrs: null,
        price: null,
        discount_percent: null,
      },
    ],
    title: '',
    front_end_field_type: 'select',
    service: serviceData?.id,
  };
  const [formData, setFormData] = useState(defaultFormData);
  const [validated, setValidated] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log(formData);
    }
  };
  const validateForm = () => {
    if (
      formData.title == '' ||
      formData.front_end_field_type == '' ||
      formData.front_end_field_type == undefined ||
      formData.items.some(
        (data) =>
          data.title == '' ||
          data.time_hrs == '' ||
          data.time_hrs == null ||
          data.price == '' ||
          data.price == null ||
          data.discount_percent == '' ||
          data.discount_percent == null 
      )
    ) {
      setValidated(false);
      return false;
    }
    setValidated(true);
    return true;
  };
  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose();
      }}
      maxWidth={'sm'}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" style={{ fontSize: '1.5rem' }}>
        Add new package
      </DialogTitle>
      <DialogContent>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3} sx={{ marginTop: '2px' }}>
            <Grid item sm={12} xs={12}>
              <TextField
                size="small"
                fullWidth
                type="text"
                label="Title"
                value={formData.title}
                onChange={(e)=>}
                error={!validated && formData.title == ''}
                helperText={!validated && formData.title == '' ? 'Title is Required' : ''}
                sx={{
                  '& input': {
                    textAlign: 'center',
                  },
                }}
              />
            </Grid>
          </Grid>

          <Box display={'flex'} alignItems="center" justifyContent={'end'} sx={{ mb: 2, mt: 3 }}>
            <Button
              onClick={() => {
                handleClose();
              }}
              variant="outlined"
              color="primary"
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
            <LoadingButton type="submit" color="primary" loading={loading} variant="contained">
              Add Package
            </LoadingButton>
          </Box>
        </form>
      </DialogContent>
      <Toaster position="top-right" />
    </Dialog>
  );
}

export default CreatePackageModal;
