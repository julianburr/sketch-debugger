import { createStore } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { hashHistory } from 'react-router';
import rootReducer from './reducers';

import { defaultState as bridge } from './reducers/bridge';
import { defaultState as console } from './reducers/console';
import { defaultState as elements } from './reducers/elements';

const defaultState = {
  bridge,
  console,
  elements
};

const store = createStore(rootReducer, defaultState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export const history = syncHistoryWithStore(hashHistory, store);

export default store;
