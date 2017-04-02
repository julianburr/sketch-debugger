import DebugWindow from './window';
import Formatter from 'utils/formatter';

const coreLog = log;

export default {
  TYPES: {
    DEFAULT: 'default',
    WARNING: 'warning',
    ERROR: 'error',
    COUNTER: 'counter',
    TIMER: 'timer'
  },

  timers: {},
  counters: {},

  log (...args) {
    args.forEach(arg => {
      coreLog(arg);
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

  count (key) {
    this.counters[key] = this.counters[key] ? this.counters[key] + 1 : 1;
    log(`### COUNTER: ${this.counter[key]} - ${key}`);
  },

  time (key) {
    this.timers[key] = new Date().getTime();
    log(`### TIME START - ${key}`);
  },

  timeEnd (key) {
    if (!this.timers[key]) {
      return;
    }
    const duration = new Date().getTime() - this.timers[key];
    this.timers[key] = null;
    log(`### TIME END: ${duration}ms - ${key}`);
  },

  group (key) {

  },

  groupEnd (key) {

  },

  clear () {

  },

  trace (withError) {

  },

  prepareValue (value) {
    let type = 'String';
    const typeOf = typeof value;
    if (value instanceof Error) {
      type = 'Error';
    } else if (Array.isArray(value)) {
      type = 'Array';
      value = this.prepareArrayDeep(value);
    } else if (typeOf === 'object') {
      if (value.isKindOfClass && typeof value.class === 'function') {
        type = String(value.class());
        // TODO: Here could come some meta data saved as value
        if (type == 'NSDictionary' || type == '__NSDictionaryM') {
          type = 'NSDictionary';
          value = this.prepareObjectDeep(Object(value));
        } else if (type == 'NSArray' || type == 'NSMutuableArray') {
          value = this.prepareArrayDeep(Formatter.toArray(value));
        } else {
          value = type;
        }
      } else {
        type = 'Object';
        value = this.prepareObjectDeep(value);
      }
    } else if (typeOf === 'function') {
      type = 'Function';
    } else if (value === true || value === false) {
      type = 'Boolean';
    } else if (value === null || value === undefined || Number.isNaN(value)) {
      type = 'Empty';
    } else if (typeOf === 'number') {
      type = 'Number';
    }

    return { value, type };
  },

  prepareArrayDeep (array) {
    return array.map(v => this.prepareValue(v));
  },

  prepareObjectDeep (object) {
    let deep = {};
    Object.keys(object).forEach(key => {
      deep[key] = this.prepareValue(object[key]);
    });
    return deep;
  },

  getStack (withError = new Error()) {
    log('getStack')
    log(withError.stack)
    let stack = withError.stack.split('\n');
    stack = stack.map(s => s.replace(/\s\g/, ''));

    stack = stack.map(entry => {
      let fn = null;
      let file = null;
      let line = null;
      let column = null;
      let split = entry.split('@');
      fn = split[0];
      file = split[1];

      if (file) {
        split = file.split(':');
        file = split[0];
        line = split[1];
        column = split[2];
      }

      return {fn, file, line, column};
    });

    const deleteAllUntil =  stack.findIndex(s => s.fn == 'log');
    stack.splice(0, deleteAllUntil);
    
    return stack;
  }
};

