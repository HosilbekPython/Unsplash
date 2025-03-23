import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase/firebaseConfig"; 
import { onAuthStateChanged } from "firebase/auth";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const observeAuthState = () => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(login(user)); 
    } else {
      dispatch(logout());
    }
  });
};

export default authSlice.reducer;
