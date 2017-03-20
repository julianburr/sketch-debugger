import { sendAction } from 'utils/sketch';
import { SEND_ACTION, RECEIVE_ACTION } from 'actions/bridge';
import moment from 'moment';
import store from 'webview/js/store';
import { addLog } from 'actions/console';

export let defaultState = {
  actions: []
};

export default (state, action) => {
  // Make sure to apply a default state if necessary
  if (state === undefined) {
    state = defaultState;
  }
  // Switch case for all possible actions
  switch (action.type) {
    case SEND_ACTION:
      sendAction(action.payload.name, action.payload.payload).catch(e => {
        console.error(e);
      });
      return {
        ...state,
        actions: [...state.actions].concat([{
          ts: moment(),
          type: 'outbound',
          name: action.payload.name,
          payload: action.payload.payload
        }])
      };
      break;

    case RECEIVE_ACTION:
      switch (action.payload.name) {
        case 'addLog': 
          setTimeout(() => {
            store.dispatch(addLog(action.payload.payload));
          });
          break;
        default:
          break;
      }
      return {
        ...state,
        actions: [...state.actions].concat([{
          ts: moment(),
          type: 'inbound',
          name: action.payload.name,
          payload: action.payload.payload
        }])
      };
      break;

    default:
      return state;
      break;
  }
};
