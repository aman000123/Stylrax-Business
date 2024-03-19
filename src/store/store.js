import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth.slice';

/**
 * Creates a Redux store with the specified reducer.
 *
 * @function
 * @returns {Object} The Redux store object.
 */
export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
