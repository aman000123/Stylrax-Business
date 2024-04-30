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
  salons:[] 
  },
  reducers: {
    storeToken: (state, action) => {
      const { token, ...userInfo } = action.payload; 
      console.log("token::>",token)
      console.log("profile status::>",userInfo.profileStatus)

      state.token = token,
      state.userInfo = userInfo;
      Session.set("token", token);  
      Session.set("userStatus::>",userInfo.profileStatus)
      Session.set("userType::>",userInfo.userType)

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
  storeSalons:(state,action) =>{
    state.salons=action.payload.salons
    Session.set("salons",action.payload.salons)
    console.log("salons::>",action.payload.salons)
  },
    removeToken: (state) => {
      Session.remove("token");
      state.token = "";
    },
   removeSalons:(state)=>{
    Session.remove("salons");
    state.salons =[];
   },
   removeUserInfo: (state) => {
    Session.remove("UserInfo::>");
    Session.remove("userStatus::>");
    Session.remove("userType::>");
  state.userInfo = {
    profileStatus: 0,
    email: "",
    phoneNumber: "",
    role: "",
    userType: "",
  };
  },
  },
})

export const { storeToken,setSalonID,removeUserInfo,removeToken,removeSalonID, setUserInfo , storeSalons,removeSalons} = authSlice.actions

export default authSlice.reducer