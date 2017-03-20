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
    return array.map(val => this.prepareValue(val));
  },

  prepareObjectDeep (object) {
    let deep = {};
    Object.keys(object).forEach(key => {
      deep[key] = this.prepareValue(object[key]);
    });
    return deep;
  },

  getStack (withError = new Error()) {
    if (!withError || !withError.stack) {
      return [];
    }
    const { line, column } = withError;
    let stack = withError.stack.split('\n');
    stack = stack.map(s => s.replace(/\s\g/, ''));
    return { stack, line, column };
  },

  getFileName (withError = new Error()) {
    return withError.fileName;
  }
};

