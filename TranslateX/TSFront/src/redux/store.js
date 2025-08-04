import { configureStore } from "@reduxjs/toolkit";

import historyReducer from "./slices/historySlice";

export const store = configureStore({
  reducer: {

    history: historyReducer,
  },
});