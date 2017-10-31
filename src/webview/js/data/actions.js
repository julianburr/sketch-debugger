import { createActionCreators } from 'utils/redux';

const demoActions = [
  {
    name: 'SomeAction',
    ts: new Date().getTime() - 20000,
    context: {
      foo: 'bar'
    }
  },
  {
    name: 'AnotherAction',
    ts: new Date().getTime() - 5000,
    context: {
      foo: 'bar'
    },
    finish: {
      name: 'AnotherAction.finish',
      ts: new Date().getTime() - 2000,
      context: {
        foo: 'bar'
      }
    }
  },
  {
    name: 'SomeAction',
    ts: new Date().getTime() - 3000,
    context: {
      foo: 'bar'
    }
  }
];

const defaultState = {
  actions: demoActions,
  showTimes: false,
  showSearch: false,
  search: ''
};

const {
  reducer,
  actionCreators
} = createActionCreators('actions', defaultState, {
  addAction: (state, action) => {
    let actionName = action.payload.action.name;
    if (actionName.endsWith('.finish')) {
      actionName = actionName.substr(0, actionName.length - 7);
      const actionIndex = state.actions.findIndex(
        a => a.name === actionName && !a.finish
      );
      if (actionIndex === -1) {
        return state;
      }
      let newState = { ...state, actions: [ ...state.actions ] };
      newState.actions[actionIndex].finish = action.payload.action;
      return newState;
    }
    let finish = undefined;
    if (actionName.endsWith('.start')) {
      actionName = actionName.substr(0, actionName.length - 6);
      finish = {};
    }
    return {
      ...state,
      actions: [
        ...state.actions,
        {
          ...action.payload.action,
          name: actionName,
          finish
        }
      ]
    };
  },

  clearActions: (state, action) => ({
    ...state,
    actions: []
  }),

  setShowTimes: (state, action) => ({
    ...state,
    showTimes: !!action.payload.show
  }),

  setShowSearch: (state, action) => ({
    ...state,
    showSearch: !!action.payload.show
  }),

  setSearch: (state, action) => ({
    ...state,
    search: action.payload.search
  })
});

export { defaultState, reducer, actionCreators };
