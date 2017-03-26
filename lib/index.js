'use strict';

var Core = {
  context: null,
  document: null,
  selection: null,
  sketch: null,

  pluginFolderPath: null,

  frameworks: {
    SketchPluginBoilerplate: {
      SPBWebViewMessageHandler: 'SPBWebViewMessageHandler'
    }
  },

  getPluginFolderPath: function getPluginFolderPath(context) {
    var split = context.scriptPath.split('/');
    split.splice(-3, 3);
    return split.join('/');
  },
  initWithContext: function initWithContext(context) {
    log('initWithContext');
    this.context = context;
    this.document = context.document || context.actionContext.document || MSDocument.currentDocument();
    this.selection = this.document.findSelectedLayers();
    this.sketch = this.context.api();

    this.pluginFolderPath = this.getPluginFolderPath(context);

    this.loadFrameworks();
    log('loaded');
    log(SPBWebViewMessageHandler);
  },
  loadFrameworks: function loadFrameworks() {
    for (var framework in this.frameworks) {
      for (var className in this.frameworks[framework]) {
        var test = this.loadFramework(framework, this.frameworks[framework][className]);
        log('test');
        log(test);
      }
    }
  },
  loadFramework: function loadFramework(frameworkName, frameworkClass) {
    log('Loading framework');
    log(frameworkName);
    log(frameworkClass);
    if (Mocha && NSClassFromString(frameworkClass) == null) {
      var frameworkDir = this.pluginFolderPath + '/Contents/Resources/frameworks/';
      log('frameworkDir=' + frameworkDir);
      log(this.context.scriptPath);
      var mocha = Mocha.sharedRuntime();
      return mocha.loadFrameworkWithName_inDirectory(frameworkName, frameworkDir);
    }
    return true;
  }
};

var WebViewCore = {
  identifierWindow: 'satchel-debugger--window',
  identifierPanel: 'satchel-debugger--panel',

  getFilePath: function getFilePath(file) {
    return Core.pluginFolderPath + '/Contents/Resources/webview/' + file;
  },
  createWebView: function createWebView(path, frame) {
    var config = WKWebViewConfiguration.alloc().init();
    var messageHandler = SPBWebViewMessageHandler.alloc().init();
    config.userContentController().addScriptMessageHandler_name(messageHandler, 'Sketch');

    var webView = WKWebView.alloc().initWithFrame_configuration(frame, config);
    var url = NSURL.fileURLWithPath(this.getFilePath(path));

    webView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable);
    webView.loadRequest(NSURLRequest.requestWithURL(url));

    return webView;
  },
  sendAction: function sendAction(webView, name) {
    var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (!webView || !webView.evaluateJavaScript_completionHandler) {
      return;
    }
    var script = 'sketchBridge(\'' + JSON.stringify({ name: name, payload: payload }) + '\');';
    log('sendAction');
    log(script);
    var check = webView.evaluateJavaScript_completionHandler(script, null);
  },
  receiveAction: function receiveAction(name) {
    var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    Core.document.showMessage('I received a message! 😊🎉🎉');
  }
};

var WebViewWindow = {
  open: function open(identifier) {
    var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'index.html';
    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 450;
    var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 350;

    var frame = NSMakeRect(0, 0, width, height);
    var masks = NSTitledWindowMask | NSWindowStyleMaskClosable | NSResizableWindowMask;
    var window = NSPanel.alloc().initWithContentRect_styleMask_backing_defer(frame, masks, NSBackingStoreBuffered, false);
    window.setMinSize({ width: 400, height: 300 });

    // We use this dictionary to have a persistant storage of our NSWindow/NSPanel instance
    // Otherwise the instance is stored nowhere and gets release => Window closes
    var threadDictionary = NSThread.mainThread().threadDictionary();
    threadDictionary[identifier] = window;

    var webView = WebViewCore.createWebView(path, frame);

    window.title = 'Sketch Debugger';
    window.center();
    window.contentView().addSubview(webView);

    window.makeKeyAndOrderFront(null);
  },
  findWebView: function findWebView(identifier) {
    var threadDictionary = NSThread.mainThread().threadDictionary();
    var window = threadDictionary[identifier];
    return window.contentView().subviews()[0];
  },
  sendAction: function sendAction(identifier, name) {
    var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return WebViewCore.sendAction(this.findWebView(identifier), name, payload);
  }
};

var Formatter$1 = {
  toArray: function toArray(object) {
    if (Array.isArray(object)) {
      return object;
    }
    var arr = [];
    for (var j = 0; j < object.count(); j++) {
      arr.push(object.objectAtIndex(j));
    }
    return arr;
  }
};

