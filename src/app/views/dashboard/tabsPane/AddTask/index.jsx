import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Stack,
  Typography,
  MenuItem,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { GET_PROVIDER_LIST_TASK, CREATE_PROVIDER_LIST_TASK, MANAGER_LIST } from 'app/api';
import axios from '../../../../../axios';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import toast, { Toaster } from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'description', headerName: 'Tasks', width: 150 },
  { field: 'user', headerName: 'Created By', width: 150 },
  {
    field: 'updated_at',
    headerName: 'Start  Date',
    width: 150,
  },
  {
    field: 'due_date',
    headerName: 'End Date',
    width: 150,
  },
];

const TaskHeading = styled('h3')(({ theme }) => ({
  marginTop: 'unset',
  paddingBottom: '10px',
  typography: 'body1',
  color: 'black',
  borderBottom: '1px solid',
  borderBottomColor: theme.palette.text.secondary,
  textAlign: 'center',
  fontWeight: '900 !important',
  fontSize: '24px !important',
}));

const AddTask = () => {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [tasks, setTasks] = React.useState('');
  const [date, setDate] = React.useState(dayjs('2014-08-18T21:11:54'));
  const [managerList, setManagerList] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null);

  React.useEffect(() => {
    const getEventList = async () => {
      await axios
        .get(`${GET_PROVIDER_LIST_TASK}`)
        .then((res) => {
          const dataToMap = res?.data?.data;
          setData(dataToMap);
        })
        .catch((err) => console.log(err));
    };

    getEventList();
  }, []);
  useEffect(() => {
    managerListAPI();
  }, []);

  const managerListAPI = async () => {
    await axios
      .get(`${MANAGER_LIST}`, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        setManagerList(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    setTasks(e.target.value);
  };
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let values = {
      tasks: tasks,
      due_date: date,
      manager: selectedManager,
    };
    toast.promise(
      axios.post(`${CREATE_PROVIDER_LIST_TASK}`, values, {
        headers: { 'Content-Type': 'application/json' },
      }),
      {
        loading: () => {
          return `Creating Service`;
        },
        success: (res) => {
          setOpen(false);
          return 'Service Created';
        },
        error: (err) => {
          return 'There is an error!';
        },
      }
    );
  };
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box>
          <TaskHeading>Your Tasks</TaskHeading>
          <Box ml={'auto'} sx={{ p: 1 }}>
            <Button onClick={handleClickOpen} variant="contained">
              Add Task
            </Button>
          </Box>
          <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'md'}>
            <DialogTitle>Create a new Task</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    size="small"
                    value={selectedManager}
                    onChange={(e) => setSelectedManager(e.target.value)}
                    margin="dense"
                    id="task_name"
                    select
                    label="Select Manager"
                    fullWidth
                    variant="outlined"
                  >
                    {!!managerList?.length &&
                      managerList?.map((item, index) => (
                        <MenuItem key={index} value={item?.id}>
                          {item?.user_profile?.first_name} {item?.user_profile?.last_name}
                        </MenuItem>
                      ))}
                  </TextField>
                  <TextField
                    size="small"
                    value={tasks}
                    onChange={handleChange}
                    margin="dense"
                    id="task_name"
                    label="Type Task"
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                  <DateTimePicker
                    id="task_date"
                    label="Due Date"
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField size="small" {...params} />}
                  />
                  <LoadingButton type="submit" variant="contained">
                    Create Task
                  </LoadingButton>
                </Stack>
              </form>
            </DialogContent>
          </Dialog>
        </Box>
        <div style={{ height: '450px', width: '100%' }}>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
        <Toaster position="top-right" />
      </LocalizationProvider>
    </>
  );
};

export default AddTask;
