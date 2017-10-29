import {
  ADD_LOG,
  CLEAR_LOGS,
  SET_SEARCH,
  SET_SEARCH_OPEN,
  SET_TYPES,
  SELECT_VALUE,
  SET_SHOW_LOG_TIMES
} from 'actions/console';
import moment from 'moment';

export let defaultState = {
  logs: [
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
      type: 'default',
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
  ],
  clearTs: null,
  search: '',
  searchOpen: false,
  types: {
    default: true,
    warning: true,
    error: true
  },
  showLogTimes: false
};

export default (state, action) => {
  // Make sure to apply a default state if necessary
  if (state === undefined) {
    state = defaultState;
  }
  // Switch case for all possible actions
  switch (action.type) {
    case ADD_LOG:
      return {
        ...state,
        logs: [ ...state.logs ].concat([ action.payload.log ])
      };
      break;

    case CLEAR_LOGS:
      return {
        ...state,
        logs: [],
        clearTs: moment()
      };
      break;

    case SET_SEARCH:
      return {
        ...state,
        search: action.payload.search
      };
      break;

    case SET_SEARCH_OPEN:
      return {
        ...state,
        searchOpen: action.payload.open
      };
      break;

    case SET_TYPES:
      return {
        ...state,
        types: action.payload.types
      };
      break;

    case SELECT_VALUE:
      return {
        ...state,
        selectedLog: action.payload.key,
        selectedLogValue: action.payload.value
      };
      break;

    case SET_SHOW_LOG_TIMES:
      return {
        ...state,
        showLogTimes: action.payload.show
      };
      break;

    default:
      return state;
      break;
  }
};
