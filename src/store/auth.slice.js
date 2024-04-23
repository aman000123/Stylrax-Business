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
      userType:"",
    },
  },
  reducers: {
    storeToken: (state, action) => {
      const { token, ...userInfo } = action.payload; 
      console.log("token::>",token)
      console.log("profile status::>",userInfo.profileStatus)

      state.token = token,
      state.userInfo = userInfo;
      Session.set("token", token);  
      Session.set("userInfo::>",userInfo.profileStatus)
    },
   
    setSalonID:(state,action)=>{
      state.salonId=action.payload.salonId;
      Session.set("salonId",action.payload.salonId);
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      Session.set("UserInfo::>",action.payload)
      console.log("profile status::>",action.payload)

    },
  
    removeToken: (state) => {
      Session.remove("token");
      state.token = "";
    },
    // removeSalonID: (state) => {
    //   Session.remove("salonId");
    //   state.salonId = null;
    // }

  },
})

export const { storeToken,setSalonID,removeToken,removeSalonID, setUserInfo } = authSlice.actions

export default authSlice.reducer