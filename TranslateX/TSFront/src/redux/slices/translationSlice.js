import { createSlice } from "@reduxjs/toolkit";

const translationSlice = createSlice({
  name: "translation",
  initialState: {
    input: "",
    output: "",
    loading: false,
  },
  reducers: {
    setInput: (state, action) => {
      state.input = action.payload;
    },
    setOutput: (state, action) => {
      state.output = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setInput, setOutput, setLoading } = translationSlice.actions;
export default translationSlice.reducer;
