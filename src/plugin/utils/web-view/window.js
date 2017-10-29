import WebViewCore from './web-view';

export default {
  open (identifier, path = 'index.html', width = 450, height = 350) {
    const frame = NSMakeRect(0, 0, width, height);
    const masks =
      NSTitledWindowMask | NSWindowStyleMaskClosable | NSResizableWindowMask;
    // NSFullSizeContentViewWindowMask;

    const window = NSPanel.alloc().initWithContentRect_styleMask_backing_defer(
      frame,
      masks,
      NSBackingStoreBuffered,
      false
    );
    window.backgroundColor = NSColor.whiteColor();
    window.setMinSize({ width: 400, height: 300 });
    window.titlebarAppearsTransparent = true;
    window.titleVisibility = NSWindowTitleHidden;
    window.movableByWindowBackground = true;

    // We use this dictionary to have a persistant storage of our NSWindow/NSPanel instance
    // Otherwise the instance is stored nowhere and gets release => Window closes
    let threadDictionary = NSThread.mainThread().threadDictionary();
    threadDictionary[identifier] = window;

    const webView = WebViewCore.createWebView(path, frame);

    window.title = 'Sketch Debugger';
    window.center();

    const view = NSView.alloc().init();
    view.frame = NSMakeRect(0, 0, 200, 30);
    view.setWantsLayer(true);
    view.layer.backgroundColor = NSColor.yellowColor();
    window.contentView().addSubview(view);

    window.contentView().addSubview(webView);

    window.makeKeyAndOrderFront(null);
  },

  findWebView (identifier) {
    let threadDictionary = NSThread.mainThread().threadDictionary();
    const window = threadDictionary[identifier];
    return window.contentView().subviews()[0];
  },

  sendAction (identifier, name, payload = {}) {
    return WebViewCore.sendAction(this.findWebView(identifier), name, payload);
  }
};
