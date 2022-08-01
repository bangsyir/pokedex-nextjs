import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/themeSlicer";

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

export default store;
