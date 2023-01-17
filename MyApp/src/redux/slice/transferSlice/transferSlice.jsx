import {createSlice} from '@reduxjs/toolkit';

// const initialState = [];

export const transferSlice = createSlice({
  name: 'transferItem',
  initialState: {
    arr: [],
  },
  reducers: {
    addTransfer: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // const test = action.payload.filter(c => !state.includes(c.id));
      // action.payload.map(item => console.log(item.id));
      state.arr.push(action.payload);
      // console.log('state', test);
    },
    clearTransfer: state => {
      state.arr = [];
    },
    // addNameCurrentItem: (state, action) => {
    //   state.name = action.payload;
    // },
    // addValueCurrentItem: (state, action) => {
    //   state.value = action.payload;
    // },
    // addColorCurrentItem: (state, action) => {
    //   console.log('redux', action.payload);
    //   state.color = action.payload;
    // },
    // addIconCurrentItem: (state, action) => {
    //   state.icon = action.payload;
    // },
    // addTimeCurrentItem: (state, action) => {
    //   state.time = action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const {
  addTransfer,
  clearTransfer,
  addColorCurrentItem,
  addIconCurrentItem,
  addNameCurrentItem,
  addTimeCurrentItem,
  addValueCurrentItem,
} = transferSlice.actions;

export default transferSlice.reducer;
