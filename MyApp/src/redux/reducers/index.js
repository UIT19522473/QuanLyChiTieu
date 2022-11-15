import {combineReducers} from 'redux';
import info from './infoReducer';

const reducer = combineReducers({
  personalInfo: info,
});

export default (state, action) => reducer(state, action);
