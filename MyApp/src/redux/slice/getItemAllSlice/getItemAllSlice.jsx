import {createSlice} from '@reduxjs/toolkit';

// const initialState = [];

export const getItemAllSlice = createSlice({
  name: 'getItemAll',
  initialState: {
    arrItem: [],
    arrItemLoad: [],
    time: '',
    week: '',
    month: '',
  },
  reducers: {
    getAllItem: (state, action) => {
      // const test = action.payload.filter(c => !state.includes(c.id));
      // action.payload.map(item => console.log(item.id));
      state.arrItem.push(action.payload);
    },
    clearAllItem: state => {
      state.arrItem = [];
    },

    clearAllValue: state => {
      // state.arrItem.map(item => {
      //   item.value = 0;
      // });
      state.arrItem.forEach(element => {
        element.value = 0;
      });
    },
    loadItemLoad: (state, action) => {},

    udValueItem: (state, action) => {
      const arrTransfer = action.payload.arrTrans;
      const time = action.payload.time;
      const modeTime = action.payload.modeTime;

      //   console.log('reduxTime', time);
      //   console.log('reduxMode', modeTime);
      //   console.log('arrItem', arrTransfer.length);

      //   // phaan loai thoi gian

      //   const getDateStartWeek = timeVal => {
      //     const month = timeVal.split('/');

      //     // get number week in year
      //     const date = new Date(
      //       parseInt(month[2]),
      //       parseInt(month[1]) - 1,
      //       parseInt(month[0]) + 1,
      //     );

      //     let timeReturn = 0;
      //     const day = 60 * 60 * 24 * 1000;

      //     switch (date.getDay()) {
      //       //th8
      //       case 1:
      //         timeReturn = new Date(date.getTime() - 6 * day);
      //         return (
      //           timeReturn.getDate() -
      //           1 +
      //           '/' +
      //           timeReturn.getMonth() +
      //           1 +
      //           '/' +
      //           timeReturn.getFullYear()
      //         );
      //       case 2:
      //         timeReturn = new Date(date.getTime());
      //         return (
      //           timeReturn.getDate() -
      //           1 +
      //           '/' +
      //           timeReturn.getMonth() +
      //           1 +
      //           '/' +
      //           timeReturn.getFullYear()
      //         );
      //       //th3
      //       case 3:
      //         timeReturn = new Date(date.getTime() - day);
      //         return (
      //           timeReturn.getDate() -
      //           1 +
      //           '/' +
      //           timeReturn.getMonth() +
      //           1 +
      //           '/' +
      //           timeReturn.getFullYear()
      //         );
      //       //th4
      //       case 4:
      //         timeReturn = new Date(date.getTime() - 2 * day);
      //         return (
      //           timeReturn.getDate() -
      //           1 +
      //           '/' +
      //           timeReturn.getMonth() +
      //           1 +
      //           '/' +
      //           timeReturn.getFullYear()
      //         );
      //       //th5
      //       case 5:
      //         timeReturn = new Date(date.getTime() - 3 * day);
      //         return (
      //           timeReturn.getDate() -
      //           1 +
      //           '/' +
      //           timeReturn.getMonth() +
      //           1 +
      //           '/' +
      //           timeReturn.getFullYear()
      //         );
      //       //th6
      //       case 6:
      //         timeReturn = new Date(date.getTime() - 4 * day);
      //         return (
      //           timeReturn.getDate() -
      //           1 +
      //           '/' +
      //           timeReturn.getMonth() +
      //           1 +
      //           '/' +
      //           timeReturn.getFullYear()
      //         );
      //       //th7
      //       case 0:
      //         timeReturn = new Date(date.getTime() - 5 * day);
      //         return (
      //           timeReturn.getDate() -
      //           1 +
      //           '/' +
      //           timeReturn.getMonth() +
      //           1 +
      //           '/' +
      //           timeReturn.getFullYear()
      //         );
      //       default:
      //         return date;
      //     }

      //     //return date.getDay();
      //   };
      //   const TimeValue = time.split('/');
      //   const date = time;
      //   const year = TimeValue[2];
      //   const month = TimeValue[1] + '/' + TimeValue[2];
      //   const week = getDateStartWeek(time);

      //   // reset value item
      //   state.arrItem.forEach(element => {
      //     element.value = 0;
      //   });
      //   //add value item

      //   //by date
      //   if (modeTime == 0) {
      //     arrTransfer.forEach(element => {
      //       state.arrItem.forEach(item => {
      //         if (element.idItem === item.id && element.time === date) {
      //           item.value += element.value;
      //         }
      //       });
      //     });
      //   }
      //   //by week
      //   else if (modeTime == 1) {
      //     arrTransfer.forEach(element => {
      //       state.arrItem.forEach(item => {
      //         if (element.idItem === item.id && element.week === week) {
      //           item.value += element.value;
      //         }
      //       });
      //     });
      //   }
      //   // by month
      //   else if (modeTime == 2) {
      //     arrTransfer.forEach(element => {
      //       state.arrItem.forEach(item => {
      //         if (element.idItem === item.id && element.month === month) {
      //           item.value += element.value;
      //         }
      //       });
      //     });
      //   }
      //   // by year
      //   else if (modeTime == 3) {
      //     arrTransfer.forEach(element => {
      //       state.arrItem.forEach(item => {
      //         if (element.idItem === item.id && element.year === year) {
      //           item.value += element.value;
      //         }
      //       });
      //     });
      //   }
    },
  },
});

// Action creators are generated for each case reducer function
export const {getAllItem, clearAllItem, clearAllValue, udValueItem} =
  getItemAllSlice.actions;

export default getItemAllSlice.reducer;
