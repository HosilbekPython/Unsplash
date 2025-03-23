import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import LikeSlike from './likeSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    likes: LikeSlike,
  },
});
