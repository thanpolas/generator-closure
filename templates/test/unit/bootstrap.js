
goog.provide('app.test.unit.bootstrap');

mocha.ui('tdd');
mocha.reporter('html');


// order matters
goog.require('app.test.main');

goog.require('app.test.helpers');
