var generator = require('yeoman-generator');
var util      = require('util');
var path      = require('path');

// Documentation: https://github.com/yeoman/generator/wiki/base

var Generator = module.exports = function Generator() {
  generator.Base.apply(this, arguments);
  // this.option('flag', { desc: 'Desc for flag', ...})
  // this.argument('filename', { desc: 'Desc for filename argument', ...})

  this.hookFor('webapp', { args:['--compassBootstrap'] });

};

util.inherits(Generator, generator.Base);

// Copies the entire template directory (with `.`, meaning the
// templates/ root) to the specified location
Generator.prototype.scaffold = function scaffold() {
  this.directory('.', 'html');

  this.sourceRoot(path.join(__dirname, '../templates'));

  this.log.writeln('Uhhhh duh');

  // this.directory('js');
  // this.copy('index.html', 'index.html');


  // var gen = this.invoke('webapp', {
  //   compassBootstrap: true,
  //   includeRequireJS: true
  // });

};
