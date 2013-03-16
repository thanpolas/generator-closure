goog.provide('example');




goog.require('example.sample2');
// although we required sample2 to load before sample1
// sample2 has a require of it's own to load sample1 first, 
// so this is fixed by the calcdeps script or the compiler 
goog.require('example.sample1');

goog.require('goog.events');
goog.require('goog.events.EventTarget');

/** @type {number} the key to the event binding */
example.key;

/**
 * Executes inline from our index.html
 *
 * @return {void}
 */
example.init = function()
{
  var ret = example.sample2.doStuff();
  
  var el = example.sample1.getElement('output');
  example.sample1.elementHTML(el, ret);
  
  var link = example.sample1.getElement('openFancyWindow');
  example.key = goog.events.listen(link, goog.events.EventType.CLICK, example.sample2.launchFancyWindow);
  
  example.ct.init();
  
};

/**
 * Verify that goog.DEBUG is false after compilation 
 * (Run this from a browser's JS console)
 * @return {void}
 */
example.deb = function()
{
  if (goog.DEBUG)
    console.log('TRUE');
  else
    console.log('FALSE');   
};

// kickoff our application
example.init();

// export our symbols to the global scope
goog.exportSymbol('example.deb', example.deb);