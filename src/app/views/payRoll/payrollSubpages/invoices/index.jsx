import { Box, Button, MenuItem, Pagination, TextField, Typography } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import React, { useEffect, useState } from 'react';
import axios from '../../../../../axios';
import { BOOKING_APPOINTMENT_DETAILS, LIST_BOOKING } from 'app/api';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import moment from 'moment';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import GenerateInvoice from 'app/views/bookingOverview/Modals/GenerateInvoice';

const Container = styled('div')(({ theme }) => ({
  overflowX: 'auto',
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
    '& h5': {
      margin: 'unset',
    },
  },
}));
const DataTableBox = styled(Box)(() => ({
  width: '100%',
  '& .MuiDataGrid-main': {},
  '& .MuiDataGrid-columnHeaders': {
    border: 'none !important',
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: '700',
    fontSize: '18px',
    color: '#0F0F0F',
  },
  '& .MuiDataGrid-root': {
    border: 'none !important',
    '& .MuiDataGrid-columnHeader': {
      background: 'unset !important',
      '&:focus': {
        outline: 'none !important',
      },
      '&:focus-within': {
        outline: 'none !important',
      },
    },
    '& .MuiDataGrid-cell': {
      '&:focus': {
        outline: 'none !important',
      },
      '&:focus-within': {
        outline: 'none !important',
      },
    },
    '& .MuiDataGrid-columnSeparator': {
      visibility: 'hidden',
    },
  },
}));
const StyledButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontSize: '16px',
}));
const TableHeading = styled('p')(() => ({
  fontWeight: '400',
  fontSize: '16px',
  color: '#0F0F0F',
  whiteSpace: 'break-spaces',
  margin: 'unset',
}));
function Invoices() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [bookingList, setBookingList] = useState([]);
  const [dateChange, setDateChange] = useState('month');
  const [statusChange, setStatusChange] = useState('scheduled');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [bookindDetails, setBookindDetails] = useState(null);
  const [invoiceModal, setInvoiceModal] = useState(false);

  useEffect(() => {
    serviceListAPI();
  }, [dateChange, statusChange, page, perPage]);

  const serviceListAPI = async () => {
    await axios
      .get(
        `${LIST_BOOKING}?booking_status=${statusChange}&date_filter=${dateChange}&page=${page}&per_page=${perPage}`,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then((res) => {
        setBookingList(res?.data);
      })
      .catch((err) => console.log(err));
  };
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      sortable: false,
      minWidth: 60,
      maxWidth: 60,
      renderCell: (item) => {
        return (
          <TableHeading>
            <Box
              sx={{
                background: '#4263eb',
                padding: '0.25rem',
                borderRadius: '4px',
                color: 'white',
                height: '25px',
                fontSize: '13px',
                textAlign: 'center',
              }}
            >
              {item?.row?.id}
            </Box>
          </TableHeading>
        );
      },
    },
    {
      field: 'bod',
      headerName: 'Customer',
      flex: 1,
      minWidth: 250,
      sortable: false,
      renderCell: (item) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box>
              <TableHeading style={{ fontWeight: 'bold' }}>
                {item?.value?.bod_contact_info?.first_name}{' '}
                {item?.value?.bod_contact_info?.last_name}
              </TableHeading>
              <Box display={'flex'} alignItems="center">
                <EmailOutlinedIcon sx={{ paddingRight: '5px' }} />
                <TableHeading>{item?.value?.bod_contact_info?.email}</TableHeading>
              </Box>
              <Box display={'flex'} alignItems="center">
                <LocalPhoneOutlinedIcon sx={{ paddingRight: '5px' }} />
                <TableHeading>{item?.value?.bod_contact_info?.phone}</TableHeading>
              </Box>
            </Box>
          </Box>
        );
      },
    },
    {
      field: '',
      headerName: 'Scheduled',
      flex: 1,
      minWidth: 200,
      sortable: false,
      renderCell: (item) => {
        return (
          <Box>
            <Box display={'flex'} alignItems="center">
              <CalendarMonthOutlinedIcon sx={{ paddingRight: '5px' }} />
              <TableHeading>
                {moment.utc(item?.row?.appointment_date_time).format('YYYY-MM-DD')}
              </TableHeading>
            </Box>

            <Box display={'flex'} alignItems="center">
              <AccessTimeOutlinedIcon sx={{ paddingRight: '5px' }} />
              <TableHeading>
                {item?.row?.bod?.start_time} - ({item?.row?.bod?.total_hours}hrs)
              </TableHeading>
            </Box>

            <TableHeading>B-{item?.row?.id}</TableHeading>
          </Box>
        );
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 130,
      maxWidth: 130,
      sortable: false,
      renderCell: (item) => {
        return (
          <Button sx={{ textTransform: 'uppercase' }} variant="contained" color="primary">
            {item?.row?.bod?.status}
          </Button>
        );
      },
    },
    {
      field: 'type',
      headerName: 'Location',
      flex: 1,
      minWidth: 300,
      sortable: false,
      renderCell: (item) => {
        return (
          <Box>
            <TableHeading>{item?.row?.bod?.bod_service_location?.street_address}</TableHeading>

            <TableHeading>
              {item?.row?.bod?.bod_service_location?.city}
              {', '}
              {item?.row?.bod?.bod_service_location?.state}
            </TableHeading>

            <TableHeading>{item?.row?.bod?.bod_service_location?.zip_code}</TableHeading>
          </Box>
        );
      },
    },
    {
      field: 'additional_info',
      headerName: '',
      flex: 1,
      sortable: false,
      minWidth: 140,
      maxWidth: 140,
      renderCell: (item) => {
        return (
          <Box display={'flex'} alignItems="center" gap={1}>
            <Button
              variant="outlined"
              onClick={() => {
                getBookingDetails(item?.row?.id);
                setInvoiceModal(true);
              }}
            >
              Show invoice
            </Button>
          </Box>
        );
      },
    },
  ];
  const getBookingDetails = async (id) => {
    await axios
      .get(`${BOOKING_APPOINTMENT_DETAILS}/${id}`)
      .then((res) => {
        setBookindDetails(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Pay Roll', path: '/dashboard/invoice' }, { name: 'Invoices' }]}
        />
      </Box>

      <SimpleCard>
        {user?.role !== 'Customer' && (
          <Box
            display="flex"
            alignItems={'center'}
            justifyContent="space-between"
            paddingBottom={'1rem'}
          >
            <Box
              display="flex"
              alignItems={'center'}
              gap={2}
              sx={{
                '& p': {
                  fontWeight: 'bold',
                  fontSize: '1rem',
                },
              }}
            >
              <Typography variant="body1">Scheduled for</Typography>
              <TextField
                size="small"
                id="outlined-select-currency"
                select
                value={dateChange}
                onChange={(e) => {
                  setPage(1);
                  setDateChange(e.target.value);
                }}
              >
                <MenuItem value={'week'}>This Week</MenuItem>
                <MenuItem value={'month'}>This Month</MenuItem>
              </TextField>
              <Typography variant="body1">Booking Status</Typography>
              <TextField
                size="small"
                id="outlined-select-currency"
                select
                value={statusChange}
                onChange={(e) => {
                  setPage(1);
                  setStatusChange(e.target.value);
                }}
              >
                <MenuItem value={'scheduled'}>Scheduled</MenuItem>
                <MenuItem value={'unscheduled'}>Unscheduled</MenuItem>
                <MenuItem value={'dispatched'}>Dispatched</MenuItem>
                <MenuItem value={'complete'}>Complete</MenuItem>
                <MenuItem value={'cancelled'}>Cancelled</MenuItem>
              </TextField>
            </Box>
          </Box>
        )}

        <DataTableBox>
          <DataGrid
            sx={{
              [`& .${gridClasses.cell}`]: {
                py: 1,
              },
            }}
            getRowHeight={() => 'auto'}
            disableColumnMenu={true}
            rows={bookingList?.data || []}
            columns={columns}
            autoHeight={true}
            hideFooter={true}
            checkboxSelection={false}
            disableSelectionOnClick
          />
        </DataTableBox>
        {!!bookingList?.data?.length && user?.role !== 'Customer' && (
          <Box display="flex" alignItems={'center'} gap={3}>
            <Pagination
              sx={{
                '& .Mui-selected': {
                  background: '#1976d2 !important',
                  color: 'white',
                },
              }}
              count={bookingList?.total_page}
              page={page}
              onChange={(event, value) => setPage(value)}
              variant="contained"
              color="primary"
              shape="rounded"
            />
            <Box>Rows per page </Box>
            <TextField
              sx={{ width: '6rem' }}
              size="small"
              type={'number'}
              inputProps={{ min: 0 }}
              placeholder="Enter rows"
              id="outlined-select-currency"
              value={perPage}
              onChange={(e) => {
                setPage(1);
                setPerPage(e.target.value);
              }}
            />
          </Box>
        )}
      </SimpleCard>
      <GenerateInvoice
        open={invoiceModal}
        handleClose={() => setInvoiceModal(false)}
        bookindDetails={bookindDetails}
      />
    </Container>
  );
}

export default Invoices;
