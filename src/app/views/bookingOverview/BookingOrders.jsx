import { Box, Button, Menu, MenuItem } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import React, { useEffect, useState } from 'react';
import axios from '../../../axios';
import { LIST_BOOKING } from 'app/api';
import { DataGrid, GridToolbarQuickFilter, gridClasses } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import moment from 'moment';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
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
function BookingOrders() {
  const navigate = useNavigate();
  const [bookingList, setBookingList] = useState([]);
  const [editData, setEditData] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  useEffect(() => {
    serviceListAPI();
  }, []);

  const serviceListAPI = async () => {
    await axios
      .get(`${LIST_BOOKING}`, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        setBookingList(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      sortable: false,
      minWidth: 50,
      maxWidth: 50,
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
                width: '25px',
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
      sortable: false,
      renderCell: (item) => {
        return (
          <Box>
            <Box display={'flex'} alignItems="center">
              <CalendarMonthOutlinedIcon sx={{ paddingRight: '5px' }} />
              <TableHeading>{item?.row?.bod?.frequency?.start_date}</TableHeading>
            </Box>

            <Box display={'flex'} alignItems="center">
              <AccessTimeOutlinedIcon sx={{ paddingRight: '5px' }} />
              <TableHeading>
                {moment(item?.row?.bod?.start_time).format('')} - ({item?.row?.bod?.total_hours}hrs)
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
      minWidth: 120,
      maxWidth: 120,
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
      minWidth: 150,
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
      minWidth: 90,
      maxWidth: 90,
      renderCell: (item) => {
        return (
          <Box display={'flex'} alignItems="center" gap={1}>
            <Button
              variant="outlined"
              onClick={() =>
                navigate(`/dashboard/booking-appointments/${item?.row?.bod?.id}/details/`)
              }
            >
              View
            </Button>
          </Box>
        );
      },
    },
  ];

  const handleDelete = (item) => {
    setDeleteID(item.id);
    setDeleteOpen(true);
  };
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Bookings', path: '/dashboard/booking-appointments' },
            { name: 'Booking Appointments' },
          ]}
        />
      </Box>

      <Box display={'flex'} justifyContent={'end'}>
        <StyledButton
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
          // onClick={() => {
          //   navigate('/dashboard/service-providers/create');
          // }}
        >
          Create Booking
        </StyledButton>
      </Box>

      <SimpleCard>
        <DataTableBox>
          <DataGrid
            sx={{
              [`& .${gridClasses.cell}`]: {
                py: 1,
              },
            }}
            getRowHeight={() => 'auto'}
            disableColumnMenu={true}
            rows={bookingList}
            columns={columns}
            autoHeight={true}
            hideFooter={true}
            checkboxSelection={false}
            disableSelectionOnClick
          />
        </DataTableBox>
      </SimpleCard>
    </Container>
  );
}

export default BookingOrders;
