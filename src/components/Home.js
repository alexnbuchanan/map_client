import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import map_project_video from "../assets/map_project_video.mp4";

export default function Home() {
  return (
    <div className="video_container">
      <video src={map_project_video} autoPlay loop muted />
      <div className="home_content">
        <Link
          component={RouterLink}
          to="/map_listings"
          style={{
            textDecoration: "none",
            fontSize: "24px",
            color: "white",
            // fontFamily: "interSemiBold",
          }}
        >
          Search for a music space
        </Link>
        <br />
        <Link
          component={RouterLink}
          to="/host_intro"
          style={{
            textDecoration: "none",
            fontSize: "20px",
            color: "white",
            // fontFamily: "interSemiBold",
          }}
        >
          Become a host
        </Link>
      </div>
    </div>
  );
}
