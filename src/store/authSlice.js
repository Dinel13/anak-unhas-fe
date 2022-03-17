import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  name: null,
  id: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      const { token, id, name} = action.payload;
      localStorage.setItem(
        "jdsaudsau@23",
        JSON.stringify(`${token}9gTe1Sku${id}9gTe1Sku${name}`)
      );
      state.token = token;
      state.id = id;
      state.name = name;
    },
    logout(state) {
      localStorage.removeItem("jdsaudsau@23");
      state.token = null;
      state.id = null;
      state.name = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectToken = (state) => state.auth.token;
export const selectUserId = (state) => state.auth.id;
export const selectName = (state) => state.auth.name;
export default authSlice.reducer;
