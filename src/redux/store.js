import { configureStore } from "@reduxjs/toolkit";
import authReducer, { observeAuthState } from "./authSlice"; 
import LikeSlice from './likeSlice';
import themeReducer from "./themeSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    likes: LikeSlice,
    theme: themeReducer,
  },
});

store.dispatch(observeAuthState());

export default store;
