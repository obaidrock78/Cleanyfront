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
import { Divider, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { GET_BOOKING_DATA } from 'app/api';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import * as _ from 'lodash';

function EditBookingModal({ open, handleClose, serviceListAPI, bookindDetails }) {
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const params = useParams();

  useEffect(async () => {
    if (open) {
      await axios
        .get(`${GET_BOOKING_DATA}/${bookindDetails?.service?.slug}`)
        .then((res) => {
          setBookingData(res?.data?.data);
        })
        .catch((err) => console.log(err));
    }
  }, [bookindDetails, open]);

  const schema = Yup.object().shape({
    package_selection: Yup.string().required('Select minimum 1 package!'),
  });
  const formik = useFormik({
    initialValues: {
      package_selection: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const itemMapData = _.compact(selectedItems).map((item) => {
        return { item_id: item?.id, package: item?.packageData };
      });
      const extras = _.compact(selectedExtras);
      debugger;
      //   setLoading(true);
      //   toast.promise(
      //     axios.post(`${CREATE_BOOKING_ATTACHMENTS}`, formData, {
      //       headers: { 'Content-Type': 'application/json' },
      //     }),
      //     {
      //       loading: () => {
      //         return `Creating Attachment!`;
      //       },
      //       success: (res) => {
      //         setLoading(false);
      //         resetForm();
      //         serviceListAPI();
      //         setTimeout(() => {
      //           handleClose();
      //         }, 200);

      //         return res?.data?.message;
      //       },
      //       error: (err) => {
      //         setLoading(false);
      //         return err?.message;
      //       },
      //     }
      //   );
    },
  });

  const handleSelectPackageData = (value, index, packageData) => {
    const dupArr = [...selectedItems];
    dupArr[index] = value;

    if (value !== null) {
      dupArr[index].packageData = packageData?.id;
      setFieldValue('package_selection', value.title);
    } else if (!dupArr.some((iData) => iData?.id)) {
      setFieldValue('package_selection', '');
    }
    setSelectedItems(dupArr);
  };
  const handleExtrasClick = (data, index) => {
    const dupArr = [...selectedExtras];
    if (selectedExtras[index]?.quantity) {
      dupArr[index] = undefined;
      setSelectedExtras(dupArr);
    } else {
      dupArr[index] = { extra_id: data.id, quantity: 1, price: data?.price };
      setSelectedExtras(dupArr);
    }
  };
  const handleDecrement = (index) => {
    const dupArr = [...selectedExtras];
    if (dupArr[index].quantity > 1) {
      dupArr[index].quantity = dupArr[index].quantity - 1;
      setSelectedExtras(dupArr);
    }
  };
  const handleIncrement = (index) => {
    const dupArr = [...selectedExtras];
    dupArr[index].quantity = dupArr[index].quantity + 1;
    setSelectedExtras(dupArr);
  };

  const { errors, touched, resetForm, setFieldValue, handleSubmit, getFieldProps, values } = formik;
  useEffect(() => {
    setFieldValue('booking', +params?.id);
  }, []);

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
        <DialogTitle id="package-item" style={{ fontSize: '1.5rem' }}>
          Update B-{params?.id}
        </DialogTitle>
        <DialogContent>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
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
                        onChange={(e) => handleSelectPackageData(e.target.value, index, data)}
                        name="package_selection"
                        error={Boolean(touched.package_selection && errors.package_selection)}
                        helperText={touched.package_selection && errors.package_selection}
                      >
                        <MenuItem value={null}>None</MenuItem>
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
              <Divider sx={{ marginTop: '2rem', marginBottom: '1rem' }} />
              <Typography variant="h6" className="subHeadings">
                Extras
              </Typography>
              <Typography variant="body1" style={{ paddingBottom: '1rem' }}>
                Select the extras you require for your booking. Price per cleaning:
              </Typography>
              <Grid container spacing={5} sx={{ paddinTop: '1rem' }}>
                {bookingData?.extras?.length > 0 &&
                  bookingData?.extras.map((data, index) => (
                    <Grid item xs={4}>
                      <Box sx={{ width: '100%', height: '100%' }}>
                        <Box
                          sx={{
                            width: '100%',
                            height: '150px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            color: '#212529',
                            backgroundColor: selectedExtras[index]?.quantity
                              ? '#d3d9df'
                              : '#f8f9fa',
                            borderColor: selectedExtras[index]?.quantity ? '#d3d9df' : '#f8f9fa',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            '&:hover': {
                              backgroundColor: '#d3d9df',
                              borderColor: '#d3d9df',
                            },
                            '& h3': {
                              marginTop: '5px',
                              marginBottom: 'unset',
                            },
                          }}
                          onClick={() => handleExtrasClick(data, index)}
                        >
                          <Box
                            sx={{
                              width: '5rem',
                              height: '5rem',
                              borderRadius: '50%',
                              background: 'white',
                              border: '2px solid white',
                            }}
                          ></Box>
                          <h3>{data?.title}</h3>
                        </Box>
                        {selectedExtras[index]?.quantity && (
                          <Box
                            sx={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '10px',
                              backgroundColor: '#d3d9df',
                              borderColor: '#d3d9df',
                            }}
                          >
                            <RemoveCircleOutlineIcon
                              sx={{ cursor: 'pointer' }}
                              onClick={() => handleDecrement(index)}
                            />
                            <Box
                              sx={{
                                marginLeft: '5px',
                                marginRight: '5px',
                                width: '4rem',
                                textAlign: 'center',
                                background: 'white',
                                fontSize: '1rem',
                                border: '1px solid black',
                                borderRadius: '4px',
                              }}
                            >
                              {selectedExtras[index]?.quantity}
                            </Box>
                            <AddCircleOutlineIcon
                              sx={{ cursor: 'pointer' }}
                              onClick={() => handleIncrement(index)}
                            />
                          </Box>
                        )}
                      </Box>
                    </Grid>
                  ))}
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
                  Update
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

export default EditBookingModal;
