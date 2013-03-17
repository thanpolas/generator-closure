/**
 * @fileoverview The bootstrap file of all the tests.
 */
goog.provide('app.test.bootstrap');


// setup mocha
mocha.ui('bdd');
mocha.reporter('html');


// sequence matters
goog.require('app.test.fixture.userOne');

goog.require('app.test.main');

goog.require('app.test.core');
goog.require('app.test.event.api');
