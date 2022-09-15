import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { database, auth } from "../../firebase";
import { Card, Button, Grid } from "@mui/material";
import { getDatabase, ref, onValue, set, remove } from "firebase/database";
import { LISTINGS_LOAD } from "../../redux/actions";

export default function My_Guests() {
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings);
  const user = auth.currentUser;
  const uid = user.uid;

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

  function guestInfo(bookerKey, prop2) {
    return listings.map((listing) => {
      if (listing.key === bookerKey && prop2 === "name") {
        return listing.name;
      }
      if (listing.key === bookerKey && prop2 === "email") {
        return listing.email;
      }
    });
  }

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

  return listings.map((listing) => {
    if (listing.key === uid) {
      return (
        listing.host &&
        listing.host.map((hostListing) => {
          if (hostListing.reservations.length >= 1) {
            return (
              <Grid container style={{ position: "relative" }}>
                <Grid item xs={0} md={4} />
                <Grid item xs={12} md={4}>
                  <Card style={{ padding: "5px", margin: "5px" }}>
                    <h3>{hostListing.description.spaceName}</h3>
                    {hostListing.reservations.map((reservation) => {
                      return (
                        <Card
                          style={{
                            backgroundColor: "#F5F5F5",
                            margin: "10px",
                            padding: "10px",
                          }}
                        >
                          <div>
                            <strong>Guest name: </strong>
                            {guestInfo(reservation.bookerKey, "name")}
                          </div>
                          <div>
                            <strong>Guest e-mail: </strong>
                            {guestInfo(reservation.bookerKey, "email")}
                          </div>
                          <div>
                            <strong>Check in: </strong>

                            {dayOfWeekAsString(
                              new Date(reservation.checkIn).getDay()
                            ) +
                              " " +
                              monthNames[
                                new Date(reservation.checkIn).getMonth()
                              ] +
                              " " +
                              new Date(reservation.checkIn).getDate() +
                              " " +
                              new Date(reservation.checkIn).getFullYear()}
                          </div>
                          <div>
                            <strong>Check out: </strong>

                            {dayOfWeekAsString(
                              new Date(reservation.checkOut).getDay()
                            ) +
                              " " +
                              monthNames[
                                new Date(reservation.checkOut).getMonth()
                              ] +
                              " " +
                              new Date(reservation.checkOut).getDate() +
                              " " +
                              new Date(reservation.checkOut).getFullYear()}
                          </div>
                        </Card>
                      );
                    })}
                  </Card>
                </Grid>
                <Grid item xs={0} md={4} />
              </Grid>
            );
          }
        })
      );
    }
  });
}
