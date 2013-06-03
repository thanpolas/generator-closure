/**
 * LIB Generator, generates a library scaffolding.
 *
 */
var path = require('path');
var util = require('util');
var BaseGenerator = require('../app/base');
var fs = require('fs');


var Generator = module.exports = function Generator() {
  BaseGenerator.apply(this, arguments);

  this.sourceRoot(path.join(__dirname, '../templates'));
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};
util.inherits(Generator, BaseGenerator);

Generator.prototype.configure = function configure() {
  this.closure.basePath = 'lib';
  this.closure.appPath = 'lib';
  this.closure.sourceRel = 'lib';
  this.closure.closurePath = '';
  this.closure.closureLinterPath = '';
  this.closure.distPath = 'dist';
};

/**
 * [createControllerFiles description]
 * @return {[type]} [description]
 */
Generator.prototype.createControllerFiles = function createControllerFiles() {

  // do plain copy operations
  this.directory('app/js', 'lib/');
  this.directory('build');
  this.directory('test');

  this.copy('_editorconfig', '.editorconfig');
  this.copy('_gitignore', '.gitignore');
  this.copy('_jshintrc', '.jshintrc');
  this.copy('_package.json', 'package.json');
  this.copy('NOTICE.md', 'NOTICE.md');
  this.copy('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');

  // copy lib deps
  this.copy('_fragments/_deps.lib.js', 'lib/deps.js');

  // templating copy
  this.template('Gruntfile.js', 'Gruntfile.js');
  this.template('README.md', 'README.md');
  this.template('LICENSE-MIT', 'LICENSE-MIT');

  this.mkdir('dist');
  this.mkdir('lib/components');

};
