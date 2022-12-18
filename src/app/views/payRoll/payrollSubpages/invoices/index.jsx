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
let data = {

	"data": [
		{
			"id": 1,
			"sp": {
				"id": 37,
				"email": "beta@gmail.com",
				"user_profile": {
					"id": 17,
					"first_name": "Kamran",
					"last_name": "Ashraf",
					"role": "Customer"
				}
			},
			"status": "Due",
			"hourly_wage": 8,
			"total_hours": 6,
			"total_amount": 6,
			"tip_amount": 3,
			"paid_amount": 7,
			"due_amount": 5,
			"created_at": "2022-12-18T06:55:27.454408Z",
			"updated_at": "2022-12-18T06:55:27.454431Z",
			"schedule": 73
		},
		{
			"id": 2,
			"sp": {
				"id": 37,
				"email": "beta@gmail.com",
				"user_profile": {
					"id": 17,
					"first_name": "Kamran",
					"last_name": "Ashraf",
					"role": "Customer"
				}
			},
			"status": "Due",
			"hourly_wage": 8,
			"total_hours": 6,
			"total_amount": 6,
			"tip_amount": 3,
			"paid_amount": 7,
			"due_amount": 5,
			"created_at": "2022-12-18T06:55:28.234812Z",
			"updated_at": "2022-12-18T06:55:28.234833Z",
			"schedule": 73
		}
	]
}
const columns = [
	{
		field: 'service provider',
		headerName: 'SERVICE PROVIDER',
		width: 250,
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
		field: 'schedule',
		headerName: 'SCHEDULE',
		width: 150,
	},
	{
		field: 'status',
		headerName: 'STATUS',
		width: 150,
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
		width: 120,
		renderCell: (item) => {
			return (
				<Box sx={{ textTransform: 'uppercase' }} variant="contained" color="primary">
					<TableHeading>
						{item?.row?.bod?.total_amount}
					</TableHeading>
				</Box>
			);
		},
	},
	{
		field: 'paid_amount',
		headerName: 'PAID',
		width: 100,
		renderCell: (item) => {
			return (
				<Box sx={{ textTransform: 'uppercase' }} variant="contained" color="primary">
					<TableHeading>
						{item?.row?.bod?.total_amount}
					</TableHeading>
				</Box>
			);
		},
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
	{
		field: 'action',
		headerName: 'ACTION',
		width: 150,
		renderCell: () => {
			return (
				<Box sx={{ textTransform: 'uppercase' }} variant="contained" color="primary">
					<Button variant='contained'> edit</Button>
				</Box>
			);
		},

	},
];



const Invoices = () => {
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
						{ name: 'Invoices', path: '/dashboard/Invoices' },
					]}
				/>
			</Box>
			<Box  sx={{ mt: 3 }}>
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

export default Invoices