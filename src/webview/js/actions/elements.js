export const SET_TREE = 'sketch/elements/SET_TREE';

export const setTree = tree => {
  return {
    type: SET_TREE,
    payload: {
      tree
    }
  };
};
