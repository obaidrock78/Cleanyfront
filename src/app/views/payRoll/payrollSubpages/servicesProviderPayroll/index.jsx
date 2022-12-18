
import React from 'react'
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import { GET_BOOKING_INVOICES } from 'app/api';
import axios from '../../../../../axios'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import moment from 'moment';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { styled, Button, Box, Container, } from '@mui/material';

import { Breadcrumb, SimpleCard } from 'app/components';

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
const columns = [

    {
        field: 'service provider', headerName: 'SERVICE PROVIDER', width: 250,
        renderCell: (item) => {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box>
                        <TableHeading>
                            {item?.row?.sp?.user_profile?.first_name} {item?.row?.sp?.user_profile?.first_name}
                        </TableHeading>

                    </Box>
                </Box>

            )
        }
    },
    {
        field: 'hourly_wage',
        headerName: 'HOURLY WAGE',
        width: 150,
    },
    {
        field: 'total_hours',
        headerName: 'TOTAL WORKED HOURS',
        width: 150,
    },
    {
        field: 'total_amount',
        headerName: 'AMOUNT',
        width: 150,
    },
    {
        field: 'paid_amount',
        headerName: 'PAID',
        width: 150,
    },
    {
        field: 'due_amount',
        headerName: 'DUE',
        width: 100,
    },
    {
        field: 'tip_amount',
        headerName: 'TOTAL TIPS	',
        width: 150,
    },

];

const ServicesProviderPAyroll = () => {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        const getEventList = async () => {
            await axios
                .get(`${GET_BOOKING_INVOICES}`)
                .then((res) => {

                    const dataToMap = res?.data?.data
                    setData(dataToMap);
                })
                .catch((err) => console.log(err));
        };

        getEventList();
    }, []);
    return (
        <Box sx={{ p: 4 }}>

            <Box className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Home', path: '/' },
                        { name: 'Service Provider Payroll', path: '/dashboard/service-provider-payroll' },


                    ]}
                />
            </Box>
            <Box  sx={{ mt: 10 }}>
                <SimpleCard>
                    <DataTableBox >
                        <DataGrid
                            sx={{
                                [`& .${gridClasses.cell}`]: {
                                    py: 1,
                                },
                            }}
                            rows={data}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[5]}
                            getRowHeight={() => 'auto'}
                            disableColumnMenu={true}
                            autoHeight={true} 
                            checkboxSelection={false}
                            disableSelectionOnClick
                        />
                    </DataTableBox>
                </SimpleCard>
            </Box>

        </Box>
    )
}

export default ServicesProviderPAyroll