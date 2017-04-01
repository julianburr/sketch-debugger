import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import reducers
import bridge from './bridge';
import console from './console';
import elements from './elements';

export default combineReducers({
  bridge,
  console,
  elements,
  routing: routerReducer
});
