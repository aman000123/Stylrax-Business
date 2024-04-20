import { createSlice } from '@reduxjs/toolkit'
import Session from '../service/session';
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: Session.get("token") || "",
    salonId:null,
    userInfo: {
      profileStatus : "",
      email: "",
      phoneNumber: "",
      role: "",
      //id:"",
    },
  },
  reducers: {
    storeToken: (state, action) => {
      const { token, ...userInfo } = action.payload; 
      console.log("token::>",token)
      console.log("profile status::>",userInfo)

      state.token = token,
      state.userInfo = userInfo;
      Session.set("token", token);  
      
    },
    setSalonID:(state,action)=>{
      state.salonId=action.payload.salonId;
      Session.set("salonId",action.payload.salonId);
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      
    },
  
    removeToken: (state) => {
      Session.remove("token");
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