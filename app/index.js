/**
 * MAIN GENERATOR
  *
 */
var BaseGenerator = require('./base');
var util      = require('util');

// Documentation: https://github.com/yeoman/generator/wiki/base

var Generator = module.exports = function Generator(args, options, config) {
  BaseGenerator.apply(this, arguments);

  this.closure.web = true;
  this.closure.basePath = 'app';
  this.closure.appPath = 'app/js';
  this.closure.sourceRel = 'js';
  this.closure.closurePath = 'app/';
  this.closure.closureLinterPath = 'app/';
  this.closure.distPath = 'app/jsc';
};
util.inherits(Generator, BaseGenerator);

Generator.prototype.app = function app() {
  // do plain copy operations
  this.directory('app');
  this.directory('build');
  this.directory('test');

  this.copy('_editorconfig', '.editorconfig');
  this.copy('_gitignore', '.gitignore');
  this.copy('_jshintrc', '.jshintrc');
  this.copy('_package.json', 'package.json');
  this.copy('NOTICE.md', 'NOTICE.md');
  this.copy('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');

  // copy web deps
  this.copy('_fragments/_deps.web.js', 'app/js/deps.js');

  // templating copy
  this.template('Gruntfile.js', 'Gruntfile.js');
  this.template('README.md', 'README.md');
  this.template('LICENSE-MIT', 'LICENSE-MIT');

  this.mkdir('app/components');

  // In some cases the 'temp' folder does not get created before the closureBuilder
  // runs and results in build breaking, make sure "temp/" is there.
  this.mkdir('temp');

};
