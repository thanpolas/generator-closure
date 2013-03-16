goog.provide('example.sample2');

goog.require('example.sample1');

goog.require('goog.debug');
goog.require('goog.debug.FancyWindow');
goog.require('goog.debug.Logger');
goog.require('goog.debug.LogManager');


/** @type {number} how many times we fired the fancy window */
example.sample2.fancyTimesFired = 1;

/**
 * Change the html of an element
 *
 * @return {string}
 */
example.sample2.doStuff = function()
{
  var el = example.sample1.getElement('world');
  example.sample1.elementHTML(el, 'world');


  var loc = example.sample1.locateString('now this--');
  loc = ' :: ' + example.sample1.locateString(loc);

  var one = 1;
  var timesTen = example.sample1.timesTen(one);
  var tenTimesTen = example.sample1.timesTen(timesTen);
  return tenTimesTen + ' -- ' + loc;
};

/**
 * Launch the debug fancy window
 * @param {!Event} e
 * @return {void}
 */
example.sample2.launchFancyWindow = function(e)
{
  e.preventDefault();

  var debugWindow = new goog.debug.FancyWindow('main');
  debugWindow.setEnabled(true);
  debugWindow.init();

  var count = ':: #' + example.sample2.fancyTimesFired++;

  var logger = goog.debug.Logger.getLogger('example.sample2.launchFancyWindow');
  logger.config('Hello World! This is a config level logging type ' + count);
  logger.info('This is an info level logging type ' + count);
  logger.warning('This is a warning level logging type ' + count);
  logger.severe('A severe level logging type ' + count);
  logger.shout('A shout level logging type ' + count);
};