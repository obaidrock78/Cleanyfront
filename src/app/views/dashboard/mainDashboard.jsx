import React from 'react'
import Box from '@mui/material/Box';
import { Button, Grid, styled } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import StatCards from './shared/StatCards';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)

const StylesTabsArea = styled(Box)(({ theme }) => ({
    p: 3,
    width: '100%',
    typography: 'body1',
    height: '725px',
    background: theme.palette.background.paper,
    boxShadow: '0px 3px 3px -2px rgb(0 0 0 / 6%),0px 3px 4px 0px rgb(0 0 0 / 4%),0px 1px 8px 0px rgb(0 0 0 / 4%)!important',
    borderRadius: '10px'
}));

const now = new Date()

const events = [
    {
        id: 0,
        title: 'All Day Event very long title',
        allDay: true,
        start: new Date(2015, 3, 0),
        end: new Date(2015, 3, 1),
    },
    {
        id: 1,
        title: 'Long Event',
        start: new Date(2015, 3, 7),
        end: new Date(2015, 3, 10),
    },

    {
        id: 2,
        title: 'DTS STARTS',
        start: new Date(2016, 2, 13, 0, 0, 0),
        end: new Date(2016, 2, 20, 0, 0, 0),
    },

    {
        id: 3,
        title: 'DTS ENDS',
        start: new Date(2016, 10, 6, 0, 0, 0),
        end: new Date(2016, 10, 13, 0, 0, 0),
    },

    {
        id: 4,
        title: 'Some Event',
        start: new Date(2015, 3, 9, 0, 0, 0),
        end: new Date(2015, 3, 10, 0, 0, 0),
    },
    {
        id: 5,
        title: 'Conference',
        start: new Date(2015, 3, 11),
        end: new Date(2015, 3, 13),
        desc: 'Big conference for important people',
    },
    {
        id: 6,
        title: 'Meeting',
        start: new Date(2015, 3, 12, 10, 30, 0, 0),
        end: new Date(2015, 3, 12, 12, 30, 0, 0),
        desc: 'Pre-meeting meeting, to prepare for the meeting',
    },
    {
        id: 7,
        title: 'Lunch',
        start: new Date(2015, 3, 12, 12, 0, 0, 0),
        end: new Date(2015, 3, 12, 13, 0, 0, 0),
        desc: 'Power lunch',
    },
    {
        id: 8,
        title: 'Meeting',
        start: new Date(2015, 3, 12, 14, 0, 0, 0),
        end: new Date(2015, 3, 12, 15, 0, 0, 0),
    },
    {
        id: 9,
        title: 'Happy Hour',
        start: new Date(2015, 3, 12, 17, 0, 0, 0),
        end: new Date(2015, 3, 12, 17, 30, 0, 0),
        desc: 'Most important meal of the day',
    },
    {
        id: 10,
        title: 'Dinner',
        start: new Date(2015, 3, 12, 20, 0, 0, 0),
        end: new Date(2015, 3, 12, 21, 0, 0, 0),
    },
    {
        id: 11,
        title: 'Planning Meeting with Paige',
        start: new Date(2015, 3, 13, 8, 0, 0),
        end: new Date(2015, 3, 13, 10, 30, 0),
    },
    {
        id: 11.1,
        title: 'Inconvenient Conference Call',
        start: new Date(2015, 3, 13, 9, 30, 0),
        end: new Date(2015, 3, 13, 12, 0, 0),
    },
    {
        id: 11.2,
        title: "Project Kickoff - Lou's Shoes",
        start: new Date(2015, 3, 13, 11, 30, 0),
        end: new Date(2015, 3, 13, 14, 0, 0),
    },
    {
        id: 11.3,
        title: 'Quote Follow-up - Tea by Tina',
        start: new Date(2015, 3, 13, 15, 30, 0),
        end: new Date(2015, 3, 13, 16, 0, 0),
    },
    {
        id: 12,
        title: 'Late Night Event',
        start: new Date(2015, 3, 17, 19, 30, 0),
        end: new Date(2015, 3, 18, 2, 0, 0),
    },
    {
        id: 12.5,
        title: 'Late Same Night Event',
        start: new Date(2015, 3, 17, 19, 30, 0),
        end: new Date(2015, 3, 17, 23, 30, 0),
    },
    {
        id: 13,
        title: 'Multi-day Event',
        start: new Date(2015, 3, 20, 19, 30, 0),
        end: new Date(2015, 3, 22, 2, 0, 0),
    },
    {
        id: 14,
        title: 'Today',
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
    {
        id: 15,
        title: 'Point in Time Event',
        start: now,
        end: now,
    },
    {
        id: 16,
        title: 'Video Record',
        start: new Date(2015, 3, 14, 15, 30, 0),
        end: new Date(2015, 3, 14, 19, 0, 0),
    },
    {
        id: 17,
        title: 'Dutch Song Producing',
        start: new Date(2015, 3, 14, 16, 30, 0),
        end: new Date(2015, 3, 14, 20, 0, 0),
    },
    {
        id: 18,
        title: 'Itaewon Halloween Meeting',
        start: new Date(2015, 3, 14, 16, 30, 0),
        end: new Date(2015, 3, 14, 17, 30, 0),
    },
    {
        id: 19,
        title: 'Online Coding Test',
        start: new Date(2015, 3, 14, 17, 30, 0),
        end: new Date(2015, 3, 14, 20, 30, 0),
    },
    {
        id: 20,
        title: 'An overlapped Event',
        start: new Date(2015, 3, 14, 17, 0, 0),
        end: new Date(2015, 3, 14, 18, 30, 0),
    },
    {
        id: 21,
        title: 'Phone Interview',
        start: new Date(2015, 3, 14, 17, 0, 0),
        end: new Date(2015, 3, 14, 18, 30, 0),
    },
    {
        id: 22,
        title: 'Cooking Class',
        start: new Date(2015, 3, 14, 17, 30, 0),
        end: new Date(2015, 3, 14, 19, 0, 0),
    },
    {
        id: 23,
        title: 'Go to the gym',
        start: new Date(2015, 3, 14, 18, 30, 0),
        end: new Date(2015, 3, 14, 20, 0, 0),
    },
]

const EasyAccess = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '300px',
    background: theme.palette.background.paper,
    boxShadow: '0px 3px 3px -2px rgb(0 0 0 / 6%),0px 3px 4px 0px rgb(0 0 0 / 4%),0px 1px 8px 0px rgb(0 0 0 / 4%)!important',
    borderRadius: '10px',
    padding: "10px"
}));
const EasyAccessHeading = styled('h3')(({ theme }) => ({

    typography: 'body1',
    color: theme.palette.text.secondary,
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.text.secondary
}))

