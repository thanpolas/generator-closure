/**
 * @fileoverview Debug functions and helpers
 */
goog.provide('ssd.debug');

goog.require('goog.debug');
goog.require('goog.debug.LogManager');
goog.require('goog.debug.Logger');
goog.require('goog.debug.FancyWindow');

/**
 * Will popup a debuging fancy window
 * @return {void}
 */
ssd.debug.openFancyWin = function() {
  var debugWindow = new goog.debug.FancyWindow('main');
  debugWindow.setEnabled(true);
  debugWindow.init();
};


