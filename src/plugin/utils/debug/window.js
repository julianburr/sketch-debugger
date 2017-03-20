import WebViewUtil from 'utils/web-view';
import Formatter from 'utils/formatter';

import DebugCore from './debug';

export default {
  open () {
    WebViewUtil.Window.open(WebViewUtil.identifierWindow, 'index.html', 600, 400);
  },

  sendLog (values, type) {
    const addLog = {
      ts: new Date().getTime(),
      type,
      values: values.map(arg => {
        return DebugCore.prepareValue(arg);
      }),
      stack: DebugCore.getStack(),
      file: DebugCore.getFileName()
    };
    log('I`ll send these logs:')
    log(addLog)
    WebViewUtil.Window.sendAction(WebViewUtil.identifierWindow, 'addLog', addLog);
  },

  clearLogs () {
    WebViewUtil.Window.sendAction(WebViewUtil.identifierWindow, 'clearLogs');
  }
};
