import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  status: "",
  action: "",
}

const notifSlice = createSlice({
  name: "notif",
  initialState: { notif: initialState },
  reducers: {
    showNotif(state, action) {
      state.notif = {
        message: action.payload.message,
        status: action.payload.status,
        action: action.payload.action,
      };
    },
    hideNotif(state) {
      state.notif = initialState;
    },
  },
});
export const { showNotif, hideNotif } = notifSlice.actions;
export const notifData = (state) => state.notif.notif;

export default notifSlice.reducer;
