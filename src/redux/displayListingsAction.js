import { createSlice } from "@reduxjs/toolkit";

export const displayListingsSlice = createSlice({
  name: "display_listings",
  initialState: false,
  reducers: {
    DISPLAY_LISTINGS: (state, action) => true,
  },
});

// Action creators are generated for each case reducer function
export const { DISPLAY_LISTINGS } = displayListingsSlice.actions;

export default displayListingsSlice.reducer;
