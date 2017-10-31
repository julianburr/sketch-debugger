import { createActionCreators } from 'utils/redux';

const demoLogs = [
  {
    type: 'default',
    plugin: 'SomePlugin.sketchplugin',
    source: {
      file: 'plugin.js',
      line: 34,
      column: 12
    },
    ts: new Date().getTime() - 20000,
    values: [
      {
        type: 'string',
        value: 'Hello World',
        name: null
      }
    ]
  },
  {
    type: 'warning',
    plugin: 'SomePlugin.sketchplugin',
    source: {
      file: 'plugin.js',
      line: 34,
      column: 12
    },
    ts: new Date().getTime() - 15000,
    values: [
      {
        type: 'object',
        name: null,
        value: [
          {
            type: 'string',
            name: 'myName',
            value: 'This is my name'
          },
          {
            type: 'object',
            name: 'foo',
            value: [
              {
                type: 'string',
                name: 'hello',
                value: 'world'
              }
            ]
          }
        ]
      },
      {
        type: 'number',
        name: null,
        value: 12
      },
      {
        type: 'boolean',
        name: null,
        value: true
      },
      {
        type: 'empty',
        name: null,
        value: undefined
      }
    ]
  },
  {
    type: 'error',
    plugin: 'SomePlugin.sketchplugin',
    source: {
      file: 'plugin.js',
      line: 34,
      column: 12
    },
    ts: new Date().getTime() - 15000,
    values: [
      {
        type: 'array',
        name: null,
        value: [
          {
            type: 'string',
            name: null,
            value: 'This is my name'
          },
          {
            type: 'object',
            name: null,
            value: [
              {
                type: 'string',
                name: 'hello',
                value: 'world'
              }
            ]
          }
        ]
      },
      {
        type: 'class',
        name: 'MSDocument',
        value: {
          id: 'doc-1',
          meta: {},
          props: {
            id: 'doc-1'
          }
        }
      }
    ]
  }
];

const defaultState = {
  logs: demoLogs,
  showTypes: [ 'default', 'warning', 'error' ],
  showTimes: false,
  showSearch: false,
  search: ''
};

const {
  reducer,
  actionCreators
} = createActionCreators('console', defaultState, {
  addLog: (state, action) => ({
    ...state,
    logs: [ ...state.requests, action.payload.log ]
  }),

  clearLogs: (state, action) => ({
    ...state,
    logs: []
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
  }),

  setShowTypes: (state, actions) => ({
    ...state,
    showTypes: action.payload.types
  })
});

export { defaultState, reducer, actionCreators };
