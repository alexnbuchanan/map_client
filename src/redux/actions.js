import { createSlice } from "@reduxjs/toolkit";

export const listingsSlice = createSlice({
  name: "listings",
  initialState: [],
  reducers: {
    LISTINGS_LOAD: (state, action) => {
      // action.payload.map((listings) => {
      //   state.push(listings);
      // });
      state.splice(0, state.length, ...action.payload);
    },
    REMOVE_RESERVATION: (state, action) => {
      const { listingKey, locationKey, reservationKey } = action.payload;

      return state.map((user) => {
        if (user.key === listingKey) {
          return {
            ...user,
            host: user.host.map((listing) => {
              if (listing.key === locationKey) {
                return {
                  ...listing,
                  reservations: listing.reservation.filter(
                    (removeReservation, index) =>
                      removeReservation.key === reservationKey
                  ),
                };
              } else {
                return listing;
              }
            }),
          };
        } else {
          return user;
        }
      });
    },
    MAP_LISTING_CLICKED: (state, action) => {
      const { locationKey, listingKey } = action.payload;

      return state.map((user) => {
        if (user.key === listingKey) {
          return {
            ...user,
            host: user.host.map((listing) => {
              if (listing.key === locationKey) {
                return {
                  ...listing,
                  listingClickedOnMap: true,
                };
              } else {
                return {
                  ...listing,
                  listingClickedOnMap: false,
                };
              }
            }),
          };
        } else {
          return user;
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { LISTINGS_LOAD, REMOVE_RESERVATION, MAP_LISTING_CLICKED } =
  listingsSlice.actions;

export default listingsSlice.reducer;
