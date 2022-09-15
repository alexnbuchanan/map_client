import { getDatabase } from "firebase/database";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css"; /* NOTE - DON'T DELETE: default styling */

export default function Calendar_App(props) {
  const [value, onChange] = useState();
  // const [disabledDates, setDisabledDates] = useState([])
  let disabledDates = [];
  // const checkIn = props.setCheckIn;
  const [checkInSelected, setCheckInSelected] = useState(true);
  const [reservedDates, setReservedDates] = useState(props.reservedDates || []);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const overlapCheck = true;

  useEffect(() => {
    setReservedDates(props.reservedDates);
  }, [props.reservedDates.length]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // console.log("DATAES", typeof new Date(props.reservedDates.checkIn));
  // console.log("DATAES2", typeof props.reservedDates.checkIn);
  // console.log("DATAES3", new Date(2022, 4, 29));

  function calendarBookedDates(checkInDate, checkOutDate, prop3) {
    if (!prop3) {
      let initialTime = new Date(checkInDate);
      let endTime = new Date(checkOutDate);
      let arrTime = [];

      for (let q = initialTime; q <= endTime; q.setDate(q.getDate() + 1)) {
        arrTime.push(new Date(q.toString()));
      }

      // const dateOverlapCheck = arrTime.some((date) => {
      //   return disabledDates.indexOf(date) !== -1;
      // });

      disabledDates = disabledDates.concat(arrTime);
    } else {
      let initialTime = new Date(checkInDate + ", " + new Date().getFullYear());
      let endTime = new Date(checkOutDate + ", " + new Date().getFullYear());
      let arrTime = [];
      if (!(checkInDate && checkOutDate)) return;

      // if (initialTime > endTime) {
      //   tiger = true;
      // }

      for (let q = initialTime; q <= endTime; q.setDate(q.getDate() + 1)) {
        arrTime.push(new Date(q.toString()));
      }
      let disabledDatesStr = disabledDates.map((d) => d.toISOString());
      let arrTimeStr = arrTime.map((date) => date.toISOString());
      let result = arrTimeStr.some((element) => {
        return disabledDatesStr.indexOf(element) !== -1;
      });

      return result;
    }
  }

  const onCalendarChange = (event) => {
    if (event.length && event.length === 2) {
      if (
        calendarBookedDates(
          getDateInFormat(event[0]),
          getDateInFormat(event[1]),
          overlapCheck
        )
      ) {
        onChange(null);
      } else {
        onChange(event);
      }
    } else {
      onChange(event);
    }
  };

  const getDateInFormat = (value) => {
    if (value) {
      var day = value.getDate();
      var month = months[value.getMonth()];
      var dayMonthDate = month + " " + day;
      return dayMonthDate;
    }
    return null;
  };

  {
    props.reservedDates &&
      props.reservedDates.map((reservationDates) => {
        return calendarBookedDates(
          reservationDates.checkIn,
          reservationDates.checkOut
        );
      });
  }

  return (
    <div>
      <Calendar
        onChange={onCalendarChange}
        value={value}
        selectRange={true}
        onClick={() => {
          console.log("click", arguments);
        }}
        onClickDay={(value, event) => {
          console.log("click", arguments);
          var day = value.getDate();
          var month = months[value.getMonth()];
          var dayMonthDate = month + " " + day;

          if (checkInSelected) {
            props.setCheckIn(dayMonthDate);
            props.setCheckOut("");
            setCheckInDate(dayMonthDate);
            props.setCheckInAndOutRange(dayMonthDate);
            setCheckInSelected(false);
          } else {
            if (!calendarBookedDates(checkInDate, dayMonthDate, overlapCheck)) {
              setCheckOutDate(dayMonthDate);

              props.setCheckInAndOutRange((prevState) => {
                if (new Date(prevState) > new Date(dayMonthDate)) {
                  props.setCheckIn(dayMonthDate);
                  props.setCheckOut(prevState);

                  if (
                    calendarBookedDates(dayMonthDate, prevState, overlapCheck)
                  ) {
                    setCheckInDate("");
                    setCheckOutDate("");
                    props.setCheckIn("");
                    props.setCheckOut("");
                    props.setCheckInAndOutRange([]);
                  } else {
                    return [dayMonthDate, prevState];
                  }
                } else {
                  props.setCheckIn(prevState);
                  props.setCheckOut(dayMonthDate);
                  return [prevState, dayMonthDate];
                }
              });
            } else {
              setCheckInDate("");
              setCheckOutDate("");
              props.setCheckIn("");
              props.setCheckOut("");
              props.setCheckInAndOutRange([]);
            }
            setCheckInSelected(true);
          }
        }}
        minDate={new Date()}
        tileDisabled={({ date, view }) =>
          view === "month" && // Block day tiles only
          disabledDates.some(
            (disabledDate) =>
              date.getFullYear() === disabledDate.getFullYear() &&
              date.getMonth() === disabledDate.getMonth() &&
              date.getDate() === disabledDate.getDate()
          )
        }
      />
    </div>
  );
}
