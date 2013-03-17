/**
 * @fileOverview A set of sample classes that use the
 *   config feature.
 */
goog.provide('ssd.test.unit.configClass');

goog.require('ssd.Module');
goog.require('ssd.Config');

/**
 * Create the root class with a config.
 *
 */
ssd.test.unit.configClass.RootClass = function(){

  this.config = new ssd.Config();

  this.config.addAll({
    name: 'rootClass',
    howmany: 42,
    bool: true
  });

  this.config('setDynamically', true);
  this.config('setDynamicallyString', 'duh');

  this.classOne = new ssd.test.unit.configClass.ClassOne( this );

};
goog.inherits(ssd.test.unit.configClass.RootClass, ssd.Module);

/**
 * Create a the second in the chain class
 * @param  {RootClass} rootInst
 */
ssd.test.unit.configClass.ClassOne = function( rootInst ) {

  var configPath = 'the.path.to.classOne';

  var _config = {
    'polek': 'one',
    'lolek': 'two',
    num: 4,
    ar: [1, 2, 3],
    bool: true
  };

  this.config = rootInst.config.prependPath( configPath );

  this.config.addAll( _config );

  this.classTwo = new ssd.test.unit.configClass.ClassTwo( this );
};

/**
 * Create a the third in the chain class
 * @param  {ClassOne} classOneInst
 */
ssd.test.unit.configClass.ClassTwo = function( classOneInst ) {

  var configPath = 'classTwo';

  var _config = {
    'numTwo': 2,
    'nullVal': null,
    'aString': 'superstartup'
  };

  this.config = classOneInst.config.prependPath( configPath );

  this.config.addAll( _config );

};

