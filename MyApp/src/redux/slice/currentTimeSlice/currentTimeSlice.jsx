import {createSlice} from '@reduxjs/toolkit';

// const initialState = [];

export const currentTime = createSlice({
  name: 'currentTime',
  initialState: {
    time: '',
    year: '',
    month: '',
    week: '',
    modeTime: 0,
  },
  reducers: {
    addCurrentTime: (state, action) => {
      const getDateStartWeek = timeVal => {
        const month = timeVal.split('/');

        // get number week in year
        const date = new Date(
          parseInt(month[2]),
          parseInt(month[1]) - 1,
          parseInt(month[0]) + 1,
        );

        let timeReturn = 0;
        const day = 60 * 60 * 24 * 1000;

        switch (date.getDay()) {
          //th8
          case 1:
            timeReturn = new Date(date.getTime() - 6 * day);
            return (
              timeReturn.getDate() -
              1 +
              '/' +
              timeReturn.getMonth() +
              1 +
              '/' +
              timeReturn.getFullYear()
            );
          case 2:
            timeReturn = new Date(date.getTime());
            return (
              timeReturn.getDate() -
              1 +
              '/' +
              timeReturn.getMonth() +
              1 +
              '/' +
              timeReturn.getFullYear()
            );
          //th3
          case 3:
            timeReturn = new Date(date.getTime() - day);
            return (
              timeReturn.getDate() -
              1 +
              '/' +
              timeReturn.getMonth() +
              1 +
              '/' +
              timeReturn.getFullYear()
            );
          //th4
          case 4:
            timeReturn = new Date(date.getTime() - 2 * day);
            return (
              timeReturn.getDate() -
              1 +
              '/' +
              timeReturn.getMonth() +
              1 +
              '/' +
              timeReturn.getFullYear()
            );
          //th5
          case 5:
            timeReturn = new Date(date.getTime() - 3 * day);
            return (
              timeReturn.getDate() -
              1 +
              '/' +
              timeReturn.getMonth() +
              1 +
              '/' +
              timeReturn.getFullYear()
            );
          //th6
          case 6:
            timeReturn = new Date(date.getTime() - 4 * day);
            return (
              timeReturn.getDate() -
              1 +
              '/' +
              timeReturn.getMonth() +
              1 +
              '/' +
              timeReturn.getFullYear()
            );
          //th7
          case 0:
            timeReturn = new Date(date.getTime() - 5 * day);
            return (
              timeReturn.getDate() -
              1 +
              '/' +
              timeReturn.getMonth() +
              1 +
              '/' +
              timeReturn.getFullYear()
            );
          default:
            return date;
        }

        //return date.getDay();
      };
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // const test = action.payload.filter(c => !state.includes(c.id));
      // action.payload.map(item => console.log(item.id));
      const TimeValue = action.payload.split('/');
      state.time = action.payload;
      state.year = TimeValue[2];
      state.month = TimeValue[1] + '/' + TimeValue[2];
      state.week = getDateStartWeek(action.payload);

      // console.log('state', test);
    },

    addCurrentYear: (state, action) => {
      state.year = action.payload;
    },
    addCurrentMonth: (state, action) => {
      state.month = action.payload;
    },
    addCurrentWeek: (state, action) => {
      state.week = action.payload;
    },

    addModeTime: (state, action) => {
      state.modeTime = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addCurrentTime,
  addCurrentMonth,
  addCurrentWeek,
  addCurrentYear,
  addModeTime,
} = currentTime.actions;

export default currentTime.reducer;
