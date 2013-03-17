/**
 * @fileoverview Declare the public API.
 */
goog.provide('app.exports');

goog.require('app.Core');
goog.require('app.sync');
goog.require('app.ajax');

// core
goog.exportSymbol('appOne', theApp);
goog.exportSymbol('appOne.init', theApp.init);

// net
goog.exportSymbol('appOne.ajax', app.ajax);
goog.exportSymbol('appOne.ajax.send', app.ajax.send);
goog.exportSymbol('appOne.sync', app.sync);
goog.exportSymbol('appOne.sync.send', app.sync.send);

// events
goog.exportSymbol('appOne.listen', app.listen);
goog.exportSymbol('appOne.trigger', app.trigger);
goog.exportSymbol('appOne.unlisten', app.unlisten);
goog.exportSymbol('appOne.removeAllListeners', app.removeAllListeners);
