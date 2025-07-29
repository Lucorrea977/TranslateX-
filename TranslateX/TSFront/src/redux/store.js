import { configureStore } from "@reduxjs/toolkit";
import translationReducer from "./slices/translationSlice";
import historyReducer from "./slices/historySlice";

export const store = configureStore({
  reducer: {
    translation: translationReducer,
    history: historyReducer,
  },
});