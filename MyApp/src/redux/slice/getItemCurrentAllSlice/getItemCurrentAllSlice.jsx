import {createSlice} from '@reduxjs/toolkit';

// const initialState = [];

export const getItemCurentAllSlice = createSlice({
  name: 'getItemCurentAll',
  initialState: {
    arrItemByDate: [],
    arrItemByWeek: [],
    arrItemByMonth: [],
    arrItemByYear: [],
  },
  reducers: {
    getAllItemCurrentByDate: (state, action) => {
      // const test = action.payload.filter(c => !state.includes(c.id));
      // action.payload.map(item => console.log(item.id));
      state.arrItemByDate = [];
      state.arrItemByWeek = [];
      state.arrItemByMonth = [];
      state.arrItemByYear = [];
      //   let arrResult = [];
      const arrItemClone = action.payload.arrItem.slice();
      const arrTransClone = action.payload.arrTrans.slice();
      const time = action.payload.time;

      arrTransClone.map(trans => {
        arrItemClone.map(item => {
          if (trans.idItem === item.id && trans.time === time) {
            item.value += trans.value;
          }
        });
      });

      state.arrItemByDate = arrItemClone;
    },
    getAllItemCurrentByWeek: (state, action) => {
      // const test = action.payload.filter(c => !state.includes(c.id));
      // action.payload.map(item => console.log(item.id));
      state.arrItem.push(action.payload);
    },
    getAllItemCurrentByMonth: (state, action) => {
      // const test = action.payload.filter(c => !state.includes(c.id));
      // action.payload.map(item => console.log(item.id));
      state.arrItem.push(action.payload);
    },
    getAllItemCurrentByYear: (state, action) => {
      // const test = action.payload.filter(c => !state.includes(c.id));
      // action.payload.map(item => console.log(item.id));
      state.arrItem.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getAllItemCurrentByDate,
  getAllItemCurrentByWeek,
  getAllItemCurrentByMonth,
  getAllItemCurrentByYear,
} = getItemCurentAllSlice.actions;

export default getItemCurentAllSlice.reducer;
