import { configureStore } from "@reduxjs/toolkit";
import prodReducer from "./route";
import authReducer from "./auth";
const store = configureStore({
  reducer: {
    auth: authReducer,
    prod: prodReducer,
  },
});
export default store;
