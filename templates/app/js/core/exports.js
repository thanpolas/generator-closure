/**
 * @fileoverview Declare the public API.
 */
goog.provide('app.exports');

goog.require('app.Core');
goog.require('app.sync');
goog.require('app.ajax');
goog.require('appOne');

// core
goog.exportSymbol('appOne', appOne);
goog.exportSymbol('appOne.on', appOne.on);
goog.exportSymbol('appOne.init', appOne.init);
goog.exportSymbol('appOne.isReady', appOne.isReady);

// net
goog.exportSymbol('appOne.ajax.send', app.ajax.send);
goog.exportSymbol('appOne.sync.send', app.sync.send);

// events
goog.exportSymbol('appOne.listen', appOne.listen);
goog.exportSymbol('appOne.trigger', appOne.trigger);
goog.exportSymbol('appOne.unlisten', appOne.unlisten);
goog.exportSymbol('appOne.removeAllListeners', appOne.removeAllListeners);
