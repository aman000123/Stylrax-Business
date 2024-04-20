import { createSlice } from '@reduxjs/toolkit'
import Session from '../service/session';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: Session.get("token") || "",
    salonId:null,
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
      // console.log("userInfo:::>",userInfo); 
      // state.salonId=salonId;
      state.token = token,
      state.userInfo = userInfo;
      Session.set("token", token);
      // Session.set("userInfo",userInfo);
      
      
    },
    setSalonID:(state,action)=>{
      state.salonId=action.payload.salonId;
      Session.set("salonId",action.payload.salonId);
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      // Session.set("userInfo",action.payload);
      
    },
  
    removeToken: (state) => {
      Session.remove("token");
      // Session.remove("userInfo");
      state.token = "";
    },
    removeSalonID: (state) => {
      Session.remove("salonId");
      state.salonId = null;
    }

  },
})

export const { storeToken,setSalonID,removeToken,removeSalonID, setUserInfo } = authSlice.actions

export default authSlice.reducer