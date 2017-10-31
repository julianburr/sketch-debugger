import {
  ADD_REQUEST,
  SET_RESPONSE,
  CLEAR_REQUESTS,
  SET_SEARCH_OPEN,
  SET_SEARCH,
  SET_SHOW_TIMES
} from 'actions/network';

export let defaultState = {
  requests: [
    {
      id: '123',
      request: {
        url: 'http://www.foo.bar',
        protocol: 'http',
        args: {
          foo: 'bar'
        },
        method: 'POST',
        ts: new Date().getTime() - 2000
      },
      response: {
        code: 200,
        body: {
          foo: 'bar'
        },
        ts: new Date().getTime() - 500
      }
    },
    {
      id: '456',
      request: {
        url: 'http://www.bar.foo/sdsfdsf/dfsdfsdf/sdfsdfsd/fsdfdsfsdfsd',
        protocol: 'http',
        args: {
          foo: 'bar'
        },
        method: 'GET',
        ts: new Date().getTime() - 1000
      },
      response: {
        code: 404,
        body: null,
        ts: new Date().getTime() - 600
      }
    },
    {
      id: '456',
      request: {
        url: 'http://www.hello.world',
        protocol: 'http',
        args: {
          foo: 'bar'
        },
        method: 'PATCH',
        ts: new Date().getTime() - 200
      },
      response: {}
    }
  ],
  search: '',
  searchOpen: false,
  showTimes: false
};

export default (state, action) => {
  // Make sure to apply a default state if necessary
  if (state === undefined) {
    state = defaultState;
  }
  // Switch case for all possible actions
  switch (action.type) {
    case ADD_REQUEST:
      return {
        ...state,
        requests: [
          ...state.requests,
          {
            id: action.payload.id,
            request: action.payload.request,
            response: {}
          }
        ]
      };
      break;

    case SET_RESPONSE:
      const findRequestIndex = state.requests.findIndex(
        r => r.id === action.payload.id
      );
      if (findRequestIndex === -1) {
        console.error(
          `Cannot find request for response with id ${action.payload.id}!`
        );
        return state;
      }

      let requests = [ ...state.requests ];
      requests[findRequestIndex] = {
        ...requests.findRequestIndex,
        response: action.payload.response
      };

      return {
        ...state,
        requests
      };
      break;

    case CLEAR_REQUESTS:
      return {
        ...state,
        requests: []
      };

    case SET_SEARCH_OPEN:
      return {
        ...state,
        searchOpen: !!action.payload.open
      };

    case SET_SEARCH:
      return {
        ...state,
        search: action.payload.search
      };

    case SET_SHOW_TIMES:
      return {
        ...state,
        showTimes: !!action.payload.show
      };

    default:
      return state;
      break;
  }
};
