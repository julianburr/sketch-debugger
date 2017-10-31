![Logo](./logo.svg)



# Sketch Plugin Debugger

**Please note this repo is still in the experimental stage, things may or may not be working and APIs will most likely change in the future**

This tool was born out of the frustration of existing debugging tools for Sketch plugin development. It is a concept for a debugger console in form of an easily instalable Sketch plugin, as well as a bundle of util functions that can be pulled into any project using npm.


## Util functions

### Why?

In the Sketch plugin development environment, the global `log` function is provided to create system logs (alias for [`NSLog`](https://developer.apple.com/reference/foundation/1395275-nslog?language=objc) I guess?!). But this function is not very flexible. It can only take one argument and it cannot divide into different log levels. So I decided create some small util functions, that behave more like the [`console`](https://developer.mozilla.org/en/docs/Web/API/console) functions I am used to from usual JS development...

The util functions also send the logs to a seperate plugin, that can be installed if you wish so (it is not required! You are very welcome to keep using the System Console if you prefer so :)). For more infos, see [the plugin section](#plugin)

### Get started

To import the debugger util functions, simply use npm:
```bash
npm install --save sketch-debugger

# Or yarn
yarn add sketch-debugger
```

Then import it wherever you need it...

```js
import Debug from 'sketch-debugger';
//...
Debug.log('Hello', 'World', foo);
Debug.warn('Some warning');
Debug.error('This should not happen ;)');
```

### Methods

The methods follow the same approach as the [console functions](https://developer.mozilla.org/en/docs/Web/API/console) JS developers are used to in the JS browser environment.

**log(...args)**  
Default log method, takes any number of arguments and logs the passed value to the console (both the system log and the Sketch debugger plugin if available.

**warn(...args)**  
Logs warnings (in the system console, the logs will have the leading `### WARN` and a trailing `#WARN END` log).

**error(...args)**  
Logs errors (in the system console, the logs will have the leading `### ERROR` and a trailing `#ERROR END` log).

**count(log)** *(work in progress)*  
Counts occurances of specified log (from last console.clear). In the system console, it adds the leading log `### COUNT: {count}`.

**time(identifier)**/**timeEnd(identifier)** *(work in progress)*  
Creates a timer to measure time between two execution points. Creates the following logs in the system console: `### TIME START - {identifier}` / `### TIME END: {duration}ms - {identifier}`.

**group(identifier)**/**groupEnd()** *(work in progress)*  
Creates a group and puts all following logs into this group until closed by groupEnd, which will always close the group that was opened last. This will add the following logs to the system console: `### GROUP START - {identifier}` / `### GROUP END - {identifier}`.

**clear()** *(work in progress)*  
Clears the console memory. This will only affect the plugins console, not the system logs.


## Plugin

### Why?

I use logs a lot during development. I grew up with Firebug and love the Chrome Debugger. And I hate the System Console :/ It is simply doesn't provide all the nice features I was used to from web development.

So I decided to create a simple plugin with a GUI similar to those browser debuggers. Your logs can be classified (normal logs, warnings and erros), you can use other util functions like timers, groups and counters (*work in progress!*) and you have a lot of visual helpers to feel more comfortable during the debug process ;)

### Get started

Download the `sketch-debugger.sketchplugin` file from this repo and double click (or manually move it into your Sketch plugin folder). That's it. 

Now you should have a new menu item under `Plugins` called `Open Debugger`. This will open a window with the debugger panels. Once this window is open, all logs (created by the sketch-debugger util functions) will be send to it! No further setup or anything else required :)

### Features

**Console** 
Developers console with all the logs that have been created using the utils functions. Logs can be easily searched, filters, cleared, etc.

*Work in progress:* It would nice to have a console functionality, where you can type in JS which will be executed on *Enter*, including that the selected log value gets copied into the namespace (e.g. as `$sel`), to be able e.g. to iterate through a logged collection...

**Elements** *(work in progress)*  
This will give you a live representation of the Document / Page / Layer structure in your currently opened Sketch documents. Ideally at some point this will have an automated `MS*/NS*` documentation integrated showing all available methods on selected objects.

**Actions** *(work in progress)*  
If possible I'd like to integrate a panel that show all actions, when they are triggered, what context they include, etc. Maybe also not limited to MSActions, but a general action observer.

**Network** *(work in progress)*  
With a similar util library it would be possible to log network requests and responses, show timings, headers, parameters, etc.

<br>
<br>


# Roadmap / Todos

## General

 - [x] ~~Pull bootstraped plugin out of [`sketch-plugin-boilerplate`](https://github.com/julianburr/sketch-plugin-boilerplate)~~
 - [x] ~~Create build structure that also creates compiled and optimized util folder to be used as npm entry point~~ *TODO: simplify (build) scripts*
 - [x] ~~Publish npm package~~
 - [ ] Create simple website with howtos and documentation of util functions
 - [ ] Debugger lib build

## Util Functions
 - [ ] .count method
 - [ ] .time* methods
 - [ ] .group* methods

## Plugin
 - [ ] Hook Sketch up to deliver data in specified format
 - [ ] Add stack trace now that I can get it with the preprocessor enabled + integrate [source map](https://github.com/mozilla/source-map) handling to show the original trace if plugin.js has a source map defined!
 - [x] ~~Finish console layout / design~~
 - [x] ~~Add element tree panel~~
 - [x] ~~Create HTTP request utils that also send data to debugger~~ see [`sketch-fetch`](https://github.com/julianburr/sketch-fetch)
 - [x] ~~Add network panel~~
 - [x] ~~Add actions panel~~
 - [ ] Add action listener (if possible without crashes :/) and add action panel
 - [ ] Integrate automated `MS*` documentation tool build on the [`class-dumps`](https://github.com/abynim/Sketch-Headers) if possible
 - [ ] Think about a way to read the system logs as well and turn them into a nicer/more readable format in the plugins console
