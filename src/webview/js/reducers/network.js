import { ADD_REQUEST, SET_RESPONSE } from 'actions/elements';
import moment from 'moment';

export let defaultState = {
  requests: []
};

export default (state, action) => {
  // Make sure to apply a default state if necessary
  if (state === undefined) {
    state = defaultState;
  }
  // Switch case for all possible actions
  switch (action.type) {
    case ADD_REQUEST:
      return {
        ...state,
        requests: [
          ...state.requests,
          {
            uid: action.payload.uid,
            request: action.payload.request,
            started: moment(),
            finished: false,
            response: null
          }
        ]
      };
      break;

    case SET_RESPONSE:
      const findRequestIndex = state.requests.findIndex(r => r.uid === action.payload.uid);
      if (findRequestIndex === -1) {
        console.error(`Cannot find request for response with uid ${action.payload.uid}!`);
        return state;
      }

      let requests = [...state.requests];
      requests[findRequestIndex] = {
        ...requests.findRequestIndex,
        finished: moment(),
        response: action.payload.response
      };

      return {
        ...state,
        requests
      };
      break;

    default:
      return state;
      break;
  }
};
