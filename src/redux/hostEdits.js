import { createSlice } from "@reduxjs/toolkit";
import { database, auth } from "../firebase";
import { ref, set } from "firebase/database";

export const hostEditSlice = createSlice({
  name: "host_edits",
  initialState: [
    { host_Description_Edit: "false" },
    { host_Instruments_Edit: "false" },
    { host_Location_Edit: "false" },
  ],
  reducers: {
    HOST_DESCRIPTION_EDIT: (state, action) => {
      const index = state.findIndex(({ host_Description_Edit }) =>
        Boolean(host_Description_Edit)
      );

      state[index] = { host_Description_Edit: action.payload };
    },
    HOST_INSTRUMENTS_EDIT: (state, action) => {
      const index = state.findIndex(({ host_Instruments_Edit }) =>
        Boolean(host_Instruments_Edit)
      );

      state[index] = { host_Instruments_Edit: action.payload };
    },
    HOST_LOCATION_EDIT: (state, action) => {
      const index = state.findIndex(({ host_Location_Edit }) =>
        Boolean(host_Location_Edit)
      );

      state[index] = { host_Location_Edit: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  HOST_DESCRIPTION_EDIT,
  HOST_INSTRUMENTS_EDIT,
  HOST_LOCATION_EDIT,
} = hostEditSlice.actions;

export default hostEditSlice.reducer;
