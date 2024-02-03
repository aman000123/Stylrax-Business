// In features/countriesInfo.js
import { createSlice } from "@reduxjs/toolkit";
import Session from "../service/session";

const featureSlice = createSlice({
  name: "feature",
  initialState: {
    value: [], // Initial state is an empty array
  },
  reducers: {
    setFeature: (state, action) => {
      state.value = action.payload;
      // Session.set("feature", JSON.stringify(action.payload));
    },
  },
});

export const { setFeature } = featureSlice.actions;

export default featureSlice.reducer;
