goog.provide('example.sample2');

goog.require('example.sample1');

if (goog.DEBUG) {
  /*
goog.require('goog.debug');
goog.require('goog.debug.FancyWindow');
goog.require('goog.debug.Logger');
goog.require('goog.debug.LogManager');
*/
}

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
  loc = example.sample1.locateString(loc);
  /*
  var debugWindow = new goog.debug.FancyWindow('main');
  debugWindow.setEnabled(true);
  debugWindow.init();
  

  var logger = goog.debug.Logger.getLogger('example.sample2.doStuff');
  
  logger.info('Hello World!');
  
  logger.info('This is a logger');
  
  logger.shout('A shout logger message');
  */
  var one = 1;  
  var timesTen = example.sample1.timesTen(one);
  var tenTimesTen = example.sample1.timesTen(timesTen);
  return tenTimesTen + ' -- ' + loc;
};