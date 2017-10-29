import { openWindow, sendWindowAction } from 'utils/webview';
import { toArray } from 'utils/formatter';
import { log, prepareValue, getStack } from './debug';

export const DEBUGGER_IDENTIFIER = 'window/sketch-debugger';

export function open () {
  openWindow(DEBUGGER_IDENTIFIER, 'index.html', 600, 400);
}

export function sendLog (values, type) {
  const addLog = {
    ts: new Date().getTime(),
    type,
    values: values.map(v => prepareValue(v)),
    stack: getStack()
  };
  sendWindowAction(DEBUGGER_IDENTIFIER, 'addLog', addLog);
}

export function sendElementTree () {
  sendWindowAction(DEBUGGER_IDENTIFIER, 'setElementTree', getElementTree());
}

export function getElementTree () {
  const windows = toArray(NSApp.windows()).filter(win => {
    return win.isKindOfClass(MSDocumentWindow);
  });
  return windows.map((win, index) => ({
    type: 'window',
    index,
    id: '?',
    desc: String(win.description()),
    class: String(win.class()),
    meta: {},
    children: getWindowDocument(win)
  }));
}

export function getWindowDocument (win) {
  if (win.isKindOfClass(MSDocumentWindow) && win.document()) {
    return [
      {
        type: 'document',
        index: 0,
        id: '?',
        desc: String(win.document().description()),
        class: String(win.document().class()),
        meta: {},
        children: getDocumentPages(win.document())
      }
    ];
  }
  return [];
}

export function getDocumentPages (doc) {
  return toArray(doc.pages()).map((page, index) => ({
    type: 'page',
    index,
    id: String(page.objectID()),
    desc: String(page.description()),
    class: String(page.class()),
    meta: {
      name: String(page.name()),
      isSymbolPage: page.name() == 'Symbols'
    },
    children: getPageLayers(page)
  }));
}

export function getPageLayers (page) {
  return toArray(page.layers()).map((layer, index) => ({
    type: 'layer',
    index,
    id: String(layer.objectID()),
    desc: String(layer.description()),
    class: String(layer.class()),
    meta: {},
    children: getLayerChildren(layer)
  }));
}

export function getLayerChildren (layer) {
  if (!layer.children) {
    return [];
  }
  const children = toArray(layer.children()).filter(child => {
    return child.objectID() !== layer.objectID();
  });
  return children.map((child, index) => ({
    type: 'layer',
    index,
    id: String(child.objectID()),
    desc: String(child.description()),
    class: String(child.class()),
    meta: {},
    children: getLayerChildren(child)
  }));
}

export function clearLogs () {
  sendWindowAction(DEBUGGER_IDENTIFIER, 'clearLogs');
}
