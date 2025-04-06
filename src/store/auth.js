import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    role: "user",
    userCart: 0,
    poetryPrice: 99,
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    changeRole(state, action) {
      const role = action.payload;
      state.role = role;
    },
    userCart(state, action) {
      const total = action.payload;
      state.userCart = total;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
