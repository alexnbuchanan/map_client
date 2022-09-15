import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Map_Page.css";

export default function Map_Distance(location, currentCoordinate) {
  var lat1 = location.latitude;
  var lon1 = location.longitude;
  var lat2 = currentCoordinate[1];
  var lon2 = currentCoordinate[0];

  var p = 0.017453292519943295; // Math.PI / 180
  var c = Math.cos;
  var a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  var km = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  console.log("KM", km);
  return km / 1.609; //convert to miles and return
}
