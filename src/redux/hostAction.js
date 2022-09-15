import { createSlice } from "@reduxjs/toolkit";
import useLocalStorage from "../hooks/useLocalStorage";
import { database, auth } from "../firebase";
import { ref, set } from "firebase/database";

export const hostSlice = createSlice({
  name: "host_upload",
  initialState: [],
  reducers: {
    SPACE_LOCATION_LNG_LAT: (state, action) => {
      // assuming no null or undefined in state
      // i.e. nothing like [null, { lnglat: "ABC" }]
      const index = state.findIndex(({ lnglat }) => Boolean(lnglat));
      if (index === -1) {
        state.push({ lnglat: action.payload });
      } else {
        state[index] = { lnglat: action.payload };
      }
    },
    SPACE_DESCRIPTION: (state, action) => {
      const indexName = state.findIndex(({ spaceName }) => Boolean(spaceName));
      // const indexDescription = state.findIndex(({ spaceDescription }) =>
      //   Boolean(spaceDescription)
      // );

      if (indexName === -1) {
        state.push({
          spaceName: action.payload.spaceName,
          spaceDescription: action.payload.spaceDescription,
        });
      } else {
        state[indexName] = {
          spaceName: action.payload.spaceName,
          spaceDescription: action.payload.spaceDescription,
        };
      }

      // state.push({
      //   spaceName: action.payload.spaceName,
      //   spaceDescription: action.payload.spaceDescription,
      // });
    },
    SPACE_INSTRUMENTS: (state, action) => {
      const index = state.findIndex(({ spaceInstruments }) =>
        Boolean(spaceInstruments)
      );
      if (index === -1) {
        const instruments = action.payload.split(",");
        state.push({ spaceInstruments: instruments });
      } else {
        const instruments = action.payload.split(",");
        state[index] = { spaceInstruments: instruments };
      }
      // const instruments = action.payload.split(",");
      // state.push({ spaceInstruments: instruments });
    },
    SPACE_PHOTOS: (state, action) => {
      console.log("LION", action.payload);
      const index = state.findIndex(({ spacePhotos }) => Boolean(spacePhotos));
      if (index === -1) {
        state.push({ spacePhotos: action.payload });
      } else {
        state[index] = { spacePhotos: action.payload };
      }
    },
    HOST_DATA_UPLOAD: (state, action) => {
      const user = auth.currentUser;
      const uid = user.uid;

      // const [photos, setPhotos] = useLocalStorage("photos", []);
      // const [description, setDescription] = useLocalStorage("description", []);
      // const [location, setLocation] = useLocalStorage("location", []);
      // const [instruments, setInstruments] = useLocalStorage("instruments", []);

      // set(ref(database, `users/${uid}/host`), {
      //   photos: photos,
      //   description: description,
      //   location: location,
      //   instruments: uinstruments,
      // });
    },
  },
});

export const {
  SPACE_LOCATION_LNG_LAT,
  SPACE_DESCRIPTION,
  SPACE_INSTRUMENTS,
  SPACE_PHOTOS,
  HOST_DATA_UPLOAD,
} = hostSlice.actions;

export default hostSlice.reducer;
