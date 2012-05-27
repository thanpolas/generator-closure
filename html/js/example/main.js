goog.provide('example');


goog.require('example.sample2');
// although we required sample2 to load before sample1
// sample2 has a require of it's own to load sample1 first, 
// so this is fixed by the calcdeps script or the compiler 
goog.require('example.sample1');

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
};

// export our symbols to the global scope
(function(goog){
  goog.exportSymbol('example.init', example.init);
})(goog);