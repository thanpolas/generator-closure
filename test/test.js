/*global describe beforeEach it*/

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('Webapp generator test', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.webapp = helpers.createGenerator('closure', [
        '../../app', [
          helpers.createDummyGenerator()
        ]
      ]);
      done();
    }.bind(this));
  });

  it('the generator can be required without throwing', function () {
    // not testing the actual run of generators yet
    this.app = require('../app');
  });

  it('creates expected files', function (done) {
    var expected = [
      ['component.json', /"name": "temp"/],
      ['package.json', /"name": "temp"/],
      'Gruntfile.js',
      'app/index.html'
    ];

    this.webapp.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
