import { createSlice } from '@reduxjs/toolkit'
import Session from '../service/session';
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: Session.get("token") || "",
    salonId: Session.get("salonId") || null,
    salonName: Session.get("salonName") || "",
    salonImage: Session.get("salonImage") || "",
    homeService: Session.get("homeService") || "",
    userInfo: {
      profileStatus: Session.get("userstatus") || 0,
      email: "",
      phoneNumber: "",
      role: "",
      userType: "",
      profileImageUrl: "",
      firstName: "",
    },
    isVerifiedUser: Session.get("isVerifiedUser") || false,
    salons: [],
    selectedRowId: null
  },
  reducers: {
    storeToken: (state, action) => {
      const { token, profileImageUrl, firstName, ...userInfo } = action.payload;
      // console.log("Action is varified ::>", userInfo.isVerifiedUser ,typeof userInfo.isVerifiedUser);
      // console.log("profile Image::>",profileImageUrl)
      // console.log("First Name::>",firstName)

      // console.log("token::>",token)
      // console.log("profile status::>",userInfo.profileStatus)

      state.token = token,
        state.userInfo = { ...userInfo, profileImageUrl };
      Session.set("token", token);
      Session.set("userstatus", userInfo.profileStatus)
      Session.set("userinfo", userInfo.userType)
      Session.set("profileImageUrl", profileImageUrl);
      Session.set("firstName", firstName);
      Session.set("isVerifiedUser", userInfo.isVerifiedUser);
      state.isVerifiedUser = userInfo.isVerifiedUser;
    },
    updateProfileStatus: (state, action) => {
      state.userInfo.profileStatus = action.payload;
      Session.set("userstatus", action.payload);
    },
    logOut: (state) => {
      state.token = "",
        state.userInfo = {
          profileStatus: 0,
          email: "",
          phoneNumber: "",
          role: "",
          userType: "",
          profileImageUrl: "",
          firstName: ""
        };
      Session.remove("token")
      Session.remove("userstatus")
      Session.remove("usertype")
      Session.remove("profileImageUrl")
      Session.remove("firstName")
      Session.remove("salonName")
      state.salonName = ""
      Session.remove("salonImage")
      state.salonImage = ""
      Session.remove("homeService")
      state.homeService = ""
      Session.remove("salonId")
      state.salonId = ""
      Session.remove("userinfo")
      state.userInfo = ""
      Session.remove("isVerifiedUser")
      state.isVerifiedUser = false;
      // console.log("logout called");
    },
    
    setSalonName: (state, action) => {
      state.salonName = action.payload.salonName;
      Session.set("salonName", action.payload.salonName);
    },
    setSalonImage: (state, action) => {
      state.salonImage = action.payload.salonImage;
      Session.set("salonImage", action.payload.salonImage);
    },
    setHomeService: (state, action) => {
      state.homeService = action.payload.homeService;
      Session.set("homeService", action.payload.homeService);
    },
    setSalonID: (state, action) => {
      state.salonId = action.payload.salonId;
      Session.set("salonId", action.payload.salonId);
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      Session.set("userinfo", action.payload)
      // console.log("profile status::>",action.payload)

    },
    storeSalons: (state, action) => {
      state.salons = action.payload.salons
      Session.set("salons", action.payload.salons)
      // console.log("salons::>",action.payload.salons)
    },
    setSelectedRowId: (state, action) => {
      state.selectedRowId = action.payload;
      Session.set("RowId", action.payload.selectedRowId)
      // console.log("Selected Row ID:", action.payload);
    },
    removeToken: (state) => {
      Session.remove("token");
      state.token = "";
    },
    removeSalons: (state) => {
      Session.remove("salons");
      state.salons = [];
    },
    removeSalonID: (state) => {
      Session.remove("salonId");
      state.salonId = null;
    },
    removeSalonName: (state) => {
      Session.remove("salonName");
      state.salonName = null;
    },
    removeSalonImage: (state) => {
      Session.remove("salonImage");
      state.salonImage = null;
    },
    removeUserInfo: (state) => {
      Session.remove("userinfo");
      Session.remove("userstatus");
      Session.remove("usertype");
      Session.remove("profileImageUrl");
      Session.remove("firstName");
      state.userInfo = {
        profileStatus: 0,
        email: "",
        phoneNumber: "",
        role: "",
        userType: "",
        profileImageUrl: "",
        firstName: "",
        verified:false
      };
    },
  },
})

export const { storeToken, setSalonID, removeUserInfo, removeToken, removeSalonID, setUserInfo, storeSalons, removeSalons, setSalonName,
  setSalonImage, setHomeService, removeSalonImage, removeSalonName, logOut, updateProfileStatus } = authSlice.actions

export default authSlice.reducer;