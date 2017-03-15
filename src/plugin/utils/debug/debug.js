import moment from 'moment';
import DebugPanel from './panel';

export default {
  TYPES: {
    DEFAULT: 'log-default',
    WARNING: 'log-warning',
    ERROR: 'log-error',
    COUNTER: 'log-counter',
    TIMER: 'log-timer'
  },

  log (...args) {
    args.forEach(arg => {
      log(arg); 
    });
    DebugPanel.sendLogs(args);
  },

  warn (...args) {
    args.forEach(arg => {
      log(arg); 
    });
    DebugPanel.sendLogs(args, this.TYPES.WARNING);
  },

  error (...args) {
    args.forEach(arg => {
      log(arg); 
    });
    DebuggerPanel.sendLogs(args, this.TYPES.ERROR);
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
    
  },
}

