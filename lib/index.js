var path = require('path');
var util = require('util');
var generator = require('yeoman-generator');


var Generator = module.exports = function Generator() {
  generator.Base.apply(this, arguments);

  this.sourceRoot(path.join(__dirname, '../templates'));
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(Generator, generator.Base);

Generator.prototype.createControllerFiles = function createControllerFiles() {
  // do plain copy operations
  this.directory('app/js', 'src/');
  this.directory('build');
  this.directory('test');

  this.copy('_editorconfig', '.editorconfig');
  this.copy('_gitignore', '.gitignore');
  this.copy('_jshintrc', '.jshintrc');
  this.copy('_package.json', 'package.json');
  this.copy('NOTICE.md', 'NOTICE.md');


  // templating copy
  this.template('Gruntfile.js', 'Gruntfile.js');
  this.template('README.md', 'README.md');
  this.template('LICENSE-MIT', 'LICENSE-MIT');
};
