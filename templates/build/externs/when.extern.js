/**
 * @externs
 * @license MIT License (c) copyright 2011-2013 original author or authors
 *          Brian Cavalier https://github.com/briancavalier
 *          Thanasis Polychronakis https://github.com/thanpolas
 */

/**
 * [when description]
 * @param  {[type]} promiseOrValue [description]
 * @param  {Function=} optOnFulfilled    [description]
 * @param  {Function=} optOnRejected     [description]
 * @param  {Function=} optOnProgress     [description]
 * @return {[type]}                [description]
 */
var when = function(promiseOrValue, optOnFulfilled, optOnRejected, optOnProgress) {};


/** @type {Object} */
when.Resolver = {};

/** @return {when.Promise} */
when.Resolver.resolve = function () {};

/** @return {when.Promise} */
when.Resolver.reject = function () {};

/** @return {when.Promise} */
when.Resolver.notify = function () {};

/** @type {Object} */
when.Promise = {};

/** @return {when.Promise} */
when.Promise.then = function(){};
/** @return {when.Promise} */
when.Promise.always = function(){};
/** @return {when.Promise} */
when.Promise.otherwise = function(){};

/** @type {Object} */
when.Deferred = {};

when.Deferred.promise = when.Promise;

when.Deferred.resolver = when.Resolver;

when.Deferred.resolve = when.Deferred.resolver.resolve;
when.Deferred.reject = when.Deferred.resolver.reject;
when.Deferred.notify = when.Deferred.resolver.notify;


/**
 * Create a deferred
 *
 * @return {when.Deferred} a deferred.
 */
when.defer = function (){};

/**
 * Create a resolved promise
 */
when.resolve = function (){};
/**
 * Create a rejected promise
 */
when.reject = function (){};
/**
 * Join 2 or more promises
 */
when.join = function (){};
/**
 * Resolve a list of promises
 */
when.all = function (){};
/**
 * Array.map() for promises
 */
when.map = function (){};
/**
 * Array.reduce() for promises
 */
when.reduce = function (){};
/**
 * One-winner race
 */
when.any = function (){};
/**
 * Multi-winner race
 */
when.some = function (){};
/**
 * Make a promise trigger another resolver
 */
when.chain = function (){};
/**
 * Determine if a thing is a promise
 */
when.isPromise = function (){};
