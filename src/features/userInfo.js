// In features/countriesInfo.js
import { createSlice } from "@reduxjs/toolkit";
import Session from "../service/session";

const userInfo = createSlice({
  name: "user",
  initialState: {
    value: [], // Initial state is an empty array
  },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
      // Session.set("feature", JSON.stringify(action.payload));
    },
  },
});

export const { setUser } = userInfo.actions;

export default userInfo.reducer;
