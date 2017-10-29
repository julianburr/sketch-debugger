import { ADD_REQUEST, SET_RESPONSE } from 'actions/elements';

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
        url: 'http://www.bar.foo',
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
  ]
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

    default:
      return state;
      break;
  }
};
