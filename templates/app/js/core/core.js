/**
 * @fileoverview the core class of the application.
 */
goog.provide('app.Core');
goog.provide('appOne');

goog.require('goog.events.EventHandler');

goog.require('app.Module');
goog.require('ssd.helpers');
goog.require('app.ui.Debug');
goog.require('ssd.invocator');

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

  this.logger.info('ctor() :: Initializing.');

  /**
   * @type {boolean}
   * @private
   */
  this._isReady = false;

  /**
   * @type {when.Defer}
   * @private
   */
  this._readyDefer = when.defer();

  //
  // The invocator will return a function with all the methods of this object.
  // In this case we bind the method 'init' to the returned functon.
  //
  // See the test/bdd/core/core.test.js file for expected behavior.
  //
  // Feel free to rip it off if you don't need such functionality.
  //
  // hack
  // Run encapsulator before the other classes initialize
  // because the encapsulator does a shallow copy of the object.
  //
  var selfObj = ssd.invocator.encapsulate( this, this.init );

  this.debugShow = new app.ui.Debug();

  return selfObj;
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
 * A custom getInstance method for the Auth class singleton.
 *
 * We want this custom method so as to return a proper
 * encapsulated instance that is binded (when invoked will
 * execute) the 'get' method.
 *
 *
 * @return {Function} The encapsulated instance.
 */
app.Core.getInstance = function() {
  return app.Core._instance ||
    (app.Core._instance = new app.Core());
};

/**
 * Kicks off the library.
 *
 * @param  {Function=} optCallback A callback for when ready ops finish.
 * @return {when.Promise} a promise.
 */
app.Core.prototype.init = function( optCallback ) {

  this.logger.info('init() :: Kicking off Application. isReady:' + this._isReady);

  var cb = optCallback || ssd.noop;

  if ( this._isReady ) {
    cb();
    return this._readyDefer.promise;
  }


  this.debugShow.init();

  this._isReady = true;

  cb();
  this.dispatchEvent( app.Core.EventType.INIT );

  return this._readyDefer.resolve();
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
 * Listen to events emitted by this app.
 *
 * @param {Object | goog.events.Event | null | string} event object
 * @param {Function} cb The callback function.
 * @param {Object=} optSelf optionally define a context to invoke the callback on.
 * @return {goog.events.ListenableKey} a unique event key.
 */
app.Core.prototype.on = function(event, cb, optSelf) {
  return this.listen( event, cb, false, optSelf || goog.global);
};

/**
 * @param  {Object | goog.events.Event | null | string} event object
 * @return {boolean} If anyone called preventDefault on the event object
 *   (or if any of the handlers returns false) this will also return false.
 *   If there are no handlers, or if all handlers return true,
 *   this returns true.
 */
app.Core.prototype.trigger = function( event ) {
  return goog.events.dispatchEvent( this, event );
};


/**
 * Remove a listener.
 *
 * @param  {goog.events.ListenableKey} key the ksy.
 * @param  {goog.events.ListenableKey } key The key from listen().
 * @return {boolean} indicating whether the listener was there to remove.
 */
app.Core.prototype.removeListener = function( key ) {
  return this.unlistenByKey( key );
};

/**
 * Synchronous (silent) initialization of the library.
 *
 *
 */
appOne = app.Core.getInstance();

// if not on testing environment initialize the app
if (!window['TESTING']) {
  appOne();
}
