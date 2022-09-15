import { createSlice } from "@reduxjs/toolkit";

export const myReservationsSlice = createSlice({
  name: "my_reservations",
  initialState: [],
  reducers: {
    DISPLAY_MY_RESERVATIONS: (state, action) => {
      // state.splice(0, state.length, ...action.payload);
      return (state = action.payload);
    },
    REMOVE_MY_RESERVATION: (state, action) => {
      console.log("STATETEETE", state);

      let finalIndex = state.findIndex(
        (reservation) => reservation.key === action.payload
      );

      let updatedReservations = state.filter(
        (reservation, index) => index !== finalIndex
      );

      return (state = updatedReservations);
      // let reservationIndex;
      // const findIndex = state.map((reservation, index) => {
      //   if (reservation.key === action.payload) {
      //     reservationIndex = index;
      //   }
      // });
      // const updatedReservatitonList = findIndex.splice(findIndex, 1);
      // return (state = updatedReservatitonList);
    },
  },
});

// Action creators are generated for each case reducer function
export const { DISPLAY_MY_RESERVATIONS, REMOVE_MY_RESERVATION } =
  myReservationsSlice.actions;

export default myReservationsSlice.reducer;
