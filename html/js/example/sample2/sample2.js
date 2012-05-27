goog.provide('example.sample2');

goog.require('example.sample1');

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
  
  var one = 1;  
  var timesTen = example.sample1.timesTen(one);
  var tenTimesTen = example.sample1.timesTen(timesTen);
  return tenTimesTen + ' -- ' + loc;
};