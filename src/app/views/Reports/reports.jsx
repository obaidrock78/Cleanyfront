import React, { useState } from 'react';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { BOOKING_REPORTS } from 'app/api';
import axios from '../../../axios';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import moment from 'moment';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { styled, Button, Box, Typography, Pagination, TextField } from '@mui/material';

import { Breadcrumb, SimpleCard } from 'app/components';
import ChargeCustomerModal from '../bookingOverview/Modals/ChargeCustomer';

const TableHeading = styled('p')(() => ({
  fontWeight: '400',
  fontSize: '16px',
  color: '#0F0F0F',
  whiteSpace: 'break-spaces',
  margin: 'unset',
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

const Reports = () => {
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(5);
  const [chargeCustomer, setChargeCustomer] = useState(false);
  const [bookindDetails, setBookindDetails] = useState(null);

  React.useEffect(() => {
    getEventList();
  }, [page, perPage]);
  const getEventList = async () => {
    await axios
      .get(`${BOOKING_REPORTS}?booking_status=scheduled&page=${page}&per_page=${perPage}`)
      .then((res) => {
        const dataToMap = res?.data;
        setData(dataToMap);
      })
      .catch((err) => console.log(err));
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    {
      field: 'customer',
      headerName: 'CUSTOMER',
      width: 250,
      height: 250,
      renderCell: (item) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box>
              <TableHeading>
                <Typography sx={{ fontWeight: 900 }}>
                  {item?.row?.bod?.bod_contact_info?.first_name}{' '}
                  {item?.row?.bod?.bod_contact_info?.last_name}
                </Typography>
              </TableHeading>
              <Box display={'flex'} alignItems="center">
                <EmailOutlinedIcon sx={{ paddingRight: '5px' }} />
                <TableHeading>{item?.row?.bod?.bod_contact_info?.email}</TableHeading>
              </Box>
              <Box display={'flex'} alignItems="center">
                <LocalPhoneOutlinedIcon sx={{ paddingRight: '5px' }} />
                <TableHeading>{item?.row?.bod?.bod_contact_info?.phone}</TableHeading>
              </Box>
            </Box>
          </Box>
        );
      },
    },
    {
      field: 'scheduled',
      headerName: 'SCHEDULED',
      width: 250,
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
      headerName: 'STATUS',
      width: 150,
      renderCell: (item) => {
        return (
          <Button sx={{ textTransform: 'uppercase' }} variant="contained" color="primary">
            {item?.row?.bod?.status}
          </Button>
        );
      },
    },
    {
      field: 'amount',
      headerName: 'AMOUNT',
      width: 150,
      renderCell: (item) => {
        return (
          <Box sx={{ textTransform: 'uppercase' }} variant="contained" color="primary">
            <TableHeading>{item?.row?.bod?.total_amount?.toFixed(2)}</TableHeading>
          </Box>
        );
      },
    },
    {
      field: 'action',
      headerName: 'ACTIONS',
      width: 150,
      renderCell: (item) => {
        return (
          <Box sx={{ textTransform: 'uppercase' }} variant="contained" color="primary">
            {console.log(item)}
            <Button
              variant="contained"
              onClick={() => {
                setChargeCustomer(true);
                setBookindDetails(item?.row);
              }}
            >
              Charge
            </Button>
          </Box>
        );
      },
    },
  ];
  return (
    <Box sx={{ p: 4 }}>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Home', path: '/' },
            { name: 'Reports', path: '/dashboard/Reports' },
          ]}
        />
      </Box>
      <Box sx={{ mt: 5 }}>
        <SimpleCard>
          <DataTableBox>
            <DataGrid
              sx={{
                [`& .${gridClasses.cell}`]: {
                  py: 1,
                },
              }}
              rows={data?.data || []}
              columns={columns}
              getRowHeight={() => 'auto'}
              disableColumnMenu={true}
              autoHeight={true}
              hideFooter={true}
              checkboxSelection={false}
              disableSelectionOnClick
            />
          </DataTableBox>
          {!!data?.data?.length && (
            <Box display="flex" alignItems={'center'} gap={3}>
              <Pagination
                sx={{
                  '& .Mui-selected': {
                    background: '#1976d2 !important',
                    color: 'white',
                  },
                }}
                count={data?.total_page}
                page={page}
                onChange={(event, value) => setPage(value)}
                variant="contained"
                color="primary"
                shape="rounded"
              />
              <Box>Rows per page {data?.total_page} </Box>
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
      </Box>
      <ChargeCustomerModal
        open={chargeCustomer}
        handleClose={() => setChargeCustomer(false)}
        bookindDetails={bookindDetails}
        getEventList={getEventList}
      />
    </Box>
  );
};

export default Reports;
