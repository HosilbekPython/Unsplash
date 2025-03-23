import { configureStore } from "@reduxjs/toolkit";
import authReducer, { observeAuthState } from "./authSlice"; 
import LikeSlice from './likeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    likes: LikeSlice,
  },
});

store.dispatch(observeAuthState());

export default store;
