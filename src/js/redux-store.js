import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './redux-reducers';

// Create logging middleware if not in prod
let loggingMiddleware = undefined;
if (process.env.NODE_ENV !== 'production') {
  loggingMiddleware = require('redux-logger')();
}

// Create function for creating the store
const createStoreWithMiddleware = applyMiddleware(thunk, loggingMiddleware)(createStore);

// Create the singleton store instance and export
export const store = createStoreWithMiddleware(rootReducer, {});
export default store;