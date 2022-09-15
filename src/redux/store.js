import { configureStore } from "@reduxjs/toolkit";

import listingsSlice from "./actions";
import hostSlice from "./hostAction";
import hostEditSlice from "./hostEdits";
import displayListingsSlice from "./displayListingsAction";
import currentLocationSlice from "./currentLocationAction";
import myReservationsSlice from "./myReservationsAction";
// import profileClickButtonSlice from "./profileClickButtonAction";

export const store = configureStore({
  reducer: {
    listings: listingsSlice,
    host_upload_info: hostSlice,
    host_edits: hostEditSlice,
    display_listings: displayListingsSlice,
    current_location: currentLocationSlice,
    my_reservations: myReservationsSlice,
    // profile_click: profileClickButtonSlice,
  },
});
