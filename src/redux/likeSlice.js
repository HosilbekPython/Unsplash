import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  likedImages: JSON.parse(localStorage.getItem("likedImages")) || [], 
};

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const image = action.payload;
      const index = state.likedImages.findIndex((img) => img.id === image.id);

      if (index !== -1) {
        state.likedImages.splice(index, 1);
        toast("O'chirildi");
      } else {
        state.likedImages.push(image);
        toast("Qo'shildi");
      }

      localStorage.setItem("likedImages", JSON.stringify(state.likedImages));
    },
  },
});

export const { toggleLike } = likeSlice.actions;
export default likeSlice.reducer;
