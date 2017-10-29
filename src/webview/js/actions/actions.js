export const ADD_ACTION = 'sketch/actions/ADD_ACTION';

export const addAction = (name, ts, context) => {
  return {
    type: ADD_ACTION,
    payload: {
      name,
      ts,
      context
    }
  };
};
