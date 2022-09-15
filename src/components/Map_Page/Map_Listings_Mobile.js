import React, { useRef, useEffect, useState } from "react";
import { Card, Button, Link, Grid } from "@mui/material";

import { Link as RouterLink, useHistory } from "react-router-dom";
import axios from "axios";
import Map from "./Map";
import { database, auth } from "../../firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import { LISTINGS_LOAD } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Map_Distance from "./Map_Distance";

import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import SimpleSlider from "../SimpleSlider";
import Profile from "../Menu/Profile";
import { makeStyles } from "@material-ui/core/styles";
import Radius from "./Radius";
import FullPageLoader from "../FullPageLoader";
import { useMediaQuery } from "@material-ui/core";
import "./Map_Page.css";
const useStyles = makeStyles({
  // button: {
  //   backgroundColor: "red",
  // },
  imageContainer: {
    display: "flex",
    height: "100%",
  },

  wrapper: {
    display: "flex",
  },

  left: {},

  right: {
    flex: "1",
    marginLeft: "5px",
    margin: "auto",
  },
});

export default function Map_Listings() {
  const [error, setError] = useState("");

  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [ranges, setRanges] = useState([5, 15, 30]);
  const [selectedRangeIndex, setSelectedRangeIndex] = useState(2); // 30 miles default
  const [listViewSelected, setListViewSelected] = useState(false);
  const dispatch = useDispatch();

  const currentCoordinate = useSelector((state) => state.current_location);
  const profileClick = useSelector((state) => state.profile_click);

  const listings = useSelector((state) => state.listings);

  const classes = useStyles();

  useEffect(() => {
    try {
      const db = getDatabase();
      const starCountRef = ref(db, "users");
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        let listingData = [];
        Object.entries(data).map(([key, value]) => {
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

              let host_data = {};
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

                host_data = {
                  description: innerV.description,
                  key: innerK,
                  instruments: innerV.instruments,
                  location: innerV.location,
                  reservations: reservations,
                  listingClickedOnMap: false,
                };
              } else {
                host_data = {
                  description: innerV.description,
                  key: innerK,
                  instruments: innerV.instruments,
                  location: innerV.location,
                  reservations: [],
                  listingClickedOnMap: false,
                };
              }
              host_data.photos = innerV.photos ? innerV.photos : [];

              obj.host.push(host_data);
            });

            obj.host = obj.host.filter((host) => {
              return (
                typeof host &&
                Map_Distance(host.location, currentCoordinate) <=
                  ranges[selectedRangeIndex]
              );
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
        setLoading(false);
      });
    } catch (error) {
      console.error(error);
    }
  }, [currentCoordinate, selectedRangeIndex]);

  const MapDistanceFilter = (index) => {
    setSelectedRangeIndex(index);
  };

  return (
    <div className="wrapper">
      {loading && <FullPageLoader />}
      {profileClick && <Profile />}

      <div className="content">
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <div>
              <Radius distanceFilter={MapDistanceFilter} />
            </div>
          </Grid>
          <Grid item xs={8}>
            <Button
              style={{
                textTransform: "none",
                backgroundColor: "transparent",
                color: "black",
                fontFamily: "interRegular",
              }}
              onClick={() => setListViewSelected((prevCheck) => !prevCheck)}
            >
              {listViewSelected ? "Map View" : "List View"}
            </Button>
          </Grid>
        </Grid>
      </div>

      <div className="map-left-div">
        {!listViewSelected && <Map currentMapListings={true} />}
        {listViewSelected && (
          <div id="divMapRight" className="map-right-div">
            {listings &&
              listings.map((listing, index) => {
                return (
                  listing.host &&
                  listing.host.length > 0 &&
                  listing.host.map((hostData, index) => {
                    return (
                      <div data-image-key={hostData.key} id={index}>
                        <Card style={{ margin: "10px" }}>
                          <Grid
                            container
                            spacing={1}
                            style={{
                              height: "100%",
                              position: "relative",
                            }}
                          >
                            {hostData.listingClickedOnMap && (
                              <div
                                style={{
                                  width: "5px",
                                  height: "100%",
                                  backgroundColor: "#9F18F2",
                                }}
                              ></div>
                            )}

                            <Grid item container direction="column" xs={12}>
                              <Grid item style={{ margin: "1px 1px 1px 1px" }}>
                                <div
                                  className={"map-page--card-background-mobile"}
                                >
                                  <p
                                    className={"map-page--listing-title-mobile"}
                                  >
                                    {" "}
                                    {hostData.description.spaceName}
                                  </p>
                                </div>
                              </Grid>
                              <Grid item>
                                <div
                                  className={
                                    "map-page--listing-listing-details-mobile"
                                  }
                                >
                                  <p className={"map-page--listing-details"}>
                                    Details:
                                  </p>
                                  <p
                                    className={
                                      "map-page--listing-details-notes"
                                    }
                                  >
                                    {" "}
                                    {hostData.description.spaceDescription}
                                  </p>

                                  <p
                                    className={"map-page--listing-instruments"}
                                  >
                                    Instruments available:{" "}
                                  </p>
                                  {hostData.instruments}

                                  <p className={"map-page--listing-host-name"}>
                                    Host name:
                                  </p>
                                  {listing.name}
                                </div>
                              </Grid>
                              <SimpleSlider photos={hostData.photos} />
                              <Grid item>
                                <div>
                                  <Button
                                    style={{
                                      backgroundColor: "#9F18F2",
                                      width: "100%",
                                      marginTop: "10px",
                                      bottom: 0,
                                      marginBottom: "15px",
                                    }}
                                    variant="contained"
                                    component={RouterLink}
                                    to={{
                                      pathname: `/listing/`,
                                      state: {
                                        listingDetails: listing.host[index],
                                        listingIndex: index,
                                        listingHost: listing.name,
                                        listingKey: listing.key,
                                      },
                                    }}
                                  >
                                    Book
                                  </Button>
                                </div>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Card>
                      </div>
                    );
                  })
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
