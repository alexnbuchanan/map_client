import React, { useRef, useEffect, useState } from "react";
import { Card, Button, Link } from "@mui/material";
import { useAuth } from "./../../contexts/AuthContext";
import { Link as RouterLink, useHistory } from "react-router-dom";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import axios from "axios";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useSelector, useDispatch } from "react-redux";
import { DISPLAY_LISTINGS } from "../../redux/displayListingsAction";
import { CURRENT_LOCATION } from "../../redux/currentLocationAction";
import { LISTINGS_LOAD, MAP_LISTING_CLICKED } from "../../redux/actions";
import Map_Distance from "./Map_Distance";

import mapboxgl from "!mapbox-gl";
import { MarkunreadSharp } from "@material-ui/icons";
import { useMediaQuery, useTheme } from "@material-ui/core";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

export default function Map(props) {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-73.98513);
  const [lat, setLat] = useState(40.758896);
  const [zoom, setZoom] = useState(9);
  const [currentMarker, setCurrentMarker] = useState([]);

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("xs"));

  const dispatch = useDispatch();

  const listings = useSelector((state) => state.listings);

  class ClickableMarker extends mapboxgl.Marker {
    onClick(handleClick) {
      this._handleClick = handleClick;
      return this;
    }

    _onMapClick(e) {
      const targetElement = e.originalEvent.target;
      const element = this._element;

      if (
        this._handleClick &&
        (targetElement === element || element.contains(targetElement))
      ) {
        this._handleClick();
      }
    }
  }

  const handleMobileViewClick = (state) =>
    history.push({
      pathname: `/listing/`,
      state: state,
    });

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],

      zoom: zoom,
    })

      .addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
          marker: {
            color: "black",
          },
        }).on("result", function (e) {
          dispatch(CURRENT_LOCATION(e.result.center));
        })
      )
      .addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },

          trackUserLocation: true,

          showUserHeading: true,
        }).on("geolocate", function (position) {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          dispatch(CURRENT_LOCATION([lng, lat]));
        })
      )
      .resize();
    if (props.currentMapListings) {
      getLatLng();
    }
    if (props.lngLatHostSummary) {
      let listingLngLat = Object.values(props.lngLatHostSummary);
      setLat(listingLngLat[1]);
      setLng(listingLngLat[0]);
    }
  }, []);

  useEffect(() => {
    if (lat && lng) {
      map.current.setCenter([lng, lat]);
    }
  }, [lat, lng]);

  useEffect(() => {
    if (props?.currentMapListings) {
      currentMarker.forEach((marker) => marker.remove());
      setCurrentMarker([]);
      let currentMarkers = [];
      listings.forEach((listingData) => {
        if (listingData.host) {
          if (listingData.host.length < 1) {
            return;
          }

          listingData.host.forEach((host, index) => {
            let marker = new ClickableMarker({ color: "#9F18F2" });
            const newMarker = marker
              .setLngLat([host.location.longitude, host.location.latitude])
              .addTo(map.current)
              .onClick(() => {
                let listingKey = `${listingData.key}`;
                let locationKey = `${host.key}`;
                const state = {
                  listingDetails: listingData.host[index],
                  listingIndex: index,
                  listingHost: listingData.name,
                  listingKey: listingData.key,
                };
                isMatch
                  ? handleMobileViewClick(state)
                  : dispatch(MAP_LISTING_CLICKED({ listingKey, locationKey }));
                const divTarget = document.querySelector(
                  `[data-image-key="${locationKey}"]`
                );
                if (divTarget) {
                  const padding = 4;
                  const div = document.getElementById("divMapRight");
                  const bottom =
                    div.scrollTop +
                    (div.offsetHeight - padding) -
                    divTarget.offsetHeight;
                  const top = div.scrollTop + padding;
                  if (
                    divTarget.offsetTop <= top &&
                    divTarget.offsetTop > divTarget.offsetHeight
                  ) {
                    div.scrollTop = divTarget.offsetTop - padding;
                  } else if (divTarget.offsetTop >= bottom) {
                    div.scrollTop =
                      divTarget.offsetTop -
                      (div.offsetHeight - padding - divTarget.offsetHeight);
                  } else {
                    let scrollTo = divTarget.offsetTop - divTarget.offsetHeight;
                    scrollTo = scrollTo > -1 ? scrollTo : 0;
                    div.scrollTop = scrollTo;
                  }
                } else {
                  console.log(`divTarget for key ${locationKey} not found`);
                }
              });
            currentMarkers.push(newMarker);
          });
        }
      });
      setCurrentMarker(currentMarkers);
    }

    if (props?.lngLatHostSummary) {
      if (map && map.current) {
        let listingLngLat = Object.values(props.lngLatHostSummary);

        new mapboxgl.Marker().setLngLat(listingLngLat).addTo(map.current);
      }
    }
  }, [listings]);

  const getLatLng = async () => {
    try {
      const { data } = await axios.get(
        "https://ipgeolocation.abstractapi.com/v1/?api_key=aba91a7ee1144621952e0de32c00f005"
      );
      setLat(data.latitude);
      setLng(data.longitude);
      dispatch(CURRENT_LOCATION([data.longitude, data.latitude]));
    } catch (error) {
      console.log(error);
    }
  };

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.pushState("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return isMatch ? (
    <div className={props?.currentMapListings && "map-wrapper-mobile"}>
      <div ref={mapContainer} id="map" />
    </div>
  ) : (
    <div
      className={
        props?.currentMapListings ? "map-wrapper" : "map-wrapper-host-summary"
      }
    >
      <div ref={mapContainer} id="map" />
    </div>
  );
}
