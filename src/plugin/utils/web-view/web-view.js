import Core from 'utils/core';

export default {
  identifierWindow: 'satchel-debugger--window',
  identifierPanel: 'satchel-debugger--panel',

  getFilePath (file) {
    return `${Core.pluginFolderPath}/Contents/Resources/webview/${file}`;
  },

  createWebView (path, frame) {
    const config = WKWebViewConfiguration.alloc().init();
    const messageHandler = SPBWebViewMessageHandler.alloc().init();
    config
      .userContentController()
      .addScriptMessageHandler_name(messageHandler, 'Sketch');

    const webView = WKWebView.alloc().initWithFrame_configuration(
      frame,
      config
    );
    const url = NSURL.fileURLWithPath(this.getFilePath(path));

    webView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable);
    webView.loadRequest(NSURLRequest.requestWithURL(url));

    webView.movableByWindowBackground = true;

    return webView;
  },

  sendAction (webView, name, payload = {}) {
    if (!webView || !webView.evaluateJavaScript_completionHandler) {
      return;
    }
    const script = `sketchBridge('${JSON.stringify({ name, payload })}');`;
    log('sendAction');
    log(script);
    webView.evaluateJavaScript_completionHandler(script, null);
  },

  receiveAction (name, payload = {}) {
    Core.document.showMessage('I received a message! 😊🎉🎉');
  }
};
