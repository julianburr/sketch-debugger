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
      values: values.map(v => DebugCore.prepareValue(v)),
      stack: DebugCore.getStack()
    };
    WebViewUtil.Window.sendAction(WebViewUtil.identifierWindow, 'addLog', addLog);
  },

  sendElementTree () {
    WebViewUtil.Window.sendAction(WebViewUtil.identifierWindow, 'setElementTree', this.getElementTree());
    DebugCore.log(this.getElementTree());
  },

  getElementTree () {
    const windows = Formatter.toArray(NSApp.windows()).filter(win => {
      return win.isKindOfClass(MSDocumentWindow);
    });
    return windows.map((win, index) => ({
      type: 'window',
      index,
      id: '?',
      desc: String(win.description()),
      class: String(win.class()),
      meta: {},
      children: this.getWindowDocument(win)
    }));
  },

  getWindowDocument (win) {
    if (win.isKindOfClass(MSDocumentWindow) && win.document()) {
      return [{
        type: 'document',
        index: 0,
        id: '?',
        desc: String(win.document().description()),
        class: String(win.document().class()),
        meta: {},
        children: this.getDocumentPages(win.document())
      }];
    }
    return [];
  },

  getDocumentPages (doc) {
    return Formatter.toArray(doc.pages()).map((page, index) => ({
      type: 'page',
      index,
      id: String(page.objectID()),
      desc: String(page.description()),
      class: String(page.class()),
      meta: {
        name: String(page.name()),
        isSymbolPage: page.name() == 'Symbols'
      },
      children: this.getPageLayers(page)
    }));
  },

  getPageLayers (page) {
    return Formatter.toArray(page.layers()).map((layer, index) => ({
      type: 'layer',
      index,
      id: String(layer.objectID()),
      desc: String(layer.description()),
      class: String(layer.class()),
      meta: {},
      children: this.getLayerChildren(layer)
    }));
  },

  getLayerChildren (layer) {
    if (!layer.children) {
      return [];
    }
    const children = Formatter.toArray(layer.children()).filter(child => {
      return child.objectID() !== layer.objectID();
    });
    return children.map((child, index) => ({
      type: 'layer',
      index,
      id: String(child.objectID()),
      desc: String(child.description()),
      class: String(child.class()),
      meta: {},
      children: this.getLayerChildren(child)
    }));
  },

  clearLogs () {
    WebViewUtil.Window.sendAction(WebViewUtil.identifierWindow, 'clearLogs');
  }
};
