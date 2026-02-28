// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";
import dashboardSlice from "./slices/dashboardSlice";
import pageSlice from "./slices/pageSlice";
import attendanceSlice from "./slices/attendanceSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    dashboard: dashboardSlice,
    pages: pageSlice,
    attendance:attendanceSlice ,
  },
});
