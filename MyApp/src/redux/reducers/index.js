import {combineReducers} from 'redux';
import info from './infoReducer';
import test from './testReducer';

const reducer = combineReducers({
  personalInfo: info,
  dataFirebase: test,
});

export default (state, action) => reducer(state, action);
