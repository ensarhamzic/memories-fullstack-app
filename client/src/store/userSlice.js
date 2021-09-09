import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { token: null, isAuth: false },
  reducers: {
    login(state, action) {
      const { token } = action.payload;
      state.token = token;
      state.isAuth = true;
      localStorage.setItem("token", token);
    },
    logout(state, action) {
      state.token = null;
      state.isAuth = false;
      localStorage.removeItem("token");
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
