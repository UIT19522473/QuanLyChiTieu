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
    updateSubTransfer: (state, action) => {
      const index = state.arr.findIndex(
        item => item.idItem === action.payload.idItemEdit,
      );

      const indexTrans = state.arr.findIndex(
        item => item.id === action.payload.idTrans,
      );
      if (index > -1) {
        state.arr[index] = action.payload.subItem;
      } else {
        state.arr.splice(indexTrans, 1);
      }
      // state.arr.push(action.payload);
      // state.arr.forEach(item => {});
    },

    removeSubTransfer: (state, action) => {
      state.arr.push(action.payload);

      const index = state.arr.findIndex(item => item.id === action.payload);

      if (index > -1) {
        // only splice array when item is found
        state.arr.splice(index, 1); // 2nd parameter means remove one item only
      }
    },
    clearSubTransfer: state => {
      state.arr = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addSubTransfer,
  updateSubTransfer,
  removeSubTransfer,
  clearSubTransfer,
} = subTransferSlice.actions;

export default subTransferSlice.reducer;
