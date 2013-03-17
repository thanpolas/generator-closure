/*jshint camelcase:false */
/**
 * @fileoverview generic function helpers.
 */
goog.provide('ssd.helpers');

goog.require('goog.array');
goog.require('goog.object');
goog.require('goog.json');

/**
 * The noop function
 */
ssd.noop = function(){};

/** @const {string} the back pipe key */
ssd.BACKPIPE_KEY = 'backPipe';

/**
 * Will add a key in the eventObj that is a function
 * that any listener can call and define new value on the
 * provided param.
 *
 * This cannot be async.
 *
 * @param  {Object} eventObj
 * @param  {*} data Any type of data.
 * @return {Object} The event object
 */
ssd.eventBackPipe = function(eventObj, data) {

  eventObj[ssd.BACKPIPE_KEY] = function(fn, optSelf) {
    data = fn.call(optSelf, data);
  };

  return function() {
    return data;
  };
};

 /**
  * Wrapper for goog.array.find
  * Will search each element of an array and
  * match the object key 'key' with 'value'
  * On Match we will return the element content
  *
  * e.g. var ind = ssd.arFind(ar, 'userId', userIdvar);
  *
  * @param {array} ar The array
  * @param {string} key The object key we will query
  * @param {mixed} value The value we are looking for
  * @return {array|null} The first array element that passes the test, or null if no element is found.
  */
 ssd.arFind = function (ar, key, value)
 {
     var g = goog;

     // check if we have an array
     if (!g.isArray(ar)) {
         // not an array, force it into one
         ar = g.object.getValues(ar);
     }
     return g.array.find(ar, function(el){
         if (el[key] === value) return true;
         return false;
     });
 }; // method arFind

 /**
  * Wrapper for goog.array.findIndex
  * Will search each element of an array and
  * match the object key 'key' with 'value'
  * On Match we will return the element index
  *
  * e.g. var ind = ssd.arFindIndex(ar, 'userId', userIdvar);
  *
  * @param {array} ar The array
  * @param {string} key The object key we will query
  * @param {mixed} value The value we are looking for
  * @return {number} -1 for fail. The index of the first array element that passes the test, or -1 if no element is found.
  */
 ssd.arFindIndex = function (ar, key, value)
 {
     if (!goog.isArray(ar)) return -1;
     return goog.array.findIndex(ar, function(el){
         if (el[key] === value) return true;
         return false;
     });
 }; // method arFindIndex



 /**
  * Wrapper for goog.array.removeIf
  * Will search each element of an array
  * and if it finds a match for the object key
  * we provided it, it then removes this element
  * from the array
  *
  * @param {array} ar The array
  * @param {string} key The object key we will query
  * @param {mixed} value The value we are looking for
  * @return boolean  True if an element was removed.
  */
 ssd.arRemove = function (ar, key, value)
 {
     if (!goog.isArray(ar)) return false;
     return goog.array.removeIf(ar, function(el){
         if (el[key] === value) return true;
         return false;
     });
 }; // method ssd.arRemove

 /**
  * Determines if the given object is a valid
  * jQuery array or the jQuery function
  *
  * @param {*} ar The object we want to examine
  * @return boolean
  */
 ssd.isjQ = function (ar) {
  /** @preserveTry */
  try {
    if (goog.isFunction(ar)) {
      return ar === jQuery;
    }
    return ar instanceof jQuery;
  } catch(ex) {
    return false;
  }
}; // method ssd.isjQ

 /**
  * Decode a URI string
  *
  * @param {string} str
  * @return {string}
  */
 ssd.decURI = function(str){
   if (goog.isNull(str)) { return ''; }

   var ret;
   try {
     ret = decodeURIComponent(str);
   } catch(ex){
     return str;
   }
   return ret;
 };

 /**
  * Encode a URI string
  *
  * @param {string}
  * @return {string}
  */
  ssd.encURI = function(str) {
    if (goog.isNull(str)) return '';
    var ret;
    try {
      ret = encodeURIComponent(str);
    } catch(ex){
      return str;
    }
    return ret;
 };

 /**
  * Decode html Entities
  *
  * @param {string} str
  * @return {string}
  */
 ssd.decEnt = function(str) {
    if (goog.isNull(str)) { return ''; }
    var ret;
    try {
      ret = goog.string.unescapeEntities(str);
    } catch(ex){
      return str;
    }
    return ret;
 };

 /**
  * Encode html Entities
  *
  * @param {string} str
  * @return {string}
  */
 ssd.encEnt = function(str) {
    if (goog.isNull(str)) { return ''; }
    var ret;
    try {
      ret = goog.string.htmlEscape(str);
    } catch(ex){
      return str;
    }
    return ret;
 };


 /**
  * Will return the current domain name of the site
  * e.g. ssd.local, ssd.com ...
  *
  * WARNING: Requires goog.Uri that is not declared in this file!
  *
  * @return {string}
  */
 ssd.getDomain = function() {
     return new goog.Uri(document.location.href).getDomain();
 };


 /**
  * Read a page's GET URL variables and return them as an associative array.
  * From: http://snipplr.com/view/799/get-url-variables/
  *
  * @return {Array}
  */
  ssd.getUrlVars = function() {
    var vars = [], hash;
    var hashes = window.location.href.slice(
      window.location.href.indexOf('?') + 1).split('&');

    for(var i = 0, len = hashes.length; i < len; i++) {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
 };

 /**
  * Checks if a value (needle) is within the provided other parameters
  *
  * e.g. if (ssd.inValue('a', 'b', 'c', 'z')) is false...
  *
  * @param {mixed} needle Value we want to look for
  * @param {...*=} optVarArgs Additional arguments that are used to compare
  *      our needle value against
  * @return {boolean}
  */
 ssd.inValue = function (needle, optVarArgs) {
    var len = arguments.length;
    var haystack = [];
    for (var start = 1; start < len ; start++) {
      haystack.push(arguments[start]);
    }
    if (-1 === haystack.indexOf(needle))
      return false;
    return true;
 };

/**
 * For traditional methods that don't return promises but only accept callbacks
 * use this helper to get a deferred resolved when the callback is invoked.
 *
 * It is expected that the callback returns a promise.
 *
 * @param  {when.Deferred} defer A deferred.
 * @param  {Function:when.Promise} cb The callback, must return a promise.
 * @param  {Object=} optSelf context for cb.
 * @return {Function} A Function that will resolve resolver.
 */
ssd.cb2promise = function(defer, cb, optSelf) {
  return function() {
    cb.apply(optSelf, arguments).then(defer.resolve, defer.reject);
  };
};