var WebViewPanel = {
  toggle: function toggle(identifier, path, width) {
    if (this.isOpen(identifier)) {
      this.close(identifier);
    } else {
      this.open(identifier, path, width);
    }
  },
  open: function open(identifier) {
    var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'index.html';
    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 250;

    var frame = NSMakeRect(0, 0, width, 600); // the height doesn't really matter here
    var contentView = Core.document.documentWindow().contentView();
    if (!contentView || this.isOpen()) {
      return false;
    }

    var stageView = contentView.subviews().objectAtIndex(0);
    var webView = WebViewCore.createWebView(path, frame);
    webView.identifier = identifier;

    // Inject our webview into the right spot in the subview list
    var views = stageView.subviews();
    var finalViews = [];
    var pushedWebView = false;
    for (var i = 0; i < views.count(); i++) {
      var view = views.objectAtIndex(i);
      finalViews.push(view);
      // NOTE: change the view identifier here if you want to add
      //  your panel anywhere else
      if (!pushedWebView && view.identifier() == 'view_canvas') {
        finalViews.push(webView);
        pushedWebView = true;
      }
    }
    // If it hasn't been pushed yet, push our web view
    // E.g. when inspector is not activated etc.
    if (!pushedWebView) {
      finalViews.push(webView);
    }
    // Finally, update the subviews prop and refresh
    stageView.subviews = finalViews;
    stageView.adjustSubviews();
  },
  close: function close(identifier) {
    var contentView = Core.document.documentWindow().contentView();
    if (!contentView) {
      return false;
    }
    // Search for web view panel
    var stageView = contentView.subviews().objectAtIndex(0);
    var finalViews = Formatter$1.toArray(stageView.subviews()).filter(function (view) {
      return view.identifier() != identifier;
    });
    stageView.subviews = finalViews;
    stageView.adjustSubviews();
  },
  isOpen: function isOpen(identifier) {
    return !!this.findWebView(identifier);
  },
  findWebView: function findWebView(identifier) {
    var contentView = Core.document.documentWindow().contentView();
    if (!contentView) {
      return false;
    }
    var splitView = contentView.subviews().objectAtIndex(0);
    var views = Formatter$1.toArray(splitView.subviews());
    return views.find(function (view) {
      return view.identifier() == identifier;
    });
  },
  sendAction: function sendAction(identifier, name) {
    var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return WebViewCore.sendAction(this.findWebView(identifier));
  }
};

var _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var WebViewUtil = _extends$1({}, WebViewCore, {

  Window: WebViewWindow,
  Panel: WebViewPanel
});

var DebugWindow = {
  open: function open() {
    WebViewUtil.Window.open(WebViewUtil.identifierWindow, 'index.html', 600, 400);
  },
  sendLog: function sendLog(values, type) {
    var addLog = {
      ts: new Date().getTime(),
      type: type,
      values: values.map(function (arg) {
        return DebugCore.prepareValue(arg);
      }),
      stack: DebugCore.getStack(),
      file: DebugCore.getFileName()
    };
    log('I`ll send these logs:');
    log(addLog);
    WebViewUtil.Window.sendAction(WebViewUtil.identifierWindow, 'addLog', addLog);
  },
  clearLogs: function clearLogs() {
    WebViewUtil.Window.sendAction(WebViewUtil.identifierWindow, 'clearLogs');
  }
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var DebugCore = {
  TYPES: {
    DEFAULT: 'default',
    WARNING: 'warning',
    ERROR: 'error',
    COUNTER: 'counter',
    TIMER: 'timer'
  },

  log: function (_log) {
    function log() {
      return _log.apply(this, arguments);
    }

    log.toString = function () {
      return _log.toString();
    };

    return log;
  }(function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    args.forEach(function (arg) {
      log(arg);
    });
    DebugWindow.sendLog(args, this.TYPES.DEFAULT);
  }),
  warn: function warn() {
    log('### WARN');

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    args.forEach(function (arg) {
      log(arg);
    });
    log('### WARN END');
    DebugWindow.sendLog(args, this.TYPES.WARNING);
  },
  error: function error() {
    log('### ERROR');

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    args.forEach(function (arg) {
      log(arg);
    });
    log('### ERROR END');
    DebugWindow.sendLog(args, this.TYPES.ERROR);
  },
  count: function count(log) {},
  time: function time(key) {},
  timeEnd: function timeEnd(key) {},
  group: function group(key) {},
  groupEnd: function groupEnd(key) {},
  clear: function clear() {},
  trace: function trace(withError) {},
  prepareValue: function prepareValue(value) {
    var type = 'String';
    var typeOf = typeof value === 'undefined' ? 'undefined' : _typeof(value);
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

    return { value: value, type: type };
  },
  prepareArrayDeep: function prepareArrayDeep(array) {
    var _this = this;

    return array.map(function (val) {
      return _this.prepareValue(val);
    });
  },
  prepareObjectDeep: function prepareObjectDeep(object) {
    var _this2 = this;

    var deep = {};
    Object.keys(object).forEach(function (key) {
      deep[key] = _this2.prepareValue(object[key]);
    });
    return deep;
  },
  getStack: function getStack() {
    var withError = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Error();

    if (!withError || !withError.stack) {
      return [];
    }
    var line = withError.line,
        column = withError.column;

    var stack = withError.stack.split('\n');
    stack = stack.map(function (s) {
      return s.replace(/\s\g/, '');
    });
    return { stack: stack, line: line, column: column };
  },
  getFileName: function getFileName() {
    var withError = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Error();

    return withError.fileName;
  }
};

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Debug$1 = _extends({}, DebugCore, {
  Window: DebugWindow
});

module.exports = Debug$1;
