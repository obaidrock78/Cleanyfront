import { Box, Button, Grid, MenuItem, styled, TextField, Typography } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

import { useFormik, Form, FormikProvider } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
import axios from '../../../../axios';
import { UPDATE_SERVICE_PROVIDER } from 'app/api';
import { ImageUpload } from 'app/components/DropZone/ImageUpload';
import createNFTUpload from '../../../../assets/createNFTUpload.png';
import { useLocation, useNavigate } from 'react-router-dom';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
  '& .formMain': {
    borderTop: '1px solid #d5d1d1',
  },
  '& .heading': {
    marginTop: '1rem',
    marginBottom: '1rem',
    color: 'rgba(52, 49, 76, 1)',
  },
}));

function UpdateProvider() {
  const navigate = useNavigate();
  const { state } = useLocation();
  let formData = new FormData();
  const [loading, setLoading] = useState(false);

  const schema = Yup.object().shape({
    first_name: Yup.string().required('First name is required!'),
    last_name: Yup.string().required('Last name is required!'),
    password: Yup.string()
      .min(8, 'Password atleast 8 charachters long!')
      .required('Password is required!'),
    email: Yup.string().email('Enter proper email address!').required('Email is required!'),
    phone: Yup.string()
      .matches(/^\+[0-9]+$/, 'Must be only digits with +!')
      .required('Phone no is required!'),
    address: Yup.string().required('Address is required!'),
    city: Yup.string().required('City is required!'),
    state: Yup.string().required('State is required!'),
    zip_code: Yup.number('Zip Code is required!')
      .min(0, 'invalid Zip Code!')
      .required('Zip Code is required!')
      .nullable(),
    gender: Yup.string().required('Gender is required!'),
    language: Yup.string().required('Language is required!'),
    profile_picture: Yup.mixed()
      .required('Image is required!')
      .test('nft_picture', 'Unsupported File Format!', function (value) {
        if (value?.type) {
          return ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/svg'].includes(
            value?.type
          );
        }
        return true;
      }),
    time_zone: Yup.string().required('Timezone is required'),
  });

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      password: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: 'Florida',
      zip_code: '',
      gender: 'male',
      language: 'english',
      profile_picture: '',
      time_zone: '-6',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      formData.append('first_name', values?.first_name);
      formData.append('last_name', values?.last_name);
      formData.append('password', values?.password);
      formData.append('email', values?.email);
      formData.append('phone', values?.phone);
      formData.append('address', values?.address);
      formData.append('city', values?.city);
      formData.append('state', values?.state);
      formData.append('zip_code', values?.zip_code);
      formData.append('gender', values?.gender);
      formData.append('language', values?.language);
      console.log(typeof values?.profile_picture);
      if (typeof values?.profile_picture !== 'string') {
        formData.append('profile_picture', values?.profile_picture);
      }

      formData.append('time_zone', values?.time_zone);
      formData.append('id', state?.user_profile?.id);
      formData.append('user', state?.user_profile?.user);
      setLoading(true);
      toast.promise(
        axios.put(`${UPDATE_SERVICE_PROVIDER}`, formData, {
          headers: { 'Content-Type': 'application/json' },
        }),
        {
          loading: () => {
            return `Updating Service Provider!`;
          },
          success: (res) => {
            setLoading(false);
            setTimeout(() => {
              navigate('/dashboard/service-providers', { replace: true });
            }, 1000);

            return 'Service Provider Updated Successfully!';
          },
          error: (err) => {
            setLoading(false);
            return err?.message;
          },
        }
      );
    },
  });
  const {
    errors,
    touched,
    setFieldValue,
    handleSubmit,
    getFieldProps,
    values,
    handleChange,
    handleBlur,
  } = formik;

  useEffect(() => {
    setFieldValue('first_name', state?.user_profile?.first_name);
    setFieldValue('last_name', state?.user_profile?.last_name);
    setFieldValue('email', state?.email);
    setFieldValue('phone', state?.user_profile?.phone_number);
    setFieldValue('address', state?.user_profile?.address);
    setFieldValue('city', state?.user_profile?.city);
    setFieldValue('state', state?.user_profile?.state);
    setFieldValue('zip_code', state?.user_profile?.zip_code);
    setFieldValue('gender', state?.user_profile?.gender);
    setFieldValue('language', state?.user_profile?.language);
    setFieldValue('profile_picture', state?.user_profile?.profile_picture);
    setFieldValue('time_zone', state?.user_profile?.time_zone);
  }, []);

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Service Provider', path: '/dashboard/service-providers' },
            { name: 'All Service Providers', path: '/dashboard/service-providers' },
            { name: 'Update Service Provider' },
          ]}
        />
      </Box>

      <SimpleCard title="Update Service Provider">
        <Box className="formMain">
          <Typography variant="h5" className="heading">
            Account Information:
          </Typography>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    type="text"
                    label="First name*"
                    {...getFieldProps('first_name')}
                    error={Boolean(touched.first_name && errors.first_name)}
                    helperText={touched.first_name && errors.first_name}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    type="text"
                    label="Last name*"
                    {...getFieldProps('last_name')}
                    error={Boolean(touched.last_name && errors.last_name)}
                    helperText={touched.last_name && errors.last_name}
                  ></TextField>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    inputProps={{ readOnly: true }}
                    size="small"
                    fullWidth
                    type="text"
                    label="Email*"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <span style={{ fontSize: 'small' }}>
                    We'll never share your email with anyone else.
                  </span>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    autoComplete="off"
                    type="password"
                    label="Password*"
                    {...getFieldProps('password')}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    type="text"
                    label="Phone*"
                    {...getFieldProps('phone')}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                  ></TextField>
                </Grid>
              </Grid>
              <Typography variant="h5" className="heading">
                Personal Information:
              </Typography>
              <Grid container spacing={3}>
                <Grid item sm={12} xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    type="text"
                    label="Address*"
                    {...getFieldProps('address')}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                  <span style={{ fontSize: 'small' }}>
                    e.g.: Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09
                  </span>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    type="text"
                    label="City*"
                    {...getFieldProps('city')}
                    error={Boolean(touched.city && errors.city)}
                    helperText={touched.city && errors.city}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    type="text"
                    label="State*"
                    select
                    {...getFieldProps('state')}
                    error={Boolean(touched.state && errors.state)}
                    helperText={touched.state && errors.state}
                  >
                    <MenuItem value={'Florida'}>Florida</MenuItem>
                    <MenuItem value={'New York'}>New York</MenuItem>
                  </TextField>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    type="number"
                    label="Zip code*"
                    {...getFieldProps('zip_code')}
                    error={Boolean(touched.zip_code && errors.zip_code)}
                    helperText={touched.zip_code && errors.zip_code}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    size="small"
                    select
                    name="gender"
                    label="Gender"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.gender}
                    onChange={handleChange}
                    fullWidth
                    helperText={touched.gender && errors.gender}
                    error={Boolean(errors.gender && touched.gender)}
                  >
                    <MenuItem value={'Male'}>Male</MenuItem>
                    <MenuItem value={'Female'}>Female</MenuItem>
                    <MenuItem value={'Unspecified'}>Unspecified</MenuItem>
                  </TextField>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    size="small"
                    select
                    name="language"
                    label="Language"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.language}
                    onChange={handleChange}
                    fullWidth
                    helperText={touched.language && errors.language}
                    error={Boolean(errors.language && touched.language)}
                  >
                    <MenuItem value={'English'}>English</MenuItem>
                    <MenuItem value={'French'}>French</MenuItem>
                  </TextField>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    select
                    type="text"
                    label="Timezone*"
                    {...getFieldProps('time_zone')}
                    error={Boolean(touched.time_zone && errors.time_zone)}
                    helperText={touched.time_zone && errors.time_zone}
                  >
                    <MenuItem value={'-6'}>-6</MenuItem>
                    <MenuItem value={'+5'}>+5</MenuItem>
                  </TextField>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography gutterBottom variant="h6" component="div">
                    Profile Photo
                  </Typography>
                  <Typography variant="subtitle1">
                    File types supported: JPG, PNG, GIF, SVG, WEBM, TIFF, RAW, EPS. Max size: 5 MB
                  </Typography>
                  <ImageUpload
                    name="profile_picture"
                    Isvideo={false}
                    inputProps={{ accept: 'image/*' }}
                    src={values.profile_picture || createNFTUpload}
                    buttonProps={{
                      className: '!flex !justify-start !p-0 !py-4',
                    }}
                    onChange={(e, file) => {
                      setFieldValue(e, file);
                    }}
                    error={touched.profile_picture && Boolean(errors.profile_picture)}
                    helperText={touched.profile_picture && errors.profile_picture}
                  />
                </Grid>
              </Grid>

              <LoadingButton
                type="submit"
                color="primary"
                loading={loading}
                variant="contained"
                sx={{ mb: 2, mt: 3 }}
                fullWidth
              >
                Update
              </LoadingButton>
            </Form>
          </FormikProvider>
        </Box>
      </SimpleCard>

      <Toaster position="top-right" />
    </Container>
  );
}

export default UpdateProvider;