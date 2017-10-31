import _ from 'lodash';

export function createActionCreators (prefix, defaultState, methods) {
  const actions = Object.keys(methods).map(key => ({
    key,
    type: `${prefix}/${_.snakeCase(key).toUpperCase()}`,
    reducer: methods[key]
  }));

  const reducer = (state, action) => {
    if (!state) {
      return defaultState;
    }

    const method = actions.find(a => a.type === action.type);
    if (!method) {
      return state;
    }

    return method.reducer(state, action);
  };

  const actionCreators = actions.reduce((creators, action) => {
    creators[action.key] = payload => ({
      type: action.type,
      payload
    });
    return creators;
  }, {});

  return {
    reducer,
    actionCreators
  };
}
