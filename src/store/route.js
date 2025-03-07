import { createSlice } from "@reduxjs/toolkit";

const prodSlice = createSlice({
  name: "prod",
  initialState: {
    link: "http://localhost:1000",
  },
  reducers: {},
});

export const prodActions = prodSlice.actions;
export default prodSlice.reducer;

//https://milaan-backend-71ny.onrender.com
