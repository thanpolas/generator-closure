/**
 * The base library every generator in this repo extends
 *
 */
var generator = require('yeoman-generator');
var util      = require('util');
var path      = require('path');


var Generator = module.exports = function Generator() {
  generator.Base.apply(this, arguments);

  // this.option('flag', { desc: 'Desc for flag', ...})
  // this.argument('filename', { desc: 'Desc for filename argument', ...})
  // this.hookFor('webapp', { args:['--compassBootstrap'] });

  this.closure = {};
  this.sourceRoot(path.join(__dirname, '../templates'));
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

  this.on('end', this._onEnd.bind(this));

};
util.inherits(Generator, generator.Base);


Generator.protototype._onEnd = function () {

  function getStep(step, descr) {
    return '\n\n' + step.bgblue.bold.gray + ' ' + descr.bold.green + '\n';
  }

  var allDone = '';
  allDone += '    ___    ____       __                 __\n';
  allDone += '   /   |  / / /  ____/ /___  ____  ___  / /\n';
  allDone += '  / /| | / / /  / __  / __ \\/ __ \\/ _ \\/ / \n';
  allDone += ' / ___ |/ / /  / /_/ / /_/ / / / /  __/_/  \n';
  allDone += '/_/  |_/_/_/   \\__,_/\\____/_/ /_/\\___(_)   \n';

  var finalMessage = allDone.blue + '\n\n';

  finalMessage += getStep('STEP 1.', 'Download the Closure Library' +
    this.closure.closurePath.bold.yellow + ' folder:');
  finalMessage += '    git clone https://code.google.com/p/closure-library/ ' +
    this.closure.closurePath.bold.yellow + '/closure-library'.bold.yellow + '\n';
  finalMessage += '    or ' + 'bower install closure-library'.bold.yellow + '\n';
  finalMessage += '         Note: ' + 'if you use bower, make sure to update ' +
    'the paths in Gruntfile.js\n';

  finalMessage += getStep('STEP 2.', 'Install required dependencies:');
  finalMessage += '    npm install & bower install'.bold.yellow +'\n';

  finalMessage += getStep('STEP 3.', 'Happy hacking!');
  finalMessage += '    grunt server'.bold.yellow + ' Launch a static server ' +
    'with livereload\n';
  finalMessage += '    grunt build'.bold.yellow + ' Build your application\n';
  finalMessage += '    grunt test'.bold.yellow + ' Run all tests from console\n';
  finalMessage += '    grunt server:test'.bold.yellow + ' Run all tests from ' +
    'your browser\n';


  finalMessage += '\n\nFor more information go to: ' +
    'https://github.com/closureplease/generator-closure#table-of-contents'.blue;
  finalMessage += '\n\nEnjoy!\n';

  console.log(finalMessage);
};

