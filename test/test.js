/*global describe beforeEach it*/

var path    = require('path');
var helpers = require('yeoman-generator').test;

var gen = null;




describe('closure generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('closure:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.jshintrc',
      '.editorconfig',
      'bower.json',
      'package.json',
      'Gruntfile.js',
      'app/index.html',
    ];

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});

// describe('Webapp generator test', function () {
//   before(helpers.before(path.join(__dirname, './temp')));

//   it('the generator can be required without throwing', function () {
//     // not testing the actual run of generators yet
//     this.app = require('../app');
//   });

//   it('runs sucessfully', function(done) {
//     helpers.runGenerator('closure', done);
//   });

//   it('creates expected files', function (done) {
//     var expected = [
//       ['component.json', /"name": "temp"/],
//       ['package.json', /"name": "temp"/],
//       'Gruntfile.js',
//       'app/index.html'
//     ];

//     gen.run({}, function () {
//       helpers.assertFiles(expected);
//       done();
//     });
//   });
// });
