import { SET_TREE } from 'actions/elements';
import moment from 'moment';

export let defaultState = {
  tree: []
};

export default (state, action) => {
  // Make sure to apply a default state if necessary
  if (state === undefined) {
    state = defaultState;
  }
  // Switch case for all possible actions
  switch (action.type) {
    case SET_TREE:
      return {
        ...state,
        tree: action.payload.tree
      };
      break;

    default:
      return state;
      break;
  }
};
