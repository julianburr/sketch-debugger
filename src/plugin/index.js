import Core from 'utils/core';
import WebViewUtil from 'utils/web-view';
import Debug from 'utils/debug/index';

// eslint-disable-next-line no-unused-vars
const openWindow = function (context) {
  Core.initWithContext(context);
  Debug.Window.open();
};

// eslint-disable-next-line no-unused-vars
const handleBridgeMessage = function (context) {
  Core.initWithContext(context);
  let data = SPBWebViewMessageUtils.getPayload();
  try {
    data = JSON.parse(data);
  } catch (err) {
    Debug.error(err)
    return;
  }
  WebViewUtil.receiveAction(data.name, data.payload);
};

// eslint-disable-next-line no-unused-vars
const test = function (context) {
  Core.initWithContext(context);
  Debug.log('Hello', 'World');
  Debug.log('context', context);
  const foo = {bar: {x: [{y: {a: {b: 'c'}}}, 'a', 'b', 'c', 1, 2, 3]}};
  Debug.warn('foo', foo);
  Debug.error('This is aweful');
}