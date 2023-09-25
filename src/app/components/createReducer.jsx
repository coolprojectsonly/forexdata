import { createSlice } from "@reduxjs/toolkit";
import { getData } from "./action";

const initialState = {
  status: "idle",
  data: [],
  error: null,
};

const createReducer = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.status = "succeeeded";
        state.data = action.payload;
      })
      .addCase(getData.rejected, (state) => {
        state.status = "error";
        state.error = "error";
      });
  },
});

export default createReducer;
