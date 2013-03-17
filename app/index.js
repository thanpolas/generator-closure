var generator = require('yeoman-generator');
var util      = require('util');
var path      = require('path');

// Documentation: https://github.com/yeoman/generator/wiki/base

var Generator = module.exports = function Generator() {
  generator.Base.apply(this, arguments);
  // this.option('flag', { desc: 'Desc for flag', ...})
  // this.argument('filename', { desc: 'Desc for filename argument', ...})
  // this.hookFor('webapp', { args:['--compassBootstrap'] });


  this.sourceRoot(path.join(__dirname, '../templates'));


};

util.inherits(Generator, generator.Base);

Generator.prototype.scaffold = function scaffold() {

  // do plain copy operations
  this.directory('app');
  this.directory('build');
  this.directory('test');

  this.copy('_editorconfig', '.editorconfig');
  this.copy('_gitignore', '.gitignore');
  this.copy('_jshintrc', '.jshintrc');
  this.copy('_package.json', 'package.json');
  this.copy('Gruntfile.js', 'Gruntfile.js');
  this.copy('NOTICE.md', 'NOTICE.md');
  this.copy('Gruntfile.js', 'Gruntfile.js');

};
