import {createSlice} from '@reduxjs/toolkit';

// const initialState = [];

export const subTransferSlice = createSlice({
  name: 'subTransferItem',
  initialState: {
    arr: [],
  },
  reducers: {
    addSubTransfer: (state, action) => {
      state.arr.push(action.payload);
    },
    clearSubTransfer: state => {
      state.arr = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {addSubTransfer, clearSubTransfer} = subTransferSlice.actions;

export default subTransferSlice.reducer;
