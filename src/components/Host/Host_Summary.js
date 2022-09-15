import React from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

import Map from "./../Map_Page/Map";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { useDispatch } from "react-redux";
import {
  HOST_DESCRIPTION_EDIT,
  HOST_INSTRUMENTS_EDIT,
  HOST_LOCATION_EDIT,
} from "../../redux/hostEdits";
import { HOST_DATA_UPLOAD } from "../../redux/hostAction";
import { database, auth } from "../../firebase";
import { ref, set } from "firebase/database";

import { v4 as uuidv4 } from "uuid";
import { Card, Button, Grid } from "@mui/material";
import SimpleSlider from ".././SimpleSlider";

export default function Host_Summary() {
  const [description, setDescription] = useLocalStorage("description", []);
  const [instruments, setInstruments] = useLocalStorage("instruments", []);
  const [location, setLocation] = useLocalStorage("location", []);
  const [locationAddress, setLocationAddress] = useLocalStorage("address", []);
  const [photos, setPhotos] = useLocalStorage("photos", []);

  const instrumentsList = instruments.split(",");

  const dispatch = useDispatch();

  const firebaseUpload = () => {
    const user = auth.currentUser;
    const uid = user.uid;

    const uuid = uuidv4();

    // console.log(
    //   { description },
    //   { instruments },
    //   { location },
    //   { photos },
    //   { uid }
    // );

    /* database.ref(`users/${uid}/host`).set({
      photos: photos,
      description: description,
      location: location,
      instruments: instruments,
    });*/
    try {
      set(ref(database, `users/${uid}/host/${uuid}`), {
        photos: photos,
        description: description,
        location: location,
        instruments: instruments,
      });
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
          <div className={"host--summary-top-div"}>
            <h1>Summary</h1>
            <div sx={{ width: "40%" }}>
              <div>
                <strong>Space name:</strong> {description.spaceName}
                <Link
                  component={RouterLink}
                  to="/host_description"
                  onClick={() => {
                    dispatch(HOST_DESCRIPTION_EDIT("true"));
                  }}
                  style={{
                    color: "#939393",
                    textDecorationColor: "#939393",
                    fontSize: "12px",
                    marginLeft: "10px",
                  }}
                >
                  Edit
                </Link>
              </div>
              <hr />
              <div>
                <strong>Space description:</strong>{" "}
                {description.spaceDescription}
                <Link
                  component={RouterLink}
                  to="/host_description"
                  onClick={() => {
                    dispatch(HOST_DESCRIPTION_EDIT("true"));
                  }}
                  style={{
                    color: "#939393",
                    textDecorationColor: "#939393",
                    fontSize: "12px",
                    marginLeft: "10px",
                  }}
                >
                  Edit
                </Link>
              </div>
              <hr />
              <div>
                <strong>Space instruments:</strong>
                {instrumentsList &&
                  instrumentsList.map((instrumentName, index) => {
                    return <div key={index}> {instrumentName}</div>;
                  })}
                <Link
                  component={RouterLink}
                  to="/host_instruments"
                  onClick={() => {
                    dispatch(HOST_INSTRUMENTS_EDIT("true"));
                  }}
                  style={{
                    color: "#939393",
                    textDecorationColor: "#939393",
                    fontSize: "12px",
                  }}
                >
                  Edit
                </Link>
              </div>
              <hr />
              <div>
                <strong>Space Address: </strong>
                <p>{locationAddress}</p>

                <div className="wrapper-host-summary-summary-page-version">
                  <Map lngLatHostSummary={location} />
                </div>
                <Link
                  component={RouterLink}
                  to="/host_location"
                  onClick={() => {
                    dispatch(HOST_LOCATION_EDIT("true"));
                  }}
                  style={{
                    color: "#939393",
                    textDecorationColor: "#939393",
                    fontSize: "12px",
                  }}
                >
                  Edit
                </Link>
              </div>
              <hr />
              <div>
                <strong>Space Photos: </strong>
                {/* <EmblaCarousel photos={photos} /> */}
                <div className={"host--summary-photo-div"}>
                  <SimpleSlider photos={photos} />
                </div>
              </div>
            </div>
            <hr />
            <Button
              component={RouterLink}
              to="/host_complete"
              style={{
                backgroundColor: "#9F18F2",

                width: "100%",
                height: "45px",
                color: "white",
                // position: "absolute",
                bottom: 0,
                marginBottom: "5px",
                marginTop: "10px",
              }}
              onClick={firebaseUpload}
            >
              Submit
            </Button>
          </div>
        </Card>
      </Grid>
      <Grid item xs={0} md={4} />
    </Grid>
  );
}
