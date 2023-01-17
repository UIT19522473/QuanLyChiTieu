import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './slice/testSlice/testSlice';
import itemHomeReducer from './slice/itemHomeSlice/itemHomeSlice';
import currentItemReducer from './slice/currentItemSlice/currentItemSlice';
import transferReducer from './slice/transferSlice/transferSlice';
import currentTimeReducer from './slice/currentTimeSlice/currentTimeSlice';
import subTransferReducer from './slice/subTransferSlice/subTransferSlice';
import blankInOutReducer from './slice/blankInOutSlice/blankInOutSlice';
import authReducer from './slice/authSlice/authSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    itemHomeArr: itemHomeReducer,
    currentItem: currentItemReducer,
    transferItem: transferReducer,
    currentTime: currentTimeReducer,
    subTransferItem: subTransferReducer,
    blankInOut: blankInOutReducer,
    auth: authReducer,
  },
});
