goog.provide('app.Showdebug');

goog.require('goog.debug.FancyWindow');
goog.require('goog.debug.Logger');
goog.require('goog.debug.LogManager');

/**
 * Do a set of sample debug logs.
 *
 */
app.Showdebug = function() {

};

/**
 * A logger to help debugging
 * @type {goog.debug.Logger}
 * @private
 */
app.Showdebug.prototype.logger = goog.debug.Logger.getLogger('app.Showdebug');


/**
 * [run description]
 * @return {[type]} [description]
 */
app.Showdebug.prototype.run = function() {
  this.logger.finest('This is a finest level logging type ');
  this.logger.finer('This is a finer level logging type ');
  this.logger.fine('This is a fine level logging type ');
  this.logger.config('This is a config level logging type ');
  this.logger.info('This is an info level logging type ');
  this.logger.warning('This is a warning level logging type ');
  this.logger.severe('A severe level logging type ');
  this.logger.shout('A shout level logging type ');
};