import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { GET_BOOKING_DASHBOARD } from '../../../../api'
import axios from '../../../../../axios'
import moment from 'moment';



function Scheduler() {
  const localizer = momentLocalizer(moment)
  const [events, setEvents] = useState()
  const now = new Date()


  React.useEffect(() => { getEvents() }, [])
  const getEvents = async () => {
    await axios
      .get(`${GET_BOOKING_DASHBOARD}`)
      .then((res) => {

        const dataToMap = res?.data?.data
        setEvents(dataToMap);
      })
      .catch((err) => console.log(err));
  }


  console.log({
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1),
  }
  )
  let temparry = []
  events?.map((ele) => {
    temparry.push({ id: ele.id, title: ele.additional_info, end: ele?.schedule?.end_time, start: ele?.schedule?.start_time })
  })

  const res = {
    "id": 63,
    "dispatch_id": null,
    "service_provider": null,
    "schedule": {
      "id": 62,
      "start_time": "2022-12-14T12:23:00Z",
      "end_time": "2022-12-14T14:23:00Z",
      "status": "Scheduled",
      "shift_started": false,
      "colour": "20",
      "shift_ended": false,
      "tip_amount": 0,
      "shift_status": "pending",
      "count": 1,
      "created_at": "2022-11-29T07:24:10.261493Z",
      "updated_at": "2022-11-29T07:24:58.774398Z",
      "user": null,
      "booking": 63
    },
    "bod": {
      "id": 17,
      "frequency": {
        "id": 17,
        "type": "biweekly",
        "title": "test_title_frequency",
        "discount_percent": 0,
        "discount_amount": 0,
        "start_date": "2022-11-30",
        "recur_end_date": null,
        "created_at": "2022-11-29T07:24:10.087991Z",
        "updated_at": "2022-11-29T07:24:10.088011Z",
        "service": 20
      },
      "bod_contact_info": {
        "id": 17,
        "first_name": "Obaid",
        "last_name": "Rehman",
        "email": "info@omgeatsnb.com",
        "phone": "+923034142927",
        "how_to_enter_on_premise": "asasaas",
        "created_at": "2022-11-29T07:24:10.082487Z",
        "updated_at": "2022-11-29T07:24:10.082513Z"
      },
      "bod_service_location": {
        "id": 17,
        "street_address": "480 Pak Block Ait Lahore",
        "apt_suite": "",
        "city": "Lahore",
        "state": "nyc",
        "zip_code": 54999,
        "let_long": "",
        "created_at": "2022-11-29T07:24:10.090319Z",
        "updated_at": "2022-11-29T07:24:10.090342Z"
      },
      "type": null,
      "start_time": "12:23",
      "total_hours": 47,
      "total_amount": 5774.85,
      "latest_reschedule": 24,
      "latest_cancel": 24,
      "additional_info": "asasa",
      "created_at": "2022-11-29T07:24:10.097962Z",
      "updated_at": "2022-11-29T07:24:10.544033Z",
      "status": "scheduled",
      "colour": "20",
      "user": null
    },
    "type": null,
    "start_time": "12:23",
    "total_hours": 47,
    "total_amount": 5774.85,
    "latest_reschedule": 24,
    "latest_cancel": 24,
    "additional_info": "asasa",
    "created_at": "2022-11-29T07:24:10.159139Z",
    "updated_at": "2022-11-29T07:24:58.770740Z",
    "status": "scheduled",
    "customer_notes": "null",
    "cleaner_notes": "null",
    "appointment_date_time": "2022-12-14T12:23:00Z",
    "service_location": 63
  }

  return (
    <div>

      <Calendar
        localizer={localizer}
        startAccessor="start"
        events={temparry}
        endAccessor="end"
        style={{ height: 600 }}
      />
    </div>
  )
}

export default Scheduler