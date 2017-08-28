export const ADD_REQUEST = 'sketch/network/ADD_REQUEST';
export const SET_RESPONSE = 'sketch/network/SET_RESPONSE';

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
