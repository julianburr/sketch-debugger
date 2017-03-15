# Sketch Debugger

This tool was born out of the frustration of existing debugging tools for Sketch plugin development. It is a concept for a debugger console in form of an easily instalable Sketch plugin, as well as a bundle of util functions that can be pulled into any project using npm.

## General Todos to Start With

 - [x] ~~Pull bootstraped plugin out of [`sketch-plugin-boilerplate`](https://github.com/julianburr/sketch-plugin-boilerplate)~~
 - [ ] Create build structure that also creates compiled and optimized util folder to be used as npm entry point
 - [ ] Add git hook to automatically bundle on every commit to ensure to have the latest `.sketchplugin` bundle available at all times
 - [ ] Create simple website with howtos and documentation of util functions


## Debugger Todos

 - [ ] Finish console
 - [ ] Add element tree panel
 - [ ] Create HTTP request utils that also send data to debugger 
 - [ ] Add network panel
 - [ ] Add action listener (if possible without crashes :/) and add action panel
 - [ ] Integrate automated `MS*` documentation tool build on the [`class-dumps`](https://github.com/abynim/Sketch-Headers) if possible