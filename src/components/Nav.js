import React, { useState, useEffect, useRef } from "react";
// import "./App.css";
import { Link } from "react-router-dom";
import {
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
// import useStyles from "./styles.js";
import { makeStyles } from "@material-ui/core/styles";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { PROFILE_CLICK } from "../redux/profileClickButtonAction";
import Hamburger from "hamburger-react";
import Profile from "././Menu/Profile";

const useStyles = makeStyles((theme) => ({
  navBar: {
    background: "white",
  },

  buttonFont: {
    fontSize: 12,
  },
}));

function Nav() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    });
  });

  let menuRef = useRef();

  return (
    <div>
      <CssBaseline />

      <AppBar position="relative" elevation={0}>
        <Toolbar className={classes.navBar}>
          <Grid container>
            <Grid item xs={4}>
              <div style={{ paddingTop: "6px" }}>
                <Button
                  disableRipple
                  to={"/"}
                  component={Link}
                  style={{
                    textTransform: "none",
                    color: "black",
                    backgroundColor: "transparent",
                  }}
                >
                  <p
                    style={{
                      margin: "0px 0px 0px 0px",
                      fontFamily: "interMedium",
                    }}
                  >
                    Soundspace
                  </p>
                </Button>
              </div>
            </Grid>

            <Grid item xs={7} />

            <Grid item xs={1}>
              <div
                style={{ float: "right", position: "relative" }}
                ref={menuRef}
              >
                <Hamburger
                  toggled={isOpen}
                  toggle={setOpen}
                  color="#000000"
                  size={20}
                />

                {isOpen && <Profile />}
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Nav;
