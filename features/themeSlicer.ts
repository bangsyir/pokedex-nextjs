import { createSlice } from "@reduxjs/toolkit";

export const themeSlicer = createSlice({
  name: "theme",
  initialState: {
    value: "light",
  },
  reducers: {
    theme: (state) => {
      if(state.value === "light") {
        state.value = "dark"
      } else {
        state.value = "light"
      }
    },
  },
});

export const { theme } = themeSlicer.actions;
export default themeSlicer.reducer;
