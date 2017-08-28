export const ADD_LOG = 'sketch/console/ADD_LOG';
export const CLEAR_LOGS = 'sketch/console/CLEAR_LOGS';
export const SET_SEARCH = 'sketch/console/SET_SEARCH';
export const SET_SEARCH_OPEN = 'sketch/console/SET_SEARCH_OPEN';
export const SET_TYPES = 'sketch/console/SET_TYPES';
export const SELECT_VALUE = 'sketch/console/SELECT_VALUE';
export const SET_SHOW_LOG_TIMES = 'sketch/console/SET_SHOW_LOG_TIMES';

export const addLog = log => {
  return {
    type: ADD_LOG,
    payload: {
      log
    }
  };
};

export const clearLogs = () => {
  return {
    type: CLEAR_LOGS
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

export const setTypes = types => {
  return {
    type: SET_TYPES,
    payload: {
      types
    }
  };
};

export const selectValue = (key, value) => {
  return {
    type: SELECT_VALUE,
    payload: {
      key,
      value
    }
  };
};

export const setShowLogTimes = show => {
  return {
    type: SET_SHOW_LOG_TIMES,
    payload: {
      show
    }
  };
};
