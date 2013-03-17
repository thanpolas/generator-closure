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

  this.on('end', function () {
    console.log('\nAll files copied!\n\nDownload the Closure Library in the ' +
      'app/'.yellow + ' directory:\n' +
      'git clone https://code.google.com/p/closure-library/ app/closure-library'.bold.yellow + '\n' +
      '\nthen: ' + 'npm install'.bold.yellow + ' to install all required' +
      ' dependencies.\n\nFinaly start the server with ' +
      'grunt server'.bold.yellow + '\n' +
      '\nBuild: ' + 'grunt build'.bold.yellow +
      '\nRun tests: ' + 'grunt test'.bold.yellow +
      '\nRun tests on the browser: ' + 'grunt server:test'.bold.yellow +
      '\n\nEnjoy!\n');
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
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
  this.copy('NOTICE.md', 'NOTICE.md');


  // templating copy
  this.template('Gruntfile.js', 'Gruntfile.js');
  this.template('README.md', 'README.md');
  this.template('LICENSE', 'LICENSE');

};
