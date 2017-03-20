import { ADD_LOG, CLEAR_LOGS, SET_SEARCH, SET_SEARCH_OPEN, SET_TYPES, SELECT_VALUE, SET_SHOW_LOG_TIMES } from 'actions/console';
import moment from 'moment';

export let defaultState = {
  logs: [],
  clearTs: null,
  search: '',
  searchOpen: false,
  types: {
    default: true,
    warning: true,
    error: true
  },
  selectedLog: null,
  selectedLogValue: null,
  showLogTimes: false
};

export default (state, action) => {
  // Make sure to apply a default state if necessary
  if (state === undefined) {
    state = defaultState;
  }
  // Switch case for all possible actions
  switch (action.type) {
    case ADD_LOG:
      return {
        ...state,
        logs: [...state.logs].concat([action.payload.log])
      };
      break;

    case CLEAR_LOGS:
      return {
        ...state,
        logs: [],
        clearTs: moment()
      };
      break;

    case SET_SEARCH:
      return {
        ...state,
        search: action.payload.search
      };
      break;

    case SET_SEARCH_OPEN:
      return {
        ...state,
        searchOpen: action.payload.open
      };
      break;

    case SET_TYPES:
      return {
        ...state,
        types: action.payload.types
      };
      break;

    case SELECT_VALUE:
      return {
        ...state,
        selectedLog: action.payload.key,
        selectedLogValue: action.payload.value
      };
      break;

    case SET_SHOW_LOG_TIMES:
      return {
        ...state,
        showLogTimes: action.payload.show
      };
      break;

    default:
      return state;
      break;
  }
};
