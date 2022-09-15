import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set, remove } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import {
  DISPLAY_MY_RESERVATIONS,
  REMOVE_MY_RESERVATION,
} from "../../redux/myReservationsAction";
import { LISTINGS_LOAD, REMOVE_RESERVATION } from "../../redux/actions";

import { Card, Button, Grid } from "@mui/material";
import { database, auth } from "./../../firebase";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

export default function My_Reservations() {
  const dispatch = useDispatch();
  const my_reservations = useSelector((state) => state.my_reservations);
  const listings = useSelector((state) => state.listings);
  const user = auth.currentUser;
  const uid = user.uid;

  const submitCommentDelete = (props) => {
    confirmAlert({
      message: "Are you sure you want to cancel?",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            firebaseCancel(
              props.listingKey,
              props.locationKey,
              props.reservationKey
            ),
        },
        {
          label: "No",
        },
      ],
    });
  };

  console.log("++++++++++", my_reservations);

  const firebaseCancel = (listingKey, locationKey, reservationKey) => {
    console.log("NOT WORKING");
    // try {
    //   set(
    //     ref(
    //       database,
    //       `users/${listingDetails.listingKey}/host/${listingDetails.listingDetails.key}/reservations/${uuid}`
    //     ),
    //     {
    //       bookerKey: uid,
    //       dates: rangeValues,
    //     }
    //   );
    //   set(ref(database, `users/${uid}/my_reservations/${uuid}`), {
    //     bookingKey: listingDetails.listingDetails.key,
    //     dates: rangeValues,
    //   });
    // } catch (error) {
    //   console.log({ error });
    // }

    // ref(database, `users/${uid}/my_reservations/${reservationKey}`).set(null);
    debugger;
    remove(ref(database, `users/${uid}/my_reservations/${reservationKey}`));
    remove(
      ref(
        database,
        `users/${listingKey}/host/${locationKey}/reservations/${reservationKey}`
      )
    ).then(
      dispatch(REMOVE_MY_RESERVATION(reservationKey)),
      dispatch(REMOVE_RESERVATION(listingKey, locationKey, reservationKey))
    );

    /* ref(
      database,
      `users/${listingKey}/host/${locationKey}/reservations/${reservationKey}`
    ).set(null);*/

    // database.ref(database, `users/${uid}/my_reservations/${reservationKey}`)
  };

  useEffect(() => {
    try {
      const db = getDatabase();
      const starCountRef = ref(db, "users");

      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        Object.entries(data).map(([key, value]) => {
          if (key === uid && value.my_reservations) {
            const my_reservations_data = Object.entries(value.my_reservations);
            const updated_reservation_data = [];
            my_reservations_data.forEach((reservation) => {
              const [innerK, innerV] = reservation;

              updated_reservation_data.push({
                key: innerK,
                bookingKey: innerV.bookingKey,
                checkIn: innerV.dates.checkIn,
                checkOut: innerV.dates.checkOut,
              });
            });
            dispatch(DISPLAY_MY_RESERVATIONS(updated_reservation_data));
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    try {
      const db = getDatabase();
      const starCountRef = ref(db, "users");
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        // result.push({ ...data, uid: key });

        let listingData = [];
        Object.entries(data).map(([key, value]) => {
          // debugger;
          if (value.host) {
            const hosts = Object.entries(value.host);
            const obj = {
              email: value.email,
              host: [],
              key,
              name: value.name,
            };
            hosts.forEach((host) => {
              const [innerK, innerV] = host;
              // obj.host.push({
              //   description: innerV.description,
              //   key: innerK,
              //   instruments: innerV.instruments,
              //   location: innerV.location,
              //   // reservations: innerV.reservations,
              //   reservations: [],
              // });

              if (innerV.reservations) {
                console.log("LOOOK here", innerV.reservations);
                const listingReservations = Object.entries(innerV.reservations);
                const reservations = [];

                listingReservations.forEach((reservationDetails) => {
                  const [resInnerK, resOuterV] = reservationDetails;
                  reservations.push({
                    key: resInnerK,
                    bookerKey: resOuterV.bookerKey,
                    checkIn: resOuterV.dates.checkIn,
                    checkOut: resOuterV.dates.checkOut,
                  });
                });
                obj.host.push({
                  description: innerV.description,
                  key: innerK,
                  instruments: innerV.instruments,
                  location: innerV.location,
                  reservations: reservations,
                });
              } else {
                obj.host.push({
                  description: innerV.description,
                  key: innerK,
                  instruments: innerV.instruments,
                  location: innerV.location,

                  reservations: [],
                });
              }
            });

            listingData.push(obj);
          } else {
            const obj = {
              email: value.email,
              host: [],
              key,
              name: value.name,
            };
            listingData.push(obj);
          }
        });
        dispatch(LISTINGS_LOAD(listingData));
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  function dayOfWeekAsString(dayIndex) {
    return (
      [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ][dayIndex] || ""
    );
  }

  var monthNames = [
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

  function reservedListing(reservation) {
    console.log("reservations", reservation.key);
    return listings.map((listing) => {
      console.log("Listing", listing.key);
      if (listing.host && listing.host.length >= 1) {
        const location = listing.host.find(
          (loc) => loc.key === reservation.bookingKey
        );
        console.log("location", location.key);
        if (location) {
          return (
            <Grid container style={{ position: "relative" }}>
              <Grid item xs={0} md={4} />
              <Grid item xs={12} md={4}>
                <Card
                  style={{
                    height: "fitContent",
                    margin: "5px",
                  }}
                >
                  <div style={{ padding: "10px 10px 10px 10px" }}>
                    <h2>{location.description.spaceName}</h2>

                    <strong>Details:</strong>
                    <p>{location.description.spaceDescription}</p>

                    <strong>Instruments</strong>
                    <p>{location.instruments}</p>
                    <div>
                      <strong>Host name: </strong>
                      {listing.name}
                    </div>
                    <br />
                    <strong>Check in: </strong>

                    <p>
                      {dayOfWeekAsString(
                        new Date(reservation.checkIn).getDay()
                      ) +
                        " " +
                        monthNames[new Date(reservation.checkIn).getMonth()] +
                        " " +
                        new Date(reservation.checkIn).getDate() +
                        " " +
                        new Date(reservation.checkIn).getFullYear()}
                    </p>
                    <strong>Check out: </strong>
                    <p>
                      {" "}
                      {dayOfWeekAsString(
                        new Date(reservation.checkOut).getDay()
                      ) +
                        " " +
                        monthNames[new Date(reservation.checkOut).getMonth()] +
                        " " +
                        new Date(reservation.checkOut).getDate() +
                        " " +
                        new Date(reservation.checkOut).getFullYear()}
                    </p>

                    <Button
                      style={{
                        backgroundColor: "black",
                        width: "80%",
                        height: "45px",
                        color: "white",

                        bottom: 0,
                        marginBottom: "5px",
                        marginTop: "5px",
                      }}
                      onClick={() =>
                        submitCommentDelete({
                          listingKey: listing.key,
                          locationKey: location.key,
                          reservationKey: reservation.key,
                        })
                      }
                    >
                      Cancel reservation
                    </Button>
                  </div>
                </Card>
              </Grid>
              <Grid item xs={0} md={4} />
            </Grid>
          );
        }
      }
    });
  }

  return (
    <div>
      {my_reservations &&
        my_reservations.map((reservation, index) => {
          return <div>{reservedListing(reservation)}</div>;
        })}
    </div>
  );
}
