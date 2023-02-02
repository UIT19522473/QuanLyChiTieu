import {createSlice} from '@reduxjs/toolkit';

// const initialState = [];

export const HanMucSlice = createSlice({
  name: 'HanMucAdd',
  initialState: {
    id: '',
    value: 0,
    name: '',
    switchAll: false,
    arrChoose: [],
    /*arrchoose:[{
      idItem,
      name,
      icon,
      tick
    }]*/
    timeStart: '',
    timeEnd: '',
  },
  reducers: {
    addSwitchAll: (state, action) => {
      state.switchAll = action.payload;
    },
    addArrChoose: (state, action) => {
      state.arrChoose.push(action.payload);
    },
    clearArrChoose: (state, action) => {
      state.arrChoose = [];
    },
    updateTick: (state, action) => {
      // console.log('redux update Tick');
      state.arrChoose.forEach(item => {
        if (item.id === action.payload.id) {
          item.tick = action.payload.tick;
        }
      });
    },
    allTickCheck: (state, action) => {
      if (action.payload) {
        state.arrChoose.map(choose => {
          choose.tick = true;
        });
      } else {
        state.arrChoose.map(choose => {
          choose.tick = false;
        });
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addSwitchAll,
  addArrChoose,
  updateTick,
  clearArrChoose,
  allTickCheck,
} = HanMucSlice.actions;

export default HanMucSlice.reducer;
