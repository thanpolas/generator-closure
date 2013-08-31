/**
 * The base library every generator in this repo extends
 *
 */
require('colorplus').enable();
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

  this.on('end', Generator._onEnd.bind(this));

};
util.inherits(Generator, generator.Base);


Generator._onEnd = function () {

  function getStep(step, descr) {
    return '\n\n' + step.bggreen + ' ' + descr.bold.green + '\n';
  }

  var allDone = '\n\n';
  allDone += '             ___    ____       __                 __\n';
  allDone += '            /   |  / / /  ____/ /___  ____  ___  / /\n';
  allDone += '           / /| | / / /  / __  / __ \\/ __ \\/ _ \\/ / \n';
  allDone += '          / ___ |/ / /  / /_/ / /_/ / / / /  __/_/  \n';
  allDone += '         /_/  |_/_/_/   \\__,_/\\____/_/ /_/\\___(_)   \n';

  var finalMessage = allDone.bold.cyan + '\n\n';

  finalMessage += getStep('STEP 1.', 'Download the Closure Library in the "' +
    this.closure.closurePath.bold.magenta  + 'closure-library'.bold.magenta +
    '" directory:');
  finalMessage += '    git clone https://code.google.com/p/closure-library/ '.bold.yellow +
    this.closure.closurePath.bold.yellow + 'closure-library'.bold.yellow + '\n';
  finalMessage += '    or ' + 'bower install closure-library'.bold.yellow + '\n';
  finalMessage += '         Note: ' + 'if you use bower, make sure to update ' +
    'the paths in Gruntfile.js\n';

  finalMessage += getStep('STEP 2.', 'Install required dependencies:');
  finalMessage += '    npm install && bower install'.bold.yellow +'\n';

  finalMessage += getStep('STEP 3.', 'Happy hacking!');
  finalMessage += '    grunt server'.bold.magenta + ' Launch a static server ' +
    'with livereload\n';
  finalMessage += '    grunt build'.bold.magenta + ' Build your application\n';
  finalMessage += '    grunt test'.bold.magenta + ' Run all tests from console\n';
  finalMessage += '    grunt server:test'.bold.magenta + ' Run all tests from ' +
    'your browser\n';


  finalMessage += '\n\nFor more information go to: ' +
    'https://github.com/closureplease/generator-closure#table-of-contents'.cyan;
  finalMessage += '\n\nEnjoy!\n';

  console.log(finalMessage);
};

