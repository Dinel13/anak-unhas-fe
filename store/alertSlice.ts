import { createSlice } from "@reduxjs/toolkit";
import { AppState } from ".";

export interface alertState {
  message: string,
  status: string,
}

const initialState: alertState = {
  message: "",
  status: "",
}

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert(state, action) {
      const { message, status} = action.payload;
      state.message = message;
      state.status = status;
    },
    hideAlert(state) {
      state.message = "";
      state.status = "";
    },
  },
});
export const { showAlert, hideAlert } = alertSlice.actions;
export const alertData = (state : AppState) => state.alert;

export default alertSlice.reducer;
