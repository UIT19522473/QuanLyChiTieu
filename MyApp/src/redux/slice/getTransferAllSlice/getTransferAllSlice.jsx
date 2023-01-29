import {createSlice} from '@reduxjs/toolkit';

// const initialState = [];

export const getTransferAllSlice = createSlice({
  name: 'getTransferAll',
  initialState: {
    arrTransfer: [],
  },
  reducers: {
    getAllTransfer: (state, action) => {
      // const test = action.payload.filter(c => !state.includes(c.id));
      // action.payload.map(item => console.log(item.id));
      state.arrTransfer.push(action.payload);
    },
    clearAllTransfer: state => {
      state.arrTransfer = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {getAllTransfer, clearAllTransfer} = getTransferAllSlice.actions;

export default getTransferAllSlice.reducer;
