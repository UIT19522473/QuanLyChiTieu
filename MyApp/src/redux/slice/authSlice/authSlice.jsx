import {createSlice} from '@reduxjs/toolkit';

// const initialState = [];

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userName: '',
  },
  reducers: {
    logAuth: (state, action) => {
      state.userName = action.payload;
      // console.log('state', test);
    },
    clearAuth: state => {
      state.userName = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const {logAuth, clearAuth} = authSlice.actions;

export default authSlice.reducer;
