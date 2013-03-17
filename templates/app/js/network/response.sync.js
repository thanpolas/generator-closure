/**
 * @fileoverview The response data object used globaly by superstartup.
 */
goog.provide('app.sync.Response');
goog.provide('app.sync.T');

goog.require('goog.object');
goog.require('app.Response');

/**
 * Defines the response object that will be passed on ajax.send callbaks.
 *
 * @param {app.Response=} optResp Another response object to augment.
 * @constructor
 * @extends {app.Response}
 */
app.sync.Response = function( optResp ) {

  /**
   * @type {?number}
   * @expose
   */
  this.httpStatus = null;

  /**
   * @type {?string}
   * @expose
   */
  this.responseRaw = null;

  /**
   * @type {?goog.net.XhrIo}
   * @expose
   */
  this.xhr = null;

  goog.base(this, optResp);

};
goog.inherits( app.sync.Response, app.Response);
