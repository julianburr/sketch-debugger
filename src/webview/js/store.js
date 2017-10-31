import { createStore, combineReducers } from 'redux';
import {
  syncHistoryWithStore,
  routerReducer as routing
} from 'react-router-redux';
import { hashHistory } from 'react-router';

import { reducer as console } from 'data/console';
import { reducer as network } from 'data/network';
import { reducer as actions } from 'data/actions';
import { reducer as elements } from 'data/elements';

const store = createStore(
  combineReducers({
    console,
    network,
    actions,
    elements,
    routing
  }),
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export const history = syncHistoryWithStore(hashHistory, store);

export default store;
