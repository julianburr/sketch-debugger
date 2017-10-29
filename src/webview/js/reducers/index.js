import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import reducers
import bridge, { defaultState as bridgeDefaultSrare } from './bridge';
import console, { defaultState as consoleDefaultState } from './console';
import elements, { defaultState as elementsDefaultState } from './elements';
import network, { defaultState as networkDefaultState } from './network';
import actions, { defaultState as actionsDefaultState } from './actions';

export default combineReducers({
  bridge,
  console,
  elements,
  network,
  actions,
  routing: routerReducer
});

export const defaultState = {
  bridge: bridgeDefaultSrare,
  console: consoleDefaultState,
  elements: elementsDefaultState,
  network: networkDefaultState,
  actions: actionsDefaultState
};
