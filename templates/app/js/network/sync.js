/**
 * Provide one more abstraction layer on data transportation.
 *
 * Allow for sockers or xhr.
 *
 */
goog.provide('app.sync');

goog.require('app.ajax');
goog.require('app.sync.Response');



/**
 * Hard wire to xhr send for now
 *
 * @return {when.Promise} a promise.
 */
app.sync.send = function() {
  return app.ajax.send.apply(undefined, arguments);
};

