import { configureStore } from '@reduxjs/toolkit';
import  authInfoReducer  from '../features/authInfo';
import countriesReducer from '../features/countriesInfo';
import featureReducer from '../features/feature';

export default configureStore({
  reducer: {
    authInfo : authInfoReducer,
    countries: countriesReducer,
    feature: featureReducer,
  },
})