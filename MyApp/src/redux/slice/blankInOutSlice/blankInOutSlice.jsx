import {createSlice} from '@reduxjs/toolkit';

// const initialState = [];

export const blankInOutSlice = createSlice({
  name: 'blankInOut',
  initialState: {
    In: 0,
    Out: 0,
  },
  reducers: {
    addBlankInOut: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // const test = action.payload.filter(c => !state.includes(c.id));
      // action.payload.map(item => console.log(item.id));
      state.In = action.payload.In;
      state.Out = action.payload.Out;
      // console.log('state', test);
    },
    updateBlankIn: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // const test = action.payload.filter(c => !state.includes(c.id));
      // action.payload.map(item => console.log(item.id));
      state.In += action.payload;

      // console.log('state', test);
    },
    updateBlankOut: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // const test = action.payload.filter(c => !state.includes(c.id));
      // action.payload.map(item => console.log(item.id));
      state.Out += action.payload;

      // console.log('state', test);
    },
    clearBlankInOut: state => {
      state.In = 0;
      state.Out = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const {addBlankInOut, clearBlankInOut, updateBlankIn, updateBlankOut} =
  blankInOutSlice.actions;

export default blankInOutSlice.reducer;
