import { createSlice } from '@reduxjs/toolkit'
import Session from '../service/session';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: Session.get("token") || "",
    userInfo: {
      email: "",
      phoneNumber: "",
      role: "",
    },
  },
  reducers: {
    storeToken: (state, action) => {
      const { token, ...userInfo } = action.payload;
      state.token = token,
      state.userInfo = userInfo;
      Session.set("token", token);
    },
    removeToken: (state) => {
      Session.remove("token");
      state.token = "";
    }
  },
})

export const { storeToken, removeToken } = authSlice.actions

export default authSlice.reducer