import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { useAuth } from "./../../contexts/AuthContext";
import { Card, Button, Link, Grid } from "@mui/material";
import { Link as RouterLink, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({}));

export default function Profile() {
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      localStorage.clear();
      console.log({ history });
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <Card className="menu-card">
      <Button
        component={RouterLink}
        to={{
          pathname: `/my-reservations/`,
        }}
        disableRipple
        style={{ textTransform: "none", color: "black", marginTop: "15px" }}
      >
        My Reservations
      </Button>
      <div className="logout-btn">
        <Button
          component={RouterLink}
          to={{
            pathname: `/my-guests/`,
          }}
          disableRipple
          style={{ textTransform: "none", color: "black" }}
        >
          My Guests
        </Button>
      </div>

      <div className="logout-btn">
        <Button
          onClick={handleLogout}
          disableRipple
          style={{ textTransform: "none", color: "black" }}
        >
          Log Out
        </Button>
      </div>
    </Card>
  );
}
