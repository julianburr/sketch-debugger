import moment from 'moment';
import DebugWindow from './window';

export default {
  TYPES: {
    DEFAULT: 'default',
    WARNING: 'warning',
    ERROR: 'error',
    COUNTER: 'counter',
    TIMER: 'timer'
  },

  log (...args) {
    args.forEach(arg => {
      log(arg);
    });
    DebugWindow.sendLogs(args);
  },

  warn (...args) {
    log('### WARN');
    args.forEach(arg => {
      log(arg);
    });
    log('### WARN END');
    DebugWindow.sendLogs(args, this.TYPES.WARNING);
  },

  error (...args) {
    log('### ERROR');
    args.forEach(arg => {
      log(arg);
    });
    log('### ERROR END');
    DebugWindow.sendLogs(args, this.TYPES.ERROR);
  },

  count (log) {

  },

  time (key) {

  },

  timeEnd (key) {

  },

  group (key) {

  },

  groupEnd (key) {

  },

  clear () {

  },

  trace (withError) {

  }
};

