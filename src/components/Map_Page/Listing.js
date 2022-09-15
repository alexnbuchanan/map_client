import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Button, Grid } from "@mui/material";
import Calendar_App from "./Calendar_App";
import { database, auth } from "./../../firebase";
import { ref, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import SimpleSlider from "../SimpleSlider";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import "./Map_Page.css";

export default function Listing({ location }) {
  const { id } = useParams();

  const listingID = { id };
  const listingDetails = location.state;

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [checkInAndOutRange, setCheckInAndOutRange] = useState([]);
  const reservedDates =
    listingDetails.listingDetails && listingDetails.listingDetails.reservations;
  const photos = listingDetails.listingDetails.photos;

  const uuid = uuidv4();

  const firebaseUpload = () => {
    const user = auth.currentUser;
    const uid = user.uid;

    const rangeValues = {
      checkIn: new Date(
        checkInAndOutRange[0] + ", " + new Date().getFullYear()
      ).toString(),
      checkOut: new Date(
        checkInAndOutRange[1] + ", " + new Date().getFullYear()
      ).toString(),
    };

    try {
      set(
        ref(
          database,
          `users/${listingDetails.listingKey}/host/${listingDetails.listingDetails.key}/reservations/${uuid}`
        ),
        {
          bookerKey: uid,
          dates: rangeValues,
        }
      );
      set(ref(database, `users/${uid}/my_reservations/${uuid}`), {
        bookingKey: listingDetails.listingDetails.key,
        hostKey: listingDetails.listingKey,
        dates: rangeValues,
      });
      setLoading(false);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Grid container style={{ position: "relative" }}>
      <Grid item xs={0} md={4} />
      <Grid item xs={12} md={4}>
        <Card
          style={{
            marginTop: "10%",
            marginBottom: "10%",
            height: "fitContent",
          }}
        >
          <div className={"map-page--listing-padding"}>
            <h2>
              {location.state.listingDetails &&
                location.state.listingDetails.description.spaceName}
            </h2>

            <strong>Details: </strong>
            <p>
              {location.state.listingDetails &&
                location.state.listingDetails.description.spaceDescription}
            </p>

            <strong>Instruments: </strong>
            <p>
              {location.state.listingDetails &&
                location.state.listingDetails.instruments}
            </p>

            <div>
              <strong>Host name: </strong>
              {location.state.listingHost && location.state.listingHost}
            </div>
            <br />
            <strong>Photos: </strong>
            <div className={"map-page--listing-padding-2"}>
              <SimpleSlider photos={photos} />
            </div>
            <br />
            <h2>Check in: {checkIn}</h2>
            <h2>Check out: {checkOut}</h2>
            <div>
              <Calendar_App
                setCheckIn={setCheckIn}
                setCheckOut={setCheckOut}
                setCheckInAndOutRange={setCheckInAndOutRange}
                reservedDates={reservedDates}
              />
            </div>
            <br />
            <br />
            <div>
              {checkInAndOutRange.length === 2 && (
                <Button
                  component={RouterLink}
                  to="/"
                  style={{
                    backgroundColor: "#9F18F2",
                    width: "100%",
                    height: "45px",
                    color: "white",
                    // position: "absolute",
                    bottom: 0,
                    marginBottom: "5px",
                  }}
                  onClick={firebaseUpload}
                >
                  Book
                </Button>
              )}
            </div>
          </div>
        </Card>
      </Grid>
      <Grid item xs={0} md={4} />
    </Grid>
  );
}
