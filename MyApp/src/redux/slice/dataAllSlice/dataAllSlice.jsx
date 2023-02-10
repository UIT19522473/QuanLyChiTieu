import {createSlice} from '@reduxjs/toolkit';

// const initialState = [];

export const dataAllSlice = createSlice({
  name: 'dataAll',
  initialState: {
    arrItem: [],
    arrTrans: [],
    arrHanMuc: [],
    arrTodo: [],
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
    clearTodo: (state, action) => {
      state.arrTodo = [];
    },
    addTodo: (state, action) => {
      state.arrTodo.push(action.payload);
    },
    deleteTodo: (state, action) => {
      const index = state.arrTodo.findIndex(item => item.id === action.payload);

      if (index > -1) {
        // only splice array when item is found
        state.arrTodo.splice(index, 1); // 2nd parameter means remove one item only
      }
    },
    updateTickTodo: (state, action) => {
      state.arrTodo.forEach(todo => {
        if (todo.id === action.payload.id) {
          todo.tick = action.payload.tick;
        }
      });
    },
    updateNoteTodo: (state, action) => {
      state.arrTodo.forEach(todo => {
        if (todo.id === action.payload.id) {
          todo.note = action.payload.note;
        }
      });
    },

    addHanMuc: (state, action) => {
      state.arrHanMuc.push(action.payload);
    },
    updateTichHanMuc: (state, action) => {
      const index = state.arrHanMuc.findIndex(
        item => item.id === action.payload.idHanMuc,
      );

      state.arrHanMuc[index].arrChoose.forEach(item => {
        if (item.id === action.payload.id) {
          item.tick = action.payload.tick;
        }
      });
    },

    updateHanMuc: (state, action) => {
      state.arrHanMuc.forEach(item => {
        if (item.id === action.payload.id) {
          // console.log('redux', action.payload.hanMucAdd),
          // item = action.payload.hanMucAdd;
          (item.arrChoose = action.payload.hanMucAdd.arrChoose),
            (item.id = action.payload.hanMucAdd.id),
            (item.money = action.payload.hanMucAdd.money),
            (item.name = action.payload.hanMucAdd.name),
            (item.timeEnd = action.payload.hanMucAdd.timeEnd),
            (item.timeStart = action.payload.hanMucAdd.timeStart),
            (item.user = action.payload.hanMucAdd.user);
        }
      });
    },

    removeHanMucById: (state, action) => {
      const index = state.arrHanMuc.findIndex(
        item => item.id === action.payload,
      );

      if (index > -1) {
        // only splice array when item is found
        state.arrHanMuc.splice(index, 1); // 2nd parameter means remove one item only
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

    updateTransfer: (state, action) => {
      state.arrTrans.map(trans => {
        if (trans.id === action.payload.id) {
          (trans.id = action.payload.id),
            (trans.idItem = action.payload.idItem),
            (trans.month = action.payload.month),
            (trans.note = action.payload.note),
            (trans.time = action.payload.time),
            (trans.type = action.payload.type),
            (trans.user = action.payload.user),
            (trans.value = action.payload.value),
            (trans.week = action.payload.week),
            (trans.year = action.payload.year);
        }
      });

      // const transFind = state.arrTrans.find(
      //   trans => trans.id === action.payload.id,
      // );
      // transFind = {
      //   id: action.payload.id,
      //   idItem: action.payload.idItem,
      //   month: action.payload.month,
      //   note: action.payload.note,
      //   time: action.payload.time,
      //   type: action.payload.type,
      //   user: action.payload.user,
      //   value: action.payload.value,
      //   week: action.payload.week,
      //   year: action.payload.year,
      // };

      const itemCurrentFind = state.arrItem.find(
        item => item.id === action.payload.idItemCurrent,
      );
      const itemEditFind = state.arrItem.find(
        item => item.id === action.payload.idItemEdit,
      );
      if (itemCurrentFind.id === itemEditFind.id) {
        let value = 0;
        // itemCurrentFind.value = 0;
        state.arrTrans.forEach(trans => {
          if (trans.idItem === itemCurrentFind.id) {
            value += trans.value;
          }
        });

        state.arrItem.forEach(item => {
          if (item.id === itemCurrentFind.id) {
            item.value = 0;
            item.value += value;
          }
        });
        // itemCurrentFind.value = value;
      } else {
        let value1 = 0;
        let value2 = 0;
        itemCurrentFind.value = 0;
        itemEditFind.value = 0;
        state.arrTrans.forEach(trans => {
          if (trans.idItem === itemCurrentFind.id) {
            value1 += trans.value;
          } else if (trans.idItem === itemEditFind.id) {
            value2 += trans.value;
          }
        });

        state.arrItem.forEach(item => {
          if (item.id === itemCurrentFind.id) {
            item.value = 0;
            item.value += value1;
          } else if (item.id === itemEditFind.id) {
            item.value = 0;
            item.value += value2;
          }
        });
      }
    },

    removeTransfer: (state, action) => {
      const index = state.arrTrans.findIndex(
        trans => trans.id === action.payload.id,
      );
      const indexItem = state.arrItem.findIndex(
        item => item.id === action.payload.idItem,
      );

      // console.log('index', index);
      // console.log('indexItem', indexItem);

      if (indexItem > -1 && index > -1) {
        state.arrItem[indexItem].value -= state.arrTrans[index].value;
        state.arrTrans.splice(index, 1);
      }
      // state.arrItem.forEach(item => {
      //   if (item.id === action.payload.idItem) {
      //     item.value -= state.arrTrans[index].value;
      //   }
      // });
      // if (index > -1) {
      //   // only splice array when item is found
      //   state.arrTrans.splice(index, 1); // 2nd parameter means remove one item only
      // }
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
        // state.arrHanMuc.forEach(hm => {
        //   hm.arrChoose.map((childHm, num) => {
        //     if (childHm.id === state.arrItem[index].id) {
        //       hm.splice(num, 1);
        //     }
        //   });
        // });
        state.arrItem.splice(index, 1); // 2nd parameter means remove one item only
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateNoteTodo,
  updateTickTodo,
  clearTodo,
  deleteTodo,
  addTodo,
  updateHanMuc,
  updateTichHanMuc,
  removeTransfer,
  updateTransfer,
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
