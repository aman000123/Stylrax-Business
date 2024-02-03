// In features/countriesInfo.js
import { createSlice } from '@reduxjs/toolkit';

const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    data: [], // Initial state is an empty array
    searchTerm: '', // New state property for search term
  },
  reducers: {
    setCountries: (state, action) => {
      state.data = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setCountries, setSearchTerm } = countriesSlice.actions;
export const selectCountriesData = (state) => state.countries.data;
export const selectSearchTerm = (state) => state.countries.searchTerm;

export default countriesSlice.reducer;
