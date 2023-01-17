import {createSlice} from '@reduxjs/toolkit';

// const initialState = [];

export const currentItem = createSlice({
  name: 'currentItem',
  initialState: {
    id: 0,
    name: 'Chọn danh mục',
    value: 0,
    color: 'blue',
    icon: 'shopping-basket',
    time: '22/12/2022',
    type: 'thu',
    user: '',
  },
  reducers: {
    addCurrentItem: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // const test = action.payload.filter(c => !state.includes(c.id));
      // action.payload.map(item => console.log(item.id));
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.value = action.payload.value;
      state.color = action.payload.color;
      state.icon = action.payload.icon;
      state.time = action.payload.time;
      state.type = action.payload.type;
      state.user = action.payload.user;
      // console.log('state', test);
    },
    addIdCurrentItem: (state, action) => {
      state.id = action.payload;
    },
    addNameCurrentItem: (state, action) => {
      state.name = action.payload;
    },
    addValueCurrentItem: (state, action) => {
      state.value = action.payload;
    },
    addColorCurrentItem: (state, action) => {
      console.log('redux', action.payload);
      state.color = action.payload;
    },
    addIconCurrentItem: (state, action) => {
      state.icon = action.payload;
    },
    addTimeCurrentItem: (state, action) => {
      state.time = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addCurrentItem,
  addIdCurrentItem,
  addColorCurrentItem,
  addIconCurrentItem,
  addNameCurrentItem,
  addTimeCurrentItem,
  addValueCurrentItem,
} = currentItem.actions;

export default currentItem.reducer;
