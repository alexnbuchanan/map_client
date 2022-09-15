import React, { useState } from "react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";

import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { useSelector, useDispatch } from "react-redux";
import { SPACE_INSTRUMENTS } from "../../redux/hostAction";
import useLocalStorage from "../../hooks/useLocalStorage";
import Alert from "@mui/material/Alert";
import { Card, Button, Grid } from "@mui/material";

export default function Host_Instruments() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(false);

  const [instruments, setInstruments] = useLocalStorage("instruments", []);

  const handleOnchange = (val) => {
    setValue(val);
    setErrorMessage();
  };

  const makingEdits = useSelector(
    (state) =>
      state.host_edits[
        state.host_edits.findIndex(({ host_Instruments_Edit }) =>
          Boolean(host_Instruments_Edit)
        )
      ].host_Instruments_Edit
  );

  const options = [
    { label: "Piano", value: "Piano" },
    { label: "Keyboard", value: "Keyboard" },
    { label: "Drum Set", value: "Drum Set" },
    { label: "Acoustic Guitar", value: "Acoustic Guitar" },
    { label: "Electric Guitar", value: "Electric Guitar" },
    { label: "Bass Guitar", value: "Bass Guitar" },
    { label: "Guitar Amplifier", value: "Guitar Amplifier" },
    { label: "Bass Amplifier", value: "Bass Amplifier" },
    { label: "PA System", value: "PA System" },
  ];

  return (
    <Grid container style={{ position: "relative" }}>
      <Grid item xs={0} md={4} />
      <Grid item xs={12} md={4}>
        <Card style={{ marginTop: "10%", height: "fitContent" }}>
          <div>
            <div className={"host--instruments-top-div"}>
              <h1>What instruments do you have available?</h1>
              {errorMessage && <Alert severity="error">Add instruments</Alert>}

              <MultiSelect
                onChange={handleOnchange}
                options={options}
                style={{ marginBottom: "15px" }}
              />

              {makingEdits == "true" ? (
                <div>
                  <Link
                    component={RouterLink}
                    to={value ? "/host_summary" : "#"}
                    onClick={() =>
                      value ? setInstruments(value) : setErrorMessage(true)
                    }
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
                  // to="/host_photos"
                  to={value ? "/host_photos" : "#"}
                  onClick={() =>
                    value ? setInstruments(value) : setErrorMessage(true)
                  }
                  style={{
                    textTransform: "none",
                    color: "#212121",
                    backgroundColor: "transparent",
                    display: "inline-block",
                    paddingLeft: 0,
                    marginTop: "15px",

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
}
