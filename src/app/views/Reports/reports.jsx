import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { BOOKING_REPORTS } from 'app/api';
import axios from '../../../axios'
import { Box } from '@mui/system';

const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  {
    field: (renderItem) => {
      return console.log(renderItem.bod.bod_contact_info.email)

    }, headerName: 'CUSTOMER', width: 150
  },
  { field: 'user', headerName: 'SCHEDULED  ', width: 150 },
  {
    field: 'updated_at',
    headerName: 'STATUS   ',
    width: 150,
  },
  {
    field: 'due_date',
    headerName: 'AMOUNT  ',
    width: 150,
  },
];



const Reports = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const getEventList = async () => {
      await axios
        .get(`${BOOKING_REPORTS}?booking_status=scheduled`)
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
      <div style={{ height: '450px', width: '100%', }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </Box>
  )
}

export default Reports