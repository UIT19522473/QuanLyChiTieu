import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const middleware = [thunk];
export const store = createStore(reducer, applyMiddleware(...middleware));
// export const storeTest = createStore(reducer);
