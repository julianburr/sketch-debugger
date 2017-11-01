import store from 'webview/js/store';
import { actionCreators as elementActions } from 'data/elements';
import { actionCreators as actionActions } from 'data/actions';
import { actionCreators as consoleActions } from 'data/console';
import { actionCreators as networkActions } from 'data/network';

/**
 * Bridge function that allows the plugin to send data to the
 * web view by calling this function.
 * It is globally defined on the window object in index.js!
 */
export const bridge = jsonString => {
  try {
    let { name, payload } = jsonString ? JSON.parse(jsonString) : {};
    switch (name) {
      case 'setTree':
        store.dispatch(elementActions.setTree(payload));
        break;
      case 'addAction':
        store.dispatch(actionActions.addAction(payload));
        break;
      case 'setWildcardsEnabled':
        store.dispatch(actionActions.setWildcardsEnabled(payload));
        break;
      case 'addLog':
        store.dispatch(consoleActions.addLog(payload));
        break;
      case 'addRequest':
        store.dispatch(networkActions.addRequest(payload));
        break;
      case 'addResponse':
        store.dispatch(networkActions.addResponse(payload));
        break;
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * Check if message handler is available
 * The message handler gets registered with the config we use
 * in the plugin to create the web view
 */
export const check = () => {
  return (
    window.webkit &&
    window.webkit.messageHandlers &&
    window.webkit.messageHandlers.Sketch
  );
};

/**
 * Send message to plugin using the message handler
 * Uses promise structure
 */
export const sendAction = (name, payload = {}) => {
  console.log('sendAction', name, payload);
  return new Promise((resolve, reject) => {
    if (!check()) {
      reject(new Error('Could not connect to Sketch!'));
    }
    window.webkit.messageHandlers.Sketch.postMessage(
      JSON.stringify({ name, payload })
    );
    resolve();
  });
};
