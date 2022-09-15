import React, { useState } from "react";
import Input from "@mui/material/Input";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { useSelector, useDispatch } from "react-redux";
import { SPACE_DESCRIPTION } from "../../redux/hostAction";
import Alert from "@mui/material/Alert";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Card, Button, Grid } from "@mui/material";

export default function Host_Description() {
  const [spaceName, setSpaceName] = useState("");
  const [spaceDescription, setSpaceDescription] = useState("");
  const [errorNameMessage, setNameErrorMessage] = useState(false);
  const [errorDescriptionMessage, setErrorDescriptionMessage] = useState(false);

  const makingEdits = useSelector(
    (state) =>
      state.host_edits[
        state.host_edits.findIndex(({ host_Description_Edit }) =>
          Boolean(host_Description_Edit)
        )
      ].host_Description_Edit
  );

  const [description, setDescription] = useLocalStorage("description", []);

  const dispatch = useDispatch();

  // const handleSubmit = (evt) => {
  //   evt.preventDefault();
  //   if (!spaceName && !spaceDescription) return;
  //   dispatch(SPACE_DESCRIPTION({ spaceName, spaceDescription }));

  //   setSpaceName("");
  // };

  const onInputChangeName = (event) => {
    setSpaceName(event.target.value);
  };

  const onInputChangeDescription = (event) => {
    setSpaceDescription(event.target.value);
  };

  return (
    <Grid container style={{ position: "relative" }}>
      <Grid item xs={0} md={4} />
      <Grid item xs={12} md={4}>
        <Card style={{ marginTop: "10%", height: "fitContent" }}>
          <div className={"host--description-card-div"}>
            <h1>Tell us about the space</h1>
            <h2 className={"host--description-title"}>Name your space</h2>
            {errorNameMessage && (
              <Alert severity="error">Add the name of your rental space</Alert>
            )}

            <input
              type="text"
              value={spaceName}
              onChange={onInputChangeName}
              placeholder="Name"
              className={"host--description-name-input"}
            />

            <h2 className={"host--description-title2"}>Describe your space</h2>
            {errorDescriptionMessage && (
              <Alert severity="error">
                Add the description of your rental space
              </Alert>
            )}

            <input
              type="text"
              value={spaceDescription}
              onChange={onInputChangeDescription}
              placeholder="Description"
              className={"host--description-describe-input"}
            />

            <div>
              {makingEdits == "true" ? (
                <div>
                  <Link
                    component={RouterLink}
                    to={spaceName && spaceDescription ? "/host_summary" : "#"}
                    onClick={() => {
                      setDescription({ spaceName, spaceDescription });
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
                  to={spaceName && spaceDescription ? "/host_instruments" : "#"}
                  onClick={() => {
                    !spaceName
                      ? setNameErrorMessage(true)
                      : setNameErrorMessage(false);
                    !spaceDescription
                      ? setErrorDescriptionMessage(true)
                      : setErrorDescriptionMessage(false);
                    // dispatch(SPACE_DESCRIPTION({ spaceName, spaceDescription }));
                    setDescription({ spaceName, spaceDescription });
                  }}
                  style={{
                    textTransform: "none",
                    color: "#212121",
                    backgroundColor: "transparent",
                    display: "inline-block",
                    paddingLeft: 0,
                    marginTop: "15px",

                    bottom: 0,
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
