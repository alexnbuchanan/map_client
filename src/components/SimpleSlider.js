// import "./styles.css";
import { useEffect } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import { useSelector } from "react-redux";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";

export default function SimpleSlider(props) {
  // const images = [
  //   {
  //     url: "https://res.cloudinary.com/dkxoownf4/image/upload/v1650505990/map_pics/nivoe8umkv6ymqhzbnsl.jpg",
  //   },
  //   {
  //     url: "https://res.cloudinary.com/dkxoownf4/image/upload/v1650505995/map_pics/suxxvzgx2iae2g2aoxuv.jpg",
  //   },
  // ];

  const images =
    props?.photos?.map((photoUrl) => {
      console.log("phototototo", photoUrl);
      return { url: photoUrl };
    }) || [];

  console.log("TIGER", props.photos);

  return (
    <div style={{ width: "100%" }}>
      {images?.length > 0 ? (
        <div className="simpleSlider">
          <SimpleImageSlider
            showNavs="true"
            width={"100%"}
            // height={304}
            height={304}
            images={images}
            showBullets={false}
          />
        </div>
      ) : (
        <div style={{ height: "304px", position: "relative" }}>
          <div style={{ top: "50%", left: "50%", position: "absolute" }}>
            <NoPhotographyIcon />
          </div>
        </div>
      )}
    </div>
  );
}
