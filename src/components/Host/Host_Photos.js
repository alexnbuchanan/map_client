import React, { useState } from "react";
import { Card, Button, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import axios from "axios";
import { SPACE_PHOTOS } from "../../redux/hostAction";
import { useDispatch } from "react-redux";
import useLocalStorage from "../../hooks/useLocalStorage";
import { MdAdd } from "react-icons/md";
import FullPageLoader from ".././FullPageLoader";

export default function Host_Photos() {
  const [uploadedImg, setuploadedImg] = useState([]);

  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const [photos, setPhotos] = useLocalStorage("photos", []);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
    setPreviewSource("");
  };

  const uploadImage = async (base64EncodedImage) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://map-app-server99.herokuapp.com/api/upload",
        {
          method: "POST",
          body: JSON.stringify({ data: base64EncodedImage }),
          headers: { "Content-type": "application/json" },
        }
      );

      const result = await response.json();
      let imageURL;
      for (const [key, value] of Object.entries(result)) {
        imageURL = value;
      }

      setuploadedImg((prevURL) => [...prevURL, imageURL]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid container style={{ position: "relative" }}>
      {loading && <FullPageLoader />}
      <Grid item xs={0} md={4} />
      <Grid item xs={12} md={4}>
        <Card style={{ marginTop: "10%", position: "relative" }}>
          <div className={"host--photos-top-div"}>
            <h1>Upload pictures</h1>
            <Card
              style={{
                height: "100px",
              }}
            >
              {uploadedImg &&
                uploadedImg.map((url, index) => {
                  return (
                    <img
                      key={index}
                      src={url}
                      className={"host--photos-preview-img"}
                    />
                  );
                })}
            </Card>
            <div>
              <form onSubmit={handleSubmitFile} className="form">
                {!previewSource && (
                  <label
                    htmlFor="myInput"
                    className={"host--photos-submit-label "}
                  >
                    <MdAdd
                      style={{
                        color: "white",
                        fontSize: "18px",
                        marginRight: "2px",
                        verticalAlign: "bottom",
                        marginTop: "20px",
                      }}
                    />
                    Photo
                  </label>
                )}

                <input
                  id="myInput"
                  style={{ display: "none" }}
                  type="file"
                  name="image"
                  onChange={handleFileInputChange}
                  value={fileInputState}
                  className="form-input"
                />
                {previewSource && (
                  <div>
                    <img
                      src={previewSource}
                      alt="chosen"
                      className={"host--photos-preview-img2 "}
                    />
                    <br />
                    <Button
                      className="btn"
                      type="submit"
                      style={{
                        textTransform: "none",
                        backgroundColor: "#2a85ff",
                        color: "white",
                        borderRadius: "8px",
                        fontSize: "13px",
                        padding: "8px 35px 8px 35px",
                      }}
                    >
                      Upload image
                    </Button>

                    <Button
                      className="btn"
                      onClick={() => {
                        setPreviewSource("");
                      }}
                      style={{ marginLeft: "5px", textTransform: "none" }}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </form>
            </div>

            <div>
              <Button
                component={RouterLink}
                to="/host_summary"
                onClick={() => setPhotos(uploadedImg)}
                style={{
                  textTransform: "none",
                  color: "#212121",
                  backgroundColor: "transparent",
                  display: "inline-block",
                  paddingLeft: 0,
                  marginTop: "15px",
                  // position: "absolute",
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
