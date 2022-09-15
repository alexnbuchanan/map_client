import React, { useState } from "react";
import styled from "styled-components";
import Host_useInput from "./Host_useInput";
import Input from "@mui/material/Input";
import Alert from "@mui/material/Alert";

import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { useSelector, useDispatch } from "react-redux";
import { SPACE_LOCATION_LNG_LAT } from "../../redux/hostAction";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Card, Button, Grid } from "@mui/material";

const Host_Location = () => {
  const address = Host_useInput("");
  const [errorMessage, setErrorMessage] = useState(false);

  const [addressClicked, setAddressClicked] = useState("");

  const [location, setLocation] = useLocalStorage("location", []);

  const dispatch = useDispatch();

  const makingEdits = useSelector(
    (state) =>
      state.host_edits[
        state.host_edits.findIndex(({ host_Location_Edit }) =>
          Boolean(host_Location_Edit)
        )
      ].host_Location_Edit
  );

  return (
    <Grid container style={{ position: "relative" }}>
      <Grid item xs={0} md={4} />
      <Grid item xs={12} md={4}>
        <Card style={{ marginTop: "10%", height: "fitContent" }}>
          <div className={"host--location-card-div"}>
            {errorMessage && (
              <Alert severity="error">
                Add the address of your rental space
              </Alert>
            )}
            <h1>Where is your space located?</h1>
            <div className={"host--location-input-div"}>
              <div
                style={{
                  padding: "50px 0",
                  display: "grid",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Input
                  placeholder="Address"
                  {...address} /* i don't understand this syntax */
                  disableUnderline={true}
                  style={{
                    width: "400px",
                    background: "#F0F0F0",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "30px",
                    position: "relative",
                    display: "grid",
                    justifySelf: "center",
                  }}
                />
                {address.suggestions?.length > 0 && (
                  <div
                    // style={{
                    //   background: "#F0F0F0",
                    //   justifySelf: "center",
                    //   width: "360px",
                    //   padding: "30px 20px 20px 20px",
                    //   borderRadius: "0px 0px 30px 30px",
                    //   border: "none",
                    //   marginTop: "-25px",
                    // }}
                    className={"host--location-input-inner-div"}
                  >
                    {address.suggestions.map((suggestion, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            address.setValue(suggestion.place_name);

                            // dispatch(SPACE_LOCATION_LNG_LAT(suggestion.center));

                            setAddressClicked(suggestion.center);

                            address.setSuggestions([]);
                          }}
                          className={"host--location-input-field"}
                        >
                          {suggestion.place_name}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {makingEdits == "true" ? (
                <div>
                  <Link
                    component={RouterLink}
                    to={addressClicked ? "/host_summary" : "#"}
                    onClick={() => {
                      setLocation({
                        longitude: addressClicked[0],
                        latitude: addressClicked[1],
                      });
                    }}
                  >
                    Update
                  </Link>
                  <br />
                  <Link component={RouterLink} to={"/host_summary"}>
                    Cancel
                  </Link>
                </div>
              ) : (
                <Button
                  component={RouterLink}
                  to={addressClicked ? "/host_description" : "#"}
                  onClick={() => {
                    addressClicked ? null : setErrorMessage(true);
                    setLocation({
                      longitude: addressClicked[0],
                      latitude: addressClicked[1],
                    });
                  }}
                  style={{
                    textTransform: "none",
                    color: "#212121",
                    backgroundColor: "transparent",
                    display: "inline-block",
                    paddingLeft: 0,
                    position: "absolute",
                    bottom: 0,
                    marginBottom: "5px",
                  }}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </Card>
      </Grid>
      <Grid item xs={0} md={4} />
    </Grid>
  );
};

export default Host_Location;
