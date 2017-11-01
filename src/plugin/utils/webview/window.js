import { createWebView, sendAction as sendActionToWebView } from './webview';

export function open (identifier, path = 'index.html', options = {}) {
  let threadDictionary = NSThread.mainThread().threadDictionary();
  let window = threadDictionary[identifier];
  if (window) {
    window.makeKeyAndOrderFront(null);
    return;
  }

  // Sensible defaults for options
  const { width = 650, height = 450, title = 'Sketch Debugger' } = options;

  const frame = NSMakeRect(0, 0, width, height);
  const masks =
    NSTitledWindowMask | NSWindowStyleMaskClosable | NSResizableWindowMask;

  window = NSPanel.alloc().initWithContentRect_styleMask_backing_defer(
    frame,
    masks,
    NSBackingStoreBuffered,
    false
  );

  const components = [ 0.8, 0.78, 0.72, 1.0 ];
  const backgroundColor = NSColor.colorWithSRGBRed_green_blue_alpha(
    0.8,
    0.78,
    0.72,
    1.0
  );

  window.backgroundColor = backgroundColor;
  window.setMinSize({ width: 400, height: 400 });
  window.titlebarAppearsTransparent = true;
  window.titleVisibility = NSWindowTitleHidden;

  // We use this dictionary to have a persistant storage of our NSWindow/NSPanel instance
  // Otherwise the instance is stored nowhere and gets release => Window closes
  threadDictionary[identifier] = window;

  const webView = createWebView(path, frame);
  window.contentView().addSubview(webView);

  window.title = title;
  window.center();
  window.makeKeyAndOrderFront(null);
}

export function findWebView (identifier) {
  let threadDictionary = NSThread.mainThread().threadDictionary();
  const window = threadDictionary[identifier];
  return window ? window.contentView().subviews()[0] : null;
}

export function sendAction (identifier, name, payload = {}) {
  const webView = findWebView(identifier);
  if (!webView) {
    return;
  }
  return sendActionToWebView(webView, name, payload);
}
