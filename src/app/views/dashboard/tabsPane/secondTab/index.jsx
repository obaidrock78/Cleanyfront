import React from 'react'
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, DialogContentText, Stack } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { GET_PROVIDER_LIST_TASK, CREATE_PROVIDER_LIST_TASK } from 'app/api';
import axios from '../../../../../axios';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormik, Form, FormikProvider } from 'formik';

import toast, { Toaster } from 'react-hot-toast';
import * as Yup from 'yup'
import { LoadingButton } from '@mui/lab';
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


  const schema = Yup.object().shape({
    name: Yup.string().required('Task is required'),


  });
  // const formik = useFormik({
  //   initialValues: {
  //     task: '',
  //     date: '',

  //   },
  //   validationSchema: schema,
  //   onSubmit: (values) => {

  //   
  //   },
  // });

  // const { errors, touched, resetForm, setFieldValue, handleSubmit, getFieldProps, values } = formik;

  const handleSubmit = (e) => {
    e.preventDefault()
    const values = {
      tasks, date
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
              {/* <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}> */}

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
                  // {...getFieldProps('task')}
                  // error={Boolean(touched.task && errors.task)}
                  // helperText={touched.task && errors.task}
                  />
                  <DateTimePicker
                    id="task_date"
                    label="Due Date"
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField   {...params} />}
                  // {...getFieldProps('date')}
                  // error={Boolean(touched.date && errors.date)}
                  // helperText={touched.date && errors.date}
                  />


                  <LoadingButton type='submit'>
                    Create Task
                  </LoadingButton>
                </Stack>
              </form>

              {/* </Form>
              </FormikProvider> */}
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
      </LocalizationProvider >
    </>
  )
}

export default SecondTab