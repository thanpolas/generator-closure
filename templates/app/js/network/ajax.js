/*jshint camelcase:false */

/**
 * @fileoverview provide an abstraction layer over any underlying xhr library.
 *
 */
goog.provide('app.ajax');
goog.provide('app.ajax.Method');

goog.require('goog.Uri');
goog.require('goog.net.XhrIo');
goog.require('app.sync.Response');

goog.require('ssd.helpers');

/**
 * @enum {string}
 */
app.ajax.Method = {
  POST: 'post'
};

/**
 * Plainly use google's xhrIo lib for now.
 *
 * Abstract away the intricacies of net.XhrIo and make for easier testing.
 *
 * @return {when.Promise} a promise.
 */
app.ajax.send = function( url, opt_callback, opt_method, opt_content,
  opt_headers, opt_timeoutInterval, opt_withCredentials) {

  /**
   * Create a wrapping callback that normalizes the parameters of the
   * callback.
   *
   * @param  {goog.events.Event} ev A goog event object.
   */
  var cb = function appAjaxSend(ev){

    var origCb = opt_callback || ssd.noop;

    /** @type {app.ajax} */
    var xhr = ev.target;

    /**
     * The response object that will be used as the first argument of
     * the original callback.
     *
     * @type {app.sync.Response}
     */
    var respObj = new app.sync.Response();

    if ( xhr ) {
      respObj.httpStatus = xhr.getStatus();
      respObj.success = xhr.isSuccess();
      respObj.responseRaw = xhr.getResponse();
      respObj.errorMessage = xhr.getLastError();
      respObj.xhr = xhr;
    }

    if (respObj.success) {
      def.resolve(respObj);
    } else {
      def.reject(respObj);
    }
    origCb(respObj);
  };

  var def = when.defer();

  // hijack callback
  var xhrArgs = Array.prototype.slice.call(arguments, 0);
  xhrArgs[1] = cb;

  // hijack content
  xhrArgs[3] = opt_content ? goog.Uri.QueryData.createFromMap(opt_content) :
    opt_content;

  goog.net.XhrIo.send.apply(null, xhrArgs);

  return def;
};

