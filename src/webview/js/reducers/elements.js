import { SET_TREE } from 'actions/elements';

export let defaultState = {
  tree: [
    {
      class: 'MSDocument',
      id: 'doc-1',
      props: {},
      meta: {},
      children: [
        {
          class: 'MSPage',
          id: 'page-1',
          props: {
            name: 'Page 1'
          },
          meta: {},
          children: []
        },
        {
          class: 'MSPage',
          id: 'page-2',
          props: {
            name: 'Symbols'
          },
          meta: {},
          children: [
            {
              class: 'MSSymbolMaster',
              id: 'symbol-1',
              props: {
                name: 'Symbol 1'
              },
              meta: {
                instances: []
              },
              children: []
            }
          ]
        }
      ]
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
