import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("translationHistory")) || [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addToHistory: (state, action) => {
      state.items.unshift(action.payload); // agrega al principio
      localStorage.setItem("translationHistory", JSON.stringify(state.items));
    },
    clearHistory: (state) => {
      state.items = [];
      localStorage.removeItem("translationHistory");
    },
  },
});

export const { addToHistory, clearHistory } = historySlice.actions;
export default historySlice.reducer;
