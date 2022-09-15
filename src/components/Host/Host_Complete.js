import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { Card, Button, Grid } from "@mui/material";

export default function Host_Complete() {
  return (
    <Grid container style={{ position: "relative" }}>
      <Grid item xs={4} />
      <Grid item xs={4}>
        <Card style={{ marginTop: "10%" }}>
          <div style={{ padding: "10px 10px 10px 10px" }}>
            <h1>You're booking is complete!</h1>

            <div
              style={{
                height: "12vh",
                margin: "0 auto",
              }}
            >
              <Button
                component={RouterLink}
                to="/"
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
                Return to listings page
              </Button>
            </div>
          </div>
        </Card>
      </Grid>
      <Grid item xs={4} />
    </Grid>
  );
}
