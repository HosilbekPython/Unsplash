import { createSlice } from "@reduxjs/toolkit";

const getInitialDarkMode = () => {
  const savedMode = localStorage.getItem("darkMode");
  if (savedMode !== null) return savedMode === "true";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const initialState = {
  darkMode: getInitialDarkMode(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", state.darkMode);
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
