import { createSlice } from '@reduxjs/toolkit'
import Session from '../service/session';
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: Session.get("token") || "",
    userInfo: {
      profileStatus : 0,
      email: "",
      phoneNumber: "",
      role: "",
      //id:"",
    },
  },
  reducers: {
    storeToken: (state, action) => {
      const { token, ...userInfo } = action.payload;
      console.log("ara token::>",token)
      state.token = token,
      state.userInfo = userInfo;
      Session.set("token", token);
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  
    removeToken: (state) => {
      Session.remove("token");
      state.token = "";
    }
  },
})

export const { storeToken, removeToken, setUserInfo } = authSlice.actions

export default authSlice.reducer