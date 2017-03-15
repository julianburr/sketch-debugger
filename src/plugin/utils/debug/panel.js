import moment from 'moment';
import WebViewUtil from 'utils/web-view';

export default {
  open () {
    WebViewUtil.openWindow();
  },

  sendLogs (values, type) {
    const logs = {
      ts: moment().valueOf(),
      type,
      logs: values.map(arg => {
        let type = typeof arg;
        let isClass = false;
        if (type == 'object' && arg.isKindOfClass && typeof arg.class == 'function') {
          type = arg.class();
          isClass = true;
        }
        return {
          type,
          isClass,
          value: isClass ? this.getClassValue(arg) : arg
        }
      }),
      trace: this.getTrace()
    }
    WebViewUtil.sendAction('addLogs', logs)
  },

  clearLogs () {
    WebViewUtil.sendAction('clearLogs');
  },

  getClassValue (instance) {
    return String(instance);
  },

  getTrace (withError = new Error()) {
    if (!withError || !withError.stack) {
      return [];
    }
    const { line, column } = withError;
    let stack = withError.stack.split('\n');
    stack = stack.map(s => s.replace(/\s\g/, ''));
    return { stack, line, column };
  }
}