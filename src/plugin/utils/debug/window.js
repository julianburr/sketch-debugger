import WebViewUtil from 'utils/web-view';
import Formatter from 'utils/formatter';

export default {
  open (width, height) {
    WebViewUtil.Window.open(WebViewUtil.identifierWindow, width, height);
  },

  sendLog (values, type) {
    const addLog = {
      ts: new Date().getTime(),
      type,
      values: values.map(arg => {
        return this.prepareValue(arg);
      }),
      stack: this.getStack(),
      file: this.getFileName()
    };
    log('Ill send these logs')
    log(addLog)
    WebViewUtil.Window.sendAction(WebViewUtil.identifierWindow, 'addLog', addLog);
  },

  prepareValue (value) {
    let type = 'String';
    const typeOf = typeof value;
    if (value instanceof Error) {
      type = 'Error';
    } else if (Array.isArray(value)) {
      type = 'Array';
      value = value.map(val => this.prepareValue(val));
    } else if (typeOf === 'object') {
      if (value.isKindOfClass && typeof value.class === 'function') {
        type = String(value.class());
        // TODO: Here could come some meta data saved as value
        if (type == 'NSDictionary' || type == '__NSDictionaryM') {
          // value = Formatter.toArray(value).map(val => this.prepareValue(val));
        }
      } else {
        type = 'Object';
        let deep = {};
        Object.keys(value).forEach(key => {
          deep[key] = this.prepareValue(value[key]);
        });
        value = {...deep};
      }
    } else if (typeOf === 'function') {
      type = 'Function';
    } else if (value === true || value === false) {
      type = 'Boolean';
    } else if (value === null) {
      type = 'Null';
    } else if (value === undefined) {
      type = 'Undefined';
    } else if (Number.isInteger(value)) {
      type = 'Integer';
    }

    return { value, type };
  },

  clearLogs () {
    WebViewUtil.Window.sendAction(WebViewUtil.identifierWindow, 'clearLogs');
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
