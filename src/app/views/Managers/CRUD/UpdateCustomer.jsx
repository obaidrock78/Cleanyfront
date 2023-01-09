import { Box, Grid, MenuItem, styled, TextField, Typography } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

import { useFormik, Form, FormikProvider } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
import axios from '../../../../axios';
import { ADMIN_SIDE_Update_CUSTOMER, GET_CUSTOMER_WITH_ID } from 'app/api';
import { ImageUpload } from 'app/components/DropZone/ImageUpload';
import createNFTUpload from '../../../../assets/createNFTUpload.png';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MuiColorInput } from 'mui-color-input';

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

function UpdateCustomer() {
  const params = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  let formData = new FormData();
  const [loading, setLoading] = useState(false);
  const [customerData, setCustomerData] = useState(null);

  useEffect(async () => {
    await axios
      .get(`${GET_CUSTOMER_WITH_ID}?user_id=${params?.id}`)
      .then((res) => {
        setCustomerData(res?.data?.data);
      })
      .catch((err) => console.log(err));
  }, [params?.id]);

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
    color: Yup.string().required('Color is required'),
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
      color: '#fff000',
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
      formData.append('role', 'Manager');
      if (typeof values?.profile_picture !== 'string') {
        formData.append('profile_picture', values?.profile_picture);
      }

      formData.append('time_zone', values?.time_zone);
      formData.append('id', customerData?.user_profile?.id);
      formData.append('user', customerData?.user_profile?.user);
      formData.append('color', values?.color);
      setLoading(true);
      toast.promise(
        axios.put(`${ADMIN_SIDE_Update_CUSTOMER}`, formData, {
          headers: { 'Content-Type': 'application/json' },
        }),
        {
          loading: () => {
            return `Updating Manager!`;
          },
          success: (res) => {
            setLoading(false);
            setTimeout(() => {
              navigate('/dashboard/managers', { replace: true });
            }, 1000);

            return 'Manager Updated Successfully!';
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
    setFieldValue('first_name', customerData?.user_profile?.first_name);
    setFieldValue('last_name', customerData?.user_profile?.last_name);
    setFieldValue('email', customerData?.email);
    setFieldValue('phone', customerData?.user_profile?.phone_number);
    setFieldValue('address', customerData?.user_profile?.address);
    setFieldValue('city', customerData?.user_profile?.city);
    setFieldValue('state', customerData?.user_profile?.state);
    setFieldValue('zip_code', customerData?.user_profile?.zip_code);
    setFieldValue('gender', customerData?.user_profile?.gender);
    setFieldValue('language', customerData?.user_profile?.language);
    setFieldValue(
      'profile_picture',
      `https://api-cleany-backend.herokuapp.com${customerData?.user_profile?.profile_picture}`
    );
    setFieldValue('time_zone', customerData?.user_profile?.time_zone);
    setFieldValue('color', customerData?.user_profile?.color);
  }, [customerData]);

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Managers', path: '/dashboard/managers' },
            { name: 'All Managers', path: '/dashboard/managers' },
            { name: state?.update_btn === true ? 'Manager Details' : 'Update Manager' },
          ]}
        />
      </Box>

      <SimpleCard title={state?.update_btn === true ? 'Manager Details' : 'Update Manager'}>
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
                    inputProps={{ readOnly: state?.update_btn === true ? true : false }}
                    label="First name*"
                    {...getFieldProps('first_name')}
                    error={Boolean(touched.first_name && errors.first_name)}
                    helperText={touched.first_name && errors.first_name}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    size="small"
                    inputProps={{ readOnly: state?.update_btn === true ? true : false }}
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
                    inputProps={{ readOnly: state?.update_btn === true ? true : false }}
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
                    inputProps={{ readOnly: state?.update_btn === true ? true : false }}
                    label="Phone*"
                    {...getFieldProps('phone')}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                  ></TextField>
                </Grid>
                <Grid item sm={12} xs={12}>
                  <MuiColorInput
                    format="hex"
                    size="small"
                    value={values.color}
                    error={Boolean(touched.color && errors.color)}
                    helperText={touched.color && errors.color}
                    onChange={(color) => setFieldValue('color', color)}
                    fullWidth
                  />
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
                    inputProps={{ readOnly: state?.update_btn === true ? true : false }}
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
                    inputProps={{ readOnly: state?.update_btn === true ? true : false }}
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
                    inputProps={{ readOnly: state?.update_btn === true ? true : false }}
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
                    inputProps={{ readOnly: state?.update_btn === true ? true : false }}
                    label="Zip code*"
                    {...getFieldProps('zip_code')}
                    error={Boolean(touched.zip_code && errors.zip_code)}
                    helperText={touched.zip_code && errors.zip_code}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    size="small"
                    inputProps={{ readOnly: state?.update_btn === true ? true : false }}
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
                    inputProps={{ readOnly: state?.update_btn === true ? true : false }}
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
                    inputProps={{ readOnly: state?.update_btn === true ? true : false }}
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
              {state?.update_btn === true ? null : (
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
              )}
            </Form>
          </FormikProvider>
        </Box>
      </SimpleCard>

      <Toaster position="top-right" />
    </Container>
  );
}

export default UpdateCustomer;
