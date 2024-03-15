import { createSlice } from '@reduxjs/toolkit'
import Session from '../service/session';
export const authInfo = createSlice({
  name: 'token',
  initialState: {
    token: Session.get('token') || "",
    // userInfo: {},
    userInfo:Session.get('userInfo') || ""
  },
  reducers: {
    storeToken: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.authToken = action.payload.authToken;
      state.profile = (action.payload.profile);
      Session.set("authToken", action.payload.authToken);
      Session.set("profile", action.payload.profile);
      console.log("profile stored:", action.payload.profile);
      console.log("authToken stored:", action.payload.authToken);
    },
    removeToken: (state)=>{
      Session.remove("authToken");
      state.authToken = "";
      state.profile = {};
      Session.remove("profile");
      console.log("profile removed");
    }
  },
})

// Action creators are generated for each case reducer function
export const { storeToken, removeToken } = authInfo.actions;

export default authInfo.reducer;