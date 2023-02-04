import {createSlice} from '@reduxjs/toolkit';

// const initialState = [];

export const dataAllSlice = createSlice({
  name: 'dataAll',
  initialState: {
    arrItem: [],
    arrTrans: [],
    arrHanMuc: [],
    time: '',
    week: '',
    month: '',
    year: '',
    modeTime: 0,
    arrItemBySelect: [],
    completeItem: 0,
    completeTrans: 0,
  },
  reducers: {
    addHanMuc: (state, action) => {
      state.arrHanMuc.push(action.payload);
    },
    removeHanMucById: (state, action) => {
      const index = state.arrHanMuc.findIndex(
        item => item.id === action.payload,
      );

      if (index > -1) {
        // only splice array when item is found
        state.arrItem.splice(index, 1); // 2nd parameter means remove one item only
      }
    },

    addAllDataTransfer: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // const test = action.payload.filter(c => !state.includes(c.id));
      // action.payload.map(item => console.log(item.id));
      // state.arrTrans = action.payload;
      // console.log('state', test);
      state.arrTrans = [];
      action.payload.forEach(documentSnapshot => {
        state.arrTrans.push({
          id: documentSnapshot.data().id,
          idItem: documentSnapshot.data().idItem,
          month: documentSnapshot.data().month,
          note: documentSnapshot.data().note,
          time: documentSnapshot.data().time,
          type: documentSnapshot.data().type,
          user: documentSnapshot.data().user,
          value: documentSnapshot.data().value,
          week: documentSnapshot.data().week,
          year: documentSnapshot.data().year,
        });
      });
    },
    addAllDataItem: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // const test = action.payload.filter(c => !state.includes(c.id));
      // action.payload.map(item => console.log(item.id));
      // state.arrItem = action.payload;
      // console.log('state', test);
      state.arrItem = [];
      action.payload.forEach(documentSnapshot => {
        state.arrItem.push({
          id: documentSnapshot.data().id,
          color: documentSnapshot.data().color,
          name: documentSnapshot.data().name,
          icon: documentSnapshot.data().icon,
          time: documentSnapshot.data().time,
          value: documentSnapshot.data().value,
          type: documentSnapshot.data().type,
        });
      });
    },
    removeValueItemById: (state, action) => {
      var result = state.arrItem.find(item => {
        return item.id === action.payload;
      });
      result.value = 0;
    },

    removeValueAllItem: (state, action) => {
      state.arrItem.map(item => {
        item.value = 0;
      });
    },

    updateValueItem: (state, action) => {
      state.arrItem.map(item => {
        if (item.id === action.payload.idItem) {
          item.value += action.payload.value;
        }
      });
      // var result = state.arrItem.find(item => {
      //   return item.id === action.payload.idItem;
      // });
      // if (result) {
      //   result.value += action.payload.value;
      // }
      // console.log('result', result);

      // if (item.id === action.payload.idItem) {
      //   // console.log('true true...', action.payload.value);
      //   item.value += action.payload.value;
      //   // console.log(item.value);
      // }
    },

    addDataTransfer: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // const test = action.payload.filter(c => !state.includes(c.id));
      // action.payload.map(item => console.log(item.id));
      state.arrTrans.push(action.payload);
      // console.log('state', test);
    },
    addDataItem: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // const test = action.payload.filter(c => !state.includes(c.id));
      // action.payload.map(item => console.log(item.id));
      state.arrItem.push(action.payload);
      // console.log('state', test);
    },
    updateNameColorIconItemData: (state, action) => {
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

    clearData: state => {
      state.arrItem = [];
      state.arrTrans = [];
      state.time = '';
      state.week = '';
      state.month = '';
      state.year = '';
      state.modeTime = '';
      state.arrItemBySelect = [];
    },
    clearDataItem: state => {
      state.arrItem = [];
    },
    clearDataTransfer: state => {
      state.arrTrans = [];
    },

    addTimeInfo: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // const test = action.payload.filter(c => !state.includes(c.id));
      // action.payload.map(item => console.log(item.id));
      state.time = action.payload.time;
      state.week = action.payload.week;
      state.month = action.payload.month;
      state.year = action.payload.year;
      // console.log('state', test);
    },

    addModeTimeData: (state, action) => {
      state.modeTime = action.payload;
      // console.log('state', test);
    },

    removeTransferByIdItem: (state, action) => {
      let arrIndex = [];
      state.arrTrans.map((trans, index) => {
        if (trans.idItem === action.payload) {
          arrIndex.push(index);
        }
      });
      arrIndex.forEach(index => {
        state.arrTrans.splice(index, 1);
      });
    },

    removeItemById: (state, action) => {
      const index = state.arrItem.findIndex(item => item.id === action.payload);

      if (index > -1) {
        // only splice array when item is found
        state.arrItem.splice(index, 1); // 2nd parameter means remove one item only
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  removeTransferByIdItem,
  removeItemById,
  removeValueAllItem,
  updateValueItem,
  updateNameColorIconItemData,
  removeValueItemById,
  addAllDataTransfer,
  addAllDataItem,
  addDataTransfer,
  addDataItem,
  addTimeInfo,
  addModeTimeData,
  clearData,
  clearDataItem,
  clearDataTransfer,
  addHanMuc,
  removeHanMucById,
} = dataAllSlice.actions;

export default dataAllSlice.reducer;
