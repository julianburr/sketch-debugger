import { initWithContext, document } from 'utils/core';
import console, { open } from 'utils/debug';

// All exported functions will be exposed as entry points to your plugin
// and can be referenced in your `manifest.json`

export function test (context) {
  initWithContext(context);
  document.showMessage('👋🌏 Hello World!');
  console.log('Hello World');
  console.warn({ foo: 'bar' });
}

export function openWindow (context) {
  initWithContext(context);
  open();
}
