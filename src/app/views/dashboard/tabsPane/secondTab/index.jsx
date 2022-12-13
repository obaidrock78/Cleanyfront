import React from 'react'
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, DialogContentText, Stack } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { GET_PROVIDER_LIST_TASK, CREATE_PROVIDER_LIST_TASK } from 'app/api';
import axios from '../../../../../axios';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import toast, { Toaster } from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';

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


const SecondTab = () => {

  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [tasks, setTasks] = React.useState('');
  const [date, setDate] = React.useState(dayjs('2014-08-18T21:11:54'));


  React.useEffect(() => {
    getEventList();
  }, []);
  const getEventList = async () => {
    await axios
      .get(`${GET_PROVIDER_LIST_TASK}`)
      .then((res) => {

        const dataToMap = res?.data?.data
        setData(dataToMap);
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
    setTasks(e.target.value)
  }
  const handleDateChange = (newDate) => {
    setDate(newDate)
  }



  const handleSubmit = (e) => {
    e.preventDefault()
    const values = {
      tasks: tasks, due_date: date, service_provider: 1
    }
    toast.promise(
      axios.post(`${CREATE_PROVIDER_LIST_TASK}`, values, {
        headers: { 'Content-Type': 'application/json' },
      }),
      {
        loading: () => {
          return `Creating Service`;
        },
        success: (res) => {
          setOpen(false)
          return 'Service Created';
        },
        error: (err) => {

          return err?.message;
        },
      }
    );
  }
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box>
          <Button onClick={handleClickOpen}>
            Add Task
          </Button>
          <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'md'} >
            <DialogTitle>Create a new Task</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    value={tasks}
                    onChange={handleChange}
                    margin="dense"
                    id="task_name"
                    label="Type Task"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                  <DateTimePicker
                    id="task_date"
                    label="Due Date"
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField   {...params} />}
                  />
                  <LoadingButton type='submit'>
                    Create Task
                  </LoadingButton>
                </Stack>
              </form>
            </DialogContent>
          </Dialog>
        </Box>
        <div style={{ height: '300px', width: '100%', }}>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
        <Toaster position='top-right' />
      </LocalizationProvider >
    </>
  )
}

export default SecondTab