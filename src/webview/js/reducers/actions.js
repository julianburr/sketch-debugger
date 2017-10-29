import { ADD_ACTION } from 'actions/actions';

export let defaultState = {
  actions: [
    {
      name: 'SomeAction',
      ts: new Date().getTime() - 20000,
      context: {
        foo: 'bar'
      }
    },
    {
      name: 'AnotherAction.start',
      ts: new Date().getTime() - 5000,
      context: {
        foo: 'bar'
      }
    },
    {
      name: 'SomeAction',
      ts: new Date().getTime() - 3000,
      context: {
        foo: 'bar'
      }
    },
    {
      name: 'AnotherAction.finish',
      ts: new Date().getTime() - 2000,
      context: {
        foo: 'bar'
      }
    }
  ]
};

export default (state, action) => {
  // Make sure to apply a default state if necessary
  if (state === undefined) {
    state = defaultState;
  }
  // Switch case for all possible actions
  switch (action.type) {
    case ADD_ACTION:
      return {
        ...state,
        requests: [ ...state.actions, action.payload ]
      };
      break;

    default:
      return state;
      break;
  }
};
