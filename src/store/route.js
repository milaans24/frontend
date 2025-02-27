import { createSlice } from "@reduxjs/toolkit";

const prodSlice = createSlice({
  name: "prod",
  initialState: {
    link: "https://milaan-backend-71ny.onrender.com",
  },
  reducers: {},
});

export const prodActions = prodSlice.actions;
export default prodSlice.reducer;
