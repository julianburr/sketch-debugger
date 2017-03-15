import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import reducers
import bridge from './bridge';
import console from './console';

export default combineReducers({
  bridge,
  console,
  routing: routerReducer
});
