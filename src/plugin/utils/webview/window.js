import { createWebView, sendAction as sendActionToWebView } from './webview';

export function open (identifier, path = 'index.html', options = {}) {
  let threadDictionary = NSThread.mainThread().threadDictionary();
  let window = threadDictionary[identifier];
  if (window) {
    window.makeKeyAndOrderFront(null);
    return;
  }

  // Sensible defaults for options
  const { width = 600, height = 400, title = 'Sketch Debugger' } = options;

  const frame = NSMakeRect(0, 0, width, height);
  const masks =
    NSTitledWindowMask | NSWindowStyleMaskClosable | NSResizableWindowMask;
  window = NSPanel.alloc().initWithContentRect_styleMask_backing_defer(
    frame,
    masks,
    NSBackingStoreBuffered,
    false
  );
  window.backgroundColor = NSColor.whiteColor();
  window.setMinSize({ width: 400, height: 300 });
  window.titlebarAppearsTransparent = true;
  window.titleVisibility = NSWindowTitleHidden;

  // We use this dictionary to have a persistant storage of our NSWindow/NSPanel instance
  // Otherwise the instance is stored nowhere and gets release => Window closes
  threadDictionary[identifier] = window;

  const webView = createWebView(path, frame);

  window.title = title;
  window.center();

  window.movableByWindowBackground = true;
  window.isMovableByWindowBackground = true;

  let box = NSBox.alloc().initWithFrame(NSMakeRect(0, 300, 100, 100));
  box.boxType = NSBoxCustom;
  box.borderType = NSLineBorder;
  box.fillColor = NSColor.yellowColor(); //NSColor.colorWithCalibratedRed_green_blue_alpha(255.0, 0.0, 0.0, 1.0)
  box.mouseDownCanMoveWindow = true;
  box.opaque = true;
  box.setAcceptsTouchEvents(true);
  // box.setIgnoresMouseEvents(false);

  window.makeKeyAndOrderFront(null);

  window.contentView().addSubview(webView);
  // window.contentView().addSubview(box);

  log('box');
  log(box.registeredDraggedTypes());
  log('window');
  log(window.isMovableByWindowBackground());
}

export function findWebView (identifier) {
  let threadDictionary = NSThread.mainThread().threadDictionary();
  const window = threadDictionary[identifier];
  return window.contentView().subviews()[0];
}

export function sendAction (identifier, name, payload = {}) {
  return sendActionToWebView(findWebView(identifier), name, payload);
}
