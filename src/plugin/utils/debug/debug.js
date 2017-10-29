import { sendLog } from './window';
import { toArray } from 'utils/formatter';

export const TYPES = {
  DEFAULT: 'default',
  WARNING: 'warning',
  ERROR: 'error',
  COUNTER: 'counter',
  TIMER: 'timer'
};

let timers = {};
let counters = {};

export function _log (...args) {
  args.forEach(arg => {
    log(arg);
  });
  sendLog(args, TYPES.DEFAULT);
}

export function warn (...args) {
  log('### WARN');
  args.forEach(arg => {
    log(arg);
  });
  log('### WARN END');
  sendLog(args, TYPES.WARNING);
}

export function error (...args) {
  log('### ERROR');
  args.forEach(arg => {
    log(arg);
  });
  log('### ERROR END');
  sendLog(args, TYPES.ERROR);
}

export function count (key) {
  counters[key] = counters[key] ? counters[key] + 1 : 1;
  log(`### COUNTER: ${counter[key]} - ${key}`);
}

export function time (key) {
  timers[key] = new Date().getTime();
  log(`### TIME START - ${key}`);
}

export function timeEnd (key) {
  if (!timers[key]) {
    return;
  }
  const duration = new Date().getTime() - timers[key];
  timers[key] = null;
  log(`### TIME END: ${duration}ms - ${key}`);
}

export function group (key) {}

export function groupEnd (key) {}

export function clear () {}

export function trace (withError) {}

export function networkRequest (uid, request) {}

export function networkResponse (uid, response) {}

export function prepareValue (value) {
  let type = 'string';
  const typeOf = typeof value;
  if (value instanceof Error) {
    type = 'error';
  } else if (Array.isArray(value)) {
    type = 'array';
    value = prepareArrayDeep(value);
  } else if (typeOf === 'object') {
    if (value.isKindOfClass && typeof value.class === 'function') {
      type = 'class';
      const name = String(value.class());
      value = { name };
      // TODO: Here could come some meta data saved as value
      if (name == 'NSDictionary' || name == '__NSDictionaryM') {
        type = 'object';
        value = prepareObjectDeep(Object(value));
      } else if (name == 'NSArray' || name == 'NSMutuableArray') {
        type = 'array';
        value = prepareArrayDeep(toArray(value));
      }
    } else {
      type = 'object';
      value = prepareObjectDeep(value);
    }
  } else if (typeOf === 'function') {
    type = 'function';
  } else if (value === true || value === false) {
    type = 'boolean';
  } else if (value === null || value === undefined || Number.isNaN(value)) {
    type = 'empty';
  } else if (typeOf === 'number') {
    type = 'number';
  }

  return { value, type };
}

export function prepareArrayDeep (array) {
  return array.map(v => prepareValue(v));
}

export function prepareObjectDeep (object) {
  let deep = {};
  Object.keys(object).forEach(key => {
    deep[key] = prepareValue(object[key]);
  });
  return deep;
}

export function getStack (withError = new Error()) {
  log('getStack');
  log(withError.stack);
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

    const filePath = file;
    file = file.split('/');
    file = file[file.length - 1];

    return { fn, file, filePath, line, column };
  });

  const deleteAllUntil = stack.findIndex(s => s.fn == 'log');
  stack.splice(0, deleteAllUntil);

  return stack;
}
