import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const savedUser = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedUser || null,
    isLoggedIn: !!savedUser,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(action.payload)); 
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;

export const observeAuthState = () => (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const accessToken = await user.getIdToken();
        
        const payload = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "No Name",
          emailVerified: user.emailVerified,
          phoneNumber: user.phoneNumber || "Noma’lum",
          photoURL: user.photoURL || "",
          accessToken, 
          metadata: {
            createdAt: user.metadata?.creationTime || "Noma’lum",
            lastLoginAt: user.metadata?.lastSignInTime || "Noma’lum",
          },
          providerData: user.providerData.map((provider) => ({
            displayName: provider.displayName || "Noma’lum",
            email: provider.email || "Noma’lum",
            phoneNumber: provider.phoneNumber || "Noma’lum",
            photoURL: provider.photoURL || "",
            providerId: provider.providerId,
            uid: provider.uid,
          })),
        };

        dispatch(login(payload));
      } catch (error) {
        console.error("Foydalanuvchi ma'lumotlarini olishda xatolik:", error);
      }
    } else {
      dispatch(logout());
    }
  });
};

export default authSlice.reducer;
