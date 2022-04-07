import { createSlice } from "@reduxjs/toolkit";
import { AppState } from ".";

export interface authState {
  id: string;
  token: string;
  name: string;
}
export interface actionAuth {
  payload: authState;
  type: string;
}

const initialState: authState = {
  id: "",
  token: "",
  name: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: actionAuth) => {
      const {id, token, name } = action.payload;
      localStorage.setItem("_ayt-has", id+"e+das"+token+"e+das"+name)
      state.id = id;
      state.token = token;
      state.name = name;
    },
    logout: (state) => {
      localStorage.removeItem("_ayt-has");
      state.id = "";
      state.token = "";
      state.name = "";
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectName = (state: AppState) => state.auth.name
export const getToken = (state: AppState) => state.auth.token
export const selectId = (state: AppState) => state.auth.id
export default authSlice.reducer;
