import { createActionCreators } from 'utils/redux';

const demoRequests = [
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
    id: '789',
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
];

const defaultState = {
  requests: demoRequests,
  showTimes: false,
  showSearch: false,
  search: ''
};

const {
  reducer,
  actionCreators
} = createActionCreators('network', defaultState, {
  addRequest: (state, action) => ({
    ...state,
    requests: [
      ...state.requests,
      {
        id: action.payload.id,
        request: action.payload.request,
        response: {}
      }
    ]
  }),

  addResponse: (state, action) => {
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
  },

  clearRequests: (state, action) => ({
    ...state,
    requests: []
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
