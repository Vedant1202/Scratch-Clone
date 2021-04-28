/** @format */

import { combineReducers } from 'redux';

import eventReducer from './events/events.reducer';

import storage from 'redux-persist/lib/storage';
// import { persistReducer } from 'redux-persist';

const rootReducer = combineReducers({
  event: eventReducer,
});

const persistConfig = {
  key: 'scratch-juspay',
  storage: storage,
};

// export default persistReducer(persistConfig, rootReducer);
export default rootReducer;
