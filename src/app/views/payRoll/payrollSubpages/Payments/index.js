import { Box, Container, styled, Grid, Button } from '@mui/material';
import { Breadcrumb } from 'app/components';
import React from 'react';
const Payment = styled(Box)(({ theme }) => ({
	p: 3,
	width: '100%',
	typography: 'body1',
	height: '460px',
	background: theme.palette.background.paper,
	boxShadow:
		'0px 3px 3px -2px rgb(0 0 0 / 6%),0px 3px 4px 0px rgb(0 0 0 / 4%),0px 1px 8px 0px rgb(0 0 0 / 4%)!important',
	borderRadius: '10px',
	borderTop: '5px solid blue',
	padding: '10px',
	marginTop: '30px',
}));
const Payments = () => {
	return (
		<Box sx={{ mt: 4 }}>
			<Container maxWidth="lg">
				<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Box>
						<Breadcrumb
							routeSegments={[
								{ name: 'Home', path: '/' },
								{ name: 'Invoices', path: '/dashboard/payment' },
							]}
						/>
					</Box>
					<Box>
						<Button variant="contained"> Print Payment </Button>
					</Box>
				</Box>
				<Payment>
					<Grid container>pay me</Grid>
				</Payment>
			</Container>
		</Box>
	);
};

export default Payments;
