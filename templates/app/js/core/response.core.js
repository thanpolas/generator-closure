/**
 * @fileoverview The response data object used globaly by superstartup.
 */
goog.provide('app.Response');

goog.require('goog.object');
goog.require('goog.events.Event');

/**
 * The response data object used globaly by superstartup.
 *
 *
 * @param {app.Response=} optResp Another response object to augment.
 * @constructor
 */
app.Response = function( optResp ) {

  /**
   * @type {boolean}
   * @expose
   */
  this.success = false;

  /**
   * @type {?string}
   * @expose
   */
  this.errorMessage = null;

  if ( goog.isObject(optResp)) {
    this.extend(optResp);
  }
};


/**
 * Will augment this instance with the provided response instance.
 *
 * The provided instance overwrite any properties of this object.
 *
 * @param  {app.Response} inst A response object instance to extend.
 */
app.Response.prototype.extend = function( inst ) {
  goog.object.forEach( inst, function(val, key) {
    if (!goog.isFunction(val)) {
      this[key] = val;
    }
  }, this);
};

/**
 * get the response object augmented by an event object.
 *
 * @param  {string} eventType The event type.
 * @param  {Object=} optTarget the target of the event.
 * @return {goog.events.Event} An event item to dispatch.
 */
app.Response.prototype.event = function( eventType, optTarget ) {
  var ev = new goog.events.Event(eventType, optTarget);
  var objNoMethods = goog.object.map( this, function(val) {
    if ( !goog.isFunction(val) ) {
      return val;
    }
    return null;
  }, this );

  goog.object.extend(ev, objNoMethods);

  return ev;
};


