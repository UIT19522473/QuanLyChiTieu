import {createSlice} from '@reduxjs/toolkit';

// const initialState = [];

export const itemHomeArr = createSlice({
  name: 'itemHomeArr',
  initialState: {
    arrItem: [],
  },
  reducers: {
    addAllItem: (state, action) => {
      state.arrItem = action.payload;
    },
    addItem: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // const test = action.payload.filter(c => !state.includes(c.id));
      // action.payload.map(item => console.log(item.id));
      state.arrItem.push(action.payload);
      // console.log('state', test);
    },
    clearItem: state => {
      state.arrItem = [];
    },
    updateValueItem: (state, action) => {
      // console.log('redux', action.payload);

      state.arrItem.map(item => {
        if (item.id === action.payload.idItem) {
          // console.log('true true...', action.payload.value);
          item.value += action.payload.value;
          // console.log(item.value);
        }
        // if (true) {
        //   console.log('true true...');
        // }
      });
    },

    updateNameColorIconItem: (state, action) => {
      // console.log('redux', action.payload);

      state.arrItem.map(item => {
        if (item.id === action.payload.idItem) {
          // console.log('true true...', action.payload.value);
          item.name = action.payload.name;
          item.color = action.payload.color;
          item.icon = action.payload.icon;
          // console.log(item.value);
        }
        // if (true) {
        //   console.log('true true...');
        // }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addAllItem,
  addItem,
  clearItem,
  updateValueItem,
  updateNameColorIconItem,
} = itemHomeArr.actions;

export default itemHomeArr.reducer;
