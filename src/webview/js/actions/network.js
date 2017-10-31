export const ADD_REQUEST = 'sketch/network/ADD_REQUEST';
export const SET_RESPONSE = 'sketch/network/SET_RESPONSE';
export const CLEAR_REQUESTS = 'sketch/network/CLEAR_REQUESTS';
export const SET_SEARCH = 'sketch/network/SET_SEARCH';
export const SET_SEARCH_OPEN = 'sketch/network/SET_SEARCH_OPEN';
export const SET_SHOW_TIMES = 'sketch/network/SET_SHOW_TIMES';

export const addRequest = (request, uid) => {
  return {
    type: ADD_REQUEST,
    payload: {
      request,
      uid
    }
  };
};

export const setResponse = (response, uid) => {
  return {
    type: SET_RESPONSE,
    payload: {
      response,
      uid
    }
  };
};

export const clearRequests = () => {
  return {
    type: CLEAR_REQUESTS
  };
};

export const setSearch = search => {
  return {
    type: SET_SEARCH,
    payload: {
      search
    }
  };
};

export const setSearchOpen = open => {
  return {
    type: SET_SEARCH_OPEN,
    payload: {
      open
    }
  };
};

export const setShowTimes = show => {
  return {
    type: SET_SHOW_TIMES,
    payload: {
      show
    }
  };
};
