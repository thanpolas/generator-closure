/**
 * @fileoverview The default Module that all classes extend.
 */
goog.provide('app.Module');

goog.require('goog.events.EventTarget');
/**
 * The basic Module class
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 */
app.Module = function() {
  goog.base(this);

};
goog.inherits(app.Module, goog.events.EventTarget);

