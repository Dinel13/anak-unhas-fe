import { createSlice } from "@reduxjs/toolkit";
import { AppState } from ".";

export interface authState {
  id: number;
  token: string;
  name: string;
}

const initialState: authState = {
  id: 0,
  token: "",
  name: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const {id, token, name } = action.payload;
      localStorage.setItem("mufas_dae4", "_asda+4234"+id+"Dada32_dsa"+token+"e+dadxas"+name)
      state.id = id;
      state.token = token;
      state.name = name;
    },
    logout: (state) => {
      localStorage.removeItem("mufas_dae4");
      state.id = 0;
      state.token = "";
      state.name = "";
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectName = (state: AppState) => state.auth.name
export const getToken = (state: AppState) => state.auth.token
export default authSlice.reducer;
