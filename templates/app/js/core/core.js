/**
 * @fileoverview the core class of the application.
 */
goog.provide('app.Core');

/**
 * The base class
 *
 * This class will be exported as the main entry point
 *
 * @constructor
 * @extends {app.Module}
 */
app.Core = function() {
  goog.base(this);

  /**
   * @type {boolean}
   * @private
   */
  this._isReady = false;

  if (goog.DEBUG) {
    app.debug.openFancyWin();
  }

  this.logger.info('ctor() :: Initializing.');

};
goog.inherits(app.Core, app.Module);

/**
 * A logger to help debugging
 * @type {goog.debug.Logger}
 * @private
 */
app.Core.prototype.logger = goog.debug.Logger.getLogger('app.Core');

/**
 * Events triggered by core
 * @enum {string}
 */
app.Core.EventType = {
  INIT: 'init'
};

/**
 * Kicks off the library.
 *
 * @param  {Function=} optCallback A callback for when ready ops finish.
 */
app.Core.prototype.init = function( optCallback ) {

  this.logger.info('init() :: Kicking off SuperStartup. isReady:' + this._isReady);

  var cb = optCallback || app.noop;

  if ( this._isReady ) {
    cb();
    return;
  }

  this._isReady = true;
  this.dispatchEvent( app.Core.EventType.INIT );
};

/**
 * Declare our identity
 * @return {string}
 */
app.Core.prototype.toString = function() {
  return 'awesome app';
};

/**
 * @return {boolean} If ss is ready.
 */
app.Core.prototype.isReady = function() {
  return this._isReady;
};

/**
 * Generic listener method for all events emitted by this app.
 *
 * @param {Object | goog.events.Event | null | string} event object
 * @param  {[type]}   event   [description]
 * @param {Function} cb The callback function.
 * @param {Object=} optSelf optionally define a context to invoke the callback on.
 * @return {goog.events.ListenableKey} a unique event key.
 */
app.Core.prototype.listen = function(event, cb, optSelf) {
  return goog.events.listen( this, event, cb, false, optSelf || goog.global);
};

/**
 * [trigger description]
 * @param  {Object | goog.events.Event | null | string} event object
 * @return {boolean} If anyone called preventDefault on the event object
 *   (or if any of the handlers returns false) this will also return false.
 *   If there are no handlers, or if all handlers return true,
 *   this returns true.
 */
app.Core.prototype.trigger = function( event ) {
  return goog.events.dispatchEvent( this, event );
};
