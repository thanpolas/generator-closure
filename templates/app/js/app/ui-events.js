/**
 * @fileoverview Just mingle with the DOM to showcase.
 */
goog.provide('app.ui.Debug');

goog.require('ssd.debug');
goog.require('app.Module');
goog.require('app.Showdebug');

/**
 * Debug showcase
 *
 * @constructor
 * @extends {app.Module}
 */
app.ui.Debug = function() {
  goog.base(this);

  /**
   * @type {?jQuery} The output element.
   * @private
   */
  this.$output = null;

  /**
   * @type {?jQuery} The show debug button.
   * @private
   */
  this.$btnShowDebug = null;

  /**
   * @type {?jQuery} The show debug window link.
   * @private
   */
  this.$openDebug = null;
};
goog.inherits(app.ui.Debug, app.Module);

/**
 * Initialize ui
 */
app.ui.Debug.prototype.init = function() {
  this.$output = $('#output');
  this.$btnShowDebug = $('#showdebug');
  this.$openDebug = $('#openFancyWindow');

  this.$btnShowDebug.on('click', goog.bind(this._onClick, this));
  this.$openDebug.on('click', goog.bind(this._onOpenDebug));

};

/**
 * @param  {jQuery.Event} ev jQuery event
 * @private
 */
app.ui.Debug.prototype._onClick = function(ev) {
  ev.preventDefault();
  var showdebug = new app.Showdebug();
  this.$output.append('Clicked Log<br>');
  showdebug.run();
};

/**
 * @param  {jQuery.Event} ev jq ev.
 * @private
 */
app.ui.Debug.prototype._onOpenDebug = function(ev) {
  ev.preventDefault();

  ssd.debug.openFancyWin();
};