const Notifications = styled(Box)(({ theme }) => ({
    marginTop: "20px",
    width: '100%',
    height: '200px',
    background: theme.palette.background.paper,
    boxShadow: '0px 3px 3px -2px rgb(0 0 0 / 6%),0px 3px 4px 0px rgb(0 0 0 / 4%),0px 1px 8px 0px rgb(0 0 0 / 4%)!important',
    borderRadius: '10px',
    padding: "10px"
}));

const NotificationsHeading = styled('h3')(({ theme }) => ({

    typography: 'body1',
    color: theme.palette.text.secondary,
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.text.secondary
}))

const EasyAccessContent = styled(Box)(({ theme }) => ({
    overflowY: 'scroll',
    height: '200px'
}))
const NotificationsContent = styled(Box)(({ theme }) => ({
    overflowY: 'scroll',
    height: '100px'

}))
const easyAccessContentItems = [
    'Create Customer',
    'Create Booking',
    'Google Chat',
    'Nextiva',
    'Yelp',
    'Google Business',
    'Last Pass',
    'Stripe',
    "Banking"
]
const notifications = [
    {
        id: 1,
        notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
    },
    {
        id: 1,
        notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
    }, {
        id: 1,
        notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
    }, {
        id: 1,
        notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
    }, {
        id: 1,
        notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
    }, {
        id: 1,
        notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
    }, {
        id: 1,
        notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
    }, {
        id: 1,
        notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
    }, {
        id: 1,
        notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
    }, {
        id: 1,
        notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
    }, {
        id: 1,
        notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
    }, {
        id: 1,
        notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
    }, {
        id: 1,
        notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
    }, {
        id: 1,
        notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
    }, {
        id: 1,
        notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
    }, {
        id: 1,
        notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
    }, {
        id: 1,
        notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
    }, {
        id: 1,
        notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
    }, {
        id: 1,
        notifications: 'New Booking has been created Booking Id 1 by user Buyer.'
    },
]


