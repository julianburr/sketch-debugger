import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import reducers
import bridge from './bridge';
import console from './console';
import elements from './elements';
import network from './network';

export default combineReducers({
  bridge,
  console,
  elements,
  network,
  routing: routerReducer
});
