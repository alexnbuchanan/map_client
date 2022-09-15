import { createSlice } from "@reduxjs/toolkit";

export const currentLocationSlice = createSlice({
  name: "current location",
  initialState: [],
  reducers: {
    CURRENT_LOCATION: (state, action) => {
      return (state = action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { CURRENT_LOCATION } = currentLocationSlice.actions;

export default currentLocationSlice.reducer;
