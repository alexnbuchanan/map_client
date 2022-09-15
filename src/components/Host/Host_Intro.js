import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { Card, Button, Grid } from "@mui/material";
import "./Host.css";

export default function Host_Intro() {
  return (
    <Grid container style={{ position: "relative" }}>
      <Grid item xs={0} md={4} />
      <Grid item xs={12} md={4}>
        <Card className={"host--intro-card"}>
          <div className={"host--intro-div"}>
            <h1>Become a host.</h1>
            <h1>Ready to get started?</h1>
            <div className={"host--intro-button-div"}>
              <Button
                className="host--intro-button"
                component={RouterLink}
                to="/host_location"
                style={{
                  textTransform: "none",
                  color: "#212121",
                  backgroundColor: "transparent",
                  paddingLeft: "0",
                  position: "absolute",
                  bottom: 0,
                  marginBottom: "5px",
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </Card>
      </Grid>
      <Grid item xs={0} md={4} />
    </Grid>
  );
}
