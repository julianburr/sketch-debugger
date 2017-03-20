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
    DebugWindow.sendLog(args, this.TYPES.DEFAULT);
  },

  warn (...args) {
    log('### WARN');
    args.forEach(arg => {
      log(arg);
    });
    log('### WARN END');
    DebugWindow.sendLog(args, this.TYPES.WARNING);
  },

  error (...args) {
    log('### ERROR');
    args.forEach(arg => {
      log(arg);
    });
    log('### ERROR END');
    DebugWindow.sendLog(args, this.TYPES.ERROR);
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

