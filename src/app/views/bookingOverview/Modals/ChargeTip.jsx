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
import { Grid, TextField } from '@mui/material';
import { CHARGE_TIP_FROM_CUSTOMER } from 'app/api';

function ChargeTipModal({ open, handleClose, bookindDetails, getEventList }) {
  const [loading, setLoading] = useState(false);

  const schema = Yup.object().shape({
    amount: Yup.number().required('Amount is Required').min(1),
  });
  const formik = useFormik({
    initialValues: {
      id: bookindDetails?.id,
      amount: null,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      setLoading(true);
      toast.promise(
        axios.post(`${CHARGE_TIP_FROM_CUSTOMER}`, values, {
          headers: { 'Content-Type': 'application/json' },
        }),
        {
          loading: () => {
            return `Charging Tip!`;
          },
          success: (res) => {
            setLoading(false);
            resetForm();
            getEventList();
            setTimeout(() => {
              handleClose();
            }, 200);

            return res?.data?.message;
          },
          error: (err) => {
            setLoading(false);
            return err?.message;
          },
        }
      );
    },
  });

  const { errors, touched, resetForm, setFieldValue, handleSubmit, getFieldProps, values } = formik;
  useEffect(() => {
    setFieldValue('booking_id', bookindDetails?.id);
  }, [bookindDetails, open]);

  return (
    <>
      <Dialog
        open={open}
        maxWidth={'sm'}
        PaperProps={{
          sx: {
            width: '100%',
          },
        }}
        aria-labelledby="package-item"
        aria-describedby="package-item-description"
      >
        <DialogTitle id="package-item" style={{ fontSize: '1.5rem' }}>
          Charge Tip from Customer
        </DialogTitle>
        <DialogContent>
          Do you want to charge tip from the customer or record a collection?
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Grid container spacing={4} sx={{ marginTop: '2px' }}>
                <Grid item xs={4}>
                  Total Tip Amount
                </Grid>
                <Grid item sm={8} xs={8}>
                  <TextField
                    inputProps={{ min: 0 }}
                    size="small"
                    type="number"
                    {...getFieldProps('amount')}
                    sx={{ width: '100%' }}
                    error={Boolean(touched.amount && errors.amount)}
                    helperText={touched.amount && errors.amount}
                  ></TextField>
                </Grid>
              </Grid>

              <Box
                display={'flex'}
                alignItems="center"
                justifyContent={'end'}
                sx={{ mb: 2, mt: 3 }}
              >
                <Button
                  onClick={() => {
                    handleClose();
                    resetForm();
                  }}
                  variant="outlined"
                  color="primary"
                  sx={{ mr: 2 }}
                >
                  Cancel
                </Button>
                <LoadingButton type="submit" color="primary" loading={loading} variant="contained">
                  Charge Now
                </LoadingButton>
              </Box>
            </Form>
          </FormikProvider>
        </DialogContent>
        <Toaster position="top-right" />
      </Dialog>
    </>
  );
}

export default ChargeTipModal;
