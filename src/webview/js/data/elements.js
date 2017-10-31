import { createActionCreators } from 'utils/redux';

const demoTree = [
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
];

const defaultState = {
  tree: demoTree,
  showSearch: false,
  search: ''
};

const {
  reducer,
  actionCreators
} = createActionCreators('elements', defaultState, {
  setTree: (state, action) => ({
    ...state,
    tree: action.payload.tree
  }),

  fetchTree: (state, action) => state,

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