const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'firstName', headerName: 'Tasks', width: 150 },
    { field: 'lastName', headerName: 'Created By', width: 150 },
    {
        field: 'age',
        headerName: 'Start  Date',
        width: 150,
    },
    {
        field: 'fullName',
        headerName: 'End Date',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 150,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


const MainDashboard = () => {
    const [value, setValue] = React.useState('3');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Box sx={{ p: 4 }}>
            <Grid container spacing={3} rowSpacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <StatCards />
                </Grid>

                <Grid item lg={8} md={8} sm={12} xs={12} >

                    <StylesTabsArea >
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Your Scheduling Overview" value="1" />
                                    <Tab label="Tasks" value="2" />
                                    <Tab label="Chats" value="3" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <Calendar
                                    localizer={localizer}
                                    startAccessor="start"
                                    events={events}
                                    endAccessor="end"
                                    style={{ height: 500 }}
                                />
                            </TabPanel>
                            <TabPanel value="2">
                                <Box>

                                    <Button onClick={handleClickOpen}>
                                        Add Task
                                    </Button>
                                    <Dialog open={open} onClose={handleClose} maxWidth={'lg'} >
                                        <DialogTitle>Create a new Task</DialogTitle>
                                        <DialogContent>

                                            <TextField

                                                margin="dense"
                                                id="task_name"
                                                label="Type Task"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                            />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose}>Cancel</Button>
                                            <Button onClick={handleClose}>Subscribe</Button>
                                        </DialogActions>
                                    </Dialog>
                                </Box>
                                <div style={{ height: '300px', width: '100%', }}>
                                    <DataGrid

                                        rows={rows}
                                        columns={columns}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                        checkboxSelection
                                    />
                                </div>
                            </TabPanel>
                            <TabPanel value="3">

                                <Grid container >
                                    <Grid item md={4} sx={{ borderRight: '1px solid lightgray', height: '600px' }}>  All Chats



                                        <Grid container sx={{ overflowY: 'scroll', height: '500px' }}>
                                            <Grid item md={12} sx={{ p: 2, border: '1px dashed lightgray', m: 2 }}> Haseeb Ali Khan</Grid>
                                            <Grid item md={12} sx={{ p: 2, border: '1px dashed lightgray', m: 2 }}> Haseeb Ali Khan</Grid>
                                            <Grid item md={12} sx={{ p: 2, border: '1px dashed lightgray', m: 2 }}> Haseeb Ali Khan</Grid>
                                            <Grid item md={12} sx={{ p: 2, border: '1px dashed lightgray', m: 2 }}> Haseeb Ali Khan</Grid>
                                            <Grid item md={12} sx={{ p: 2, border: '1px dashed lightgray', m: 2 }}> Haseeb Ali Khan</Grid>
                                            <Grid item md={12} sx={{ p: 2, border: '1px dashed lightgray', m: 2 }}> Haseeb Ali Khan</Grid>
                                            <Grid item md={12} sx={{ p: 2, border: '1px dashed lightgray', m: 2 }}> Haseeb Ali Khan</Grid>
                                            <Grid item md={12} sx={{ p: 2, border: '1px dashed lightgray', m: 2 }}> Haseeb Ali Khan</Grid>
                                            <Grid item md={12} sx={{ p: 2, border: '1px dashed lightgray', m: 2 }}> Haseeb Ali Khan</Grid>
                                            <Grid item md={12} sx={{ p: 2, border: '1px dashed lightgray', m: 2 }}> Haseeb Ali Khan</Grid>
                                            <Grid item md={12} sx={{ p: 2, border: '1px dashed lightgray', m: 2 }}> Haseeb Ali Khan</Grid>
                                            <Grid item md={12} sx={{ p: 2, border: '1px dashed lightgray', m: 2 }}> Haseeb Ali Khan</Grid>
                                            <Grid item md={12} sx={{ p: 2, border: '1px dashed lightgray', m: 2 }}> Haseeb Ali Khan</Grid>
                                            <Grid item md={12} sx={{ p: 2, border: '1px dashed lightgray', m: 2 }}> Haseeb Ali Khan</Grid>
                                            <Grid item md={12} sx={{ p: 2, border: '1px dashed lightgray', m: 2 }}> Haseeb Ali Khan</Grid>
                                            <Grid item md={12} sx={{ p: 2, border: '1px dashed lightgray', m: 2 }}> Haseeb Ali Khan</Grid>
                                            <Grid item md={12} sx={{ p: 2, border: '1px dashed lightgray', m: 2 }}> Haseeb Ali Khan</Grid>
                                            <Grid item md={12} sx={{ p: 2, border: '1px dashed lightgray', m: 2 }}> Haseeb Ali Khan</Grid>
                                            <Grid item md={12} sx={{ p: 2, border: '1px dashed lightgray', m: 2 }}> Haseeb Ali Khan</Grid>
                                            <Grid item md={12} sx={{ p: 2, border: '1px dashed lightgray', m: 2 }}> Haseeb Ali Khan</Grid>
                                            <Grid item md={12} sx={{ p: 2, border: '1px dashed lightgray', m: 2 }}> Haseeb Ali Khan</Grid>
                                            <Grid item md={12} sx={{ p: 2, border: '1px dashed lightgray', m: 2 }}> Haseeb Ali Khan</Grid>
                                            <Grid item md={12} sx={{ p: 2, border: '1px dashed lightgray', m: 2 }}> Haseeb Ali Khan</Grid>
                                            <Grid item md={12} sx={{ p: 2, border: '1px dashed lightgray', m: 2 }}> Haseeb Ali Khan</Grid>
                                            <Grid item md={12} sx={{ p: 2, border: '1px dashed lightgray', m: 2 }}> Haseeb Ali Khan</Grid>
                                            <Grid item md={12} sx={{ p: 2, border: '1px dashed lightgray', m: 2 }}> Haseeb Ali Khan</Grid>
                                            <Grid item md={12} sx={{ p: 2, border: '1px dashed lightgray', m: 2 }}> Haseeb Ali Khan</Grid>
                                            <Grid item md={12} sx={{ p: 2, border: '1px dashed lightgray', m: 2 }}> Haseeb Ali Khan</Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item md={8} > Single Chat</Grid>

                                </Grid>
                            </TabPanel>
                        </TabContext>
                    </StylesTabsArea>
                </Grid>

                <Grid item lg={4} md={4} sm={12} xs={12} >
                    <Grid container>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <EasyAccess >
                                <EasyAccessHeading>
                                    Easy Access

                                </EasyAccessHeading>
                                <EasyAccessContent>
                                    {easyAccessContentItems.map((items) => {
                                        return (
                                            <p>
                                                {
                                                    items
                                                }
                                            </p>
                                        )
                                    })}
                                </EasyAccessContent>
                            </EasyAccess>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} >
                            <Notifications >
                                <NotificationsHeading>
                                    Notification's
                                </NotificationsHeading>
                                <NotificationsContent>
                                    {notifications.map((items) => {
                                        return (
                                            <p>
                                                {
                                                    items.notifications
                                                }
                                            </p>
                                        )
                                    })}
                                </NotificationsContent>
                            </Notifications>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} >
                            <Notifications >
                                <NotificationsHeading>
                                    Weather
                                </NotificationsHeading>
                                <NotificationsContent>

                                </NotificationsContent>
                            </Notifications>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box >
    )
}

export default MainDashboard