import { createSlice } from '@reduxjs/toolkit'
import Session from '../service/session';
export const authInfo = createSlice({
  name: 'token',
  initialState: {
    token: Session.get('token') || "",
  },
  reducers: {
    storeToken: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.token = action.payload.token;
      Session.set("token", action.payload.token);
    },
    removeToken: (state)=>{

      Session.remove("token");
      state.token = "";
    }
  },
})

// Action creators are generated for each case reducer function
export const { storeToken, removeToken } = authInfo.actions

export default authInfo.reducer