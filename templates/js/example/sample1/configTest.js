goog.provide('example.ct');

goog.require('goog.object');
goog.require('goog.structs.Map');

/**
 * A sample object
 *
 * @type {Object}
 */
example.ct.aDeepObject = {
  'one': 1,
  'two': 2,
  'three': {
    'tone': 'one',
    'ttwo': 'two',
    'tthree': {
      'ttone': 'tone',
      'tttwo': true,
      'ttthree': [1, 2, 3, 4, 5, 6]
    }
  }
};

/** @lends {example.ct.aDeepObject} */
example.ct.useObject = {};

/** @type {goog.structs.Map} */
example.ct.map = new goog.structs.Map();

/**
 * Export our deep object
 */
example.ct.init = function()
{
  example.ct.useObject = goog.object.unsafeClone(example.ct.aDeepObject);
  example.ct.map.addAll(example.ct.aDeepObject);
  example.ct.paint('Original values');
  
  example.ct.map.set('two', 3);
  example.ct.paint('key "two" was changed in map to 3');  
  
  example.ct.useObject = example.ct.map.toObject();
  example.ct.paint('useObject was assigned from map');  
  
  goog.global['conf']['two'] = 4;
  example.ct.paint('Globalized conf.two was changed to 4');  
  
};

example.ct.paint = function(opt_words)
{
  var el = example.sample1.getElement('objects');
  var ret = '';
  if (opt_words) {
    ret += '<h4 style="margin:0">' + opt_words + '</h4>';
  }
  ret += 'useObject.two:<b>' + example.ct.useObject['two'] + '</b>';
  ret += ' aDeepObject.two:<b>' + example.ct.aDeepObject['two'] + '</b>';
  ret += '<br /><br />';
  example.sample1.elementHTML(el, ret, true);  
  
};


  goog.exportSymbol('app.paint', example.ct.paint);  
  goog.exportSymbol('app.map', example.ct.map);
  goog.exportSymbol('conf', example.ct.aDeepObject);
