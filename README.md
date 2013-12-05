# Closure Library Generator

Create a fully working [Closure Library][closure-library] project in seconds.

[![NPM](https://nodei.co/npm/generator-closure.png?downloads=true)](https://npmjs.org/package/generator-closure)


## Getting Started

The generator is using [yeoman][] and relies on [Grunt][] to operate. If you don't have them, install:

```shell
npm install -g yo grunt-cli
```

The generator itself can be globally installed and reused anywhere:

```shell
npm install -g generator-closure
```

Run it:

```shell
yo closure
```

After the generator is finished, you need to add the Closure Library in the `app/closure-library` path:
```shell
git clone https://code.google.com/p/closure-library/ app/closure-library
```

Finally, install all the dependencies:
```shell
npm install && bower install
```

### The Library Version

There is a *Library* version of the generator:

```shell
yo closure:lib
```

The *Library* version is for closure libraries that have no web output. The location of your project's base changes to `lib/` instead of the default one `app/js/`.


## What you get

* A fully working installation of closure compiler.
* A battle-tested folder scaffolding for your closure application.
* A skeleton sample application.
* A third-party dependencies loader.
* A set of helper and boilerplate code to speed up your time to productive code.
* A Full Behavioral and Unit testing suite using [Mocha][] with [Chai.js][] and [Sinon.js][].
* 52 BDD and TDD tests both for your development and compiled code.
* Full open source boilerplace (README, LICENSE, .editorconfig, etc).
* Vanilla and a [special edition][ss-compiler] Closure Compiler that strips off all `logger` calls from your production code. (The special edition is used).
* Sourcemap file for your compiled code.
* A set of Grunt Tasks that will:
  - Manage your dependencies.
  - Compile your code.
  - Run a static webserver with livereload.
  - Test your code on the CLI & the browser.

## Table Of Contents

* [Grunt Tasks](#grunt-tasks)
  - [grunt server](#grunt-server)
  - [grunt deps](#grunt-deps)
  - [grunt build](#grunt-build)
  - [grunt test](#grunt-test)
* [Your Closure Application](#your-closure-application)
  - [Folder Layout](#folder-layout)
* [Third-Party Dependencies](#third-party-dependencies)
* [The Test Suites](#the-test-suites)
* About
  - [Contributing](#contributing)
  - [The 'ssd' Namespace](#the-ssd-namespace)
  - [Release History](#release-history)
  - [License](#license)

## Grunt Tasks

### Tasks Overview

* **`grunt server`** Start a static server
* **`grunt` or `grunt deps`** Calculate Dependencies
* **`grunt build`** Compile your code
* **`grunt test`** Run tests on the command line
* **`grunt server:test`** Run tests on the browser

### Tasks In Detail

### `grunt server`

The `grunt server` task will do quite a few things for you.

* A static server will listen on port 9000 (or anything you'd like, with: `--port=8080`).
* A [live reload server][grunt-live-reload] will be launched.
* All your codebase will be wathed for changes and trigger livereload events
* Finally, your browser will open on the project page

### `grunt deps`

The `grunt deps` task will calculate the dependencies of your project and output to the deps file: `app/js/deps-app.js`.

It will also run the dependencies task for the behavioral and unit tests updating the files: `test/bdd/deps-test-bdd.js` and `test/unit/deps-test-tdd.js`. Find more about testing bellow.

<sup>[↑ Back to TOC](#table-of-contents)</sup>

### `grunt build`

The build task employs a long flow so it can enable you to bundle third-party dependencies on your production file. Here is the overview of what happens:

1. Temporary folder `temp` is cleared.
2. All the defined third-party dependencies are minified using uglify. The output can be found in `temp/vendor.js`.
3. [Closure Compiler] will compile your closure codebase using [ADVANCED_OPTIMIZATIONS][]. The output can be found at: `temp/compiled.js`
4. Produce the final file by concatenating the *vendor* and *compiled* files to: `app/jsc/app.js`

#### Configure build options

The build operation is easily configured down to the most edge case. Everything you need is in the [Gruntfile][] which is at the root of your project: `Gruntfile.js`.

At the top of the file you will find a few build related variables:

```js
  // The folder that contains all the externs files.
  var EXTERNS_PATH = 'build/externs/';

  // define the main namespace of your app
  var ENTRY_POINT = 'app';
```
##### Third-Party Libraries

Read about [Configuring Third-Party dependencies for your build](#configure-third-party-building).

##### EXTERNS_PATH

Define the folder that will be scanned for [externs files][Externs]. The *Closure Generator* comes packed with these externs for you:

* jQuery 1.9
* Angular
* Facebook Javascript SDK
* When.js 1.8

##### ENTRY_POINT

The entry point is the top-most namespace level of your application. In the included sample application that namespace is `app`.

##### Advanced Build Configuration

Locate the directive `closureBuilder` in the Gruntfile. The full documentation for all the options and directives can be found in the [Grunt Closure Tools][] plugin that is being used to compile your code.

One thing to take note of is the line where the compiled is defined:

```js
compilerFile: compiler.getPathSS(),
```

The `compiler` variable is the [Superstartup Closure Compiler][] npm package that includes two versions of the Closure Compiler. The original closure compiler and a modified one. In this line, the modified compiler is used so all `logger` debug calls are stripped from the production built.

### `grunt test` & `grunt server:test`

The test tasks for the CLI and the browser. Read more on the Testing section.

<sup>[↑ Back to TOC](#table-of-contents)</sup>

## Your Closure Application

The scaffold of the closure application gives you a kickstart on writing your own app.
A lot of different practices and techniques are incorporated in the scaffolding. They are based on distilled experiences and problems faced over years of developing closure applications. Feel free to rip everything off and start from scratch or checkout what's included...

### Folder Layout

The root folder of the Closure Application is in: `app/js/`. Only two files two files should exist in the root folder:

* `main.js` This is the main bootstrap file. No code should exist in this file, only require statements. Sequence matters.
* `deps-app.js` The dependencies file. This file is auto-generated by the `grunt deps` task.

The other folders and their meaning:

#### `core/`

The core folder is where the core of your application resides. The standard `core/core.js` file defines the core class and initializes your application.

The `exports.js` file is where you define what parts of your application will get exposed after compilation.

The `response.core.js` is an optional library that will help your library provide uniform, standardized and properly exposed responses. E.g. event objects, callback parameters, etc.

#### `helpers/`

Put helpers here. A set of some utility functions is included in the `ssd.helpers` namespace. Read the `helpers/helpers.js` file, they are well documented.

#### `libs/`

Stand alone closure libraries for your project. The third-party loader is in this folder: `libs/vendor.loader.js`. Read more about it in the Third-party dependencies section.

The file `module.js` is an empty class that all other applications extend, it can be accessed is the `app.Module` namespace. The `app.Module` class extends [`goog.events.EventTarget`][eventtarget] which extends [`goog.Disposable`][goog.Disposable]. This provides with all your classes event and disposing capabilities.

A typical way to extend the `app.Module` base class:

```js
/**
 * @fileoverview Performs some function.
 */
goog.provide('app.SomeClass');

goog.require('app.Module');

/**
 * @constructor
 * @extends {app.Module}
 */
app.SomeClass = function() {
  goog.base(this);

  /** .. */
};
goog.inherits(app.SomeClass, app.Module);
```

#### `network/`

The network folder contains a *persistent storage* layer abstraction. The top-most class is the `app.sync` which only has one function: `app.sync.send()`. `app.sync` is a this wrapper for `app.ajax` which provides some abstraction over Closure's [`XhrIo`][goog.XhrIo] library.

The result is that when your app interfaces with `app.sync` it has the option to work with a promise or callback. Both of which return a standardized response object that is defined in the `response.sync.js` file. Should that be the case at a later point, you can easily intercept calls in the sync class and use sockets over xhr or local storage or...

While this is possibly quite a stretch for your use-case, it is generaly advisable to retain such a level of abstraction to the persistent storage layer. That includes the network layer (xhr or socket calls).

#### `structs/`

The structs folder should contain all your data abstractions. These are the building blocks of your models.

#### `vendor/`

All third-party libraries should be in here. Read more about [Third-Party Dependencies](#third-party-dependencies).

### Your Application Folders

Create new folders as you see fit. In the generator the folder `app/` is included which contains a skeleton app.

<sup>[↑ Back to TOC](#table-of-contents)</sup>

## Third-Party Dependencies

Closure Library has a hard time working with third-party libraries that are not *closure compatible*. Hopefully, with the use of *externs* files, this dependency loader and the community's help we can soften these hurdles.

This is more of a technique, rather than a stand alone library. The library itself is only usefull for developing. For building your application the ball is on Grunt's hands.

> **IMPORTANT**: All third-party dependencies must be in the `app/js/vendor` folder.

### Configure Third-Party for Development

You need to edit the third-party library file which is located at: `app/js/libs/vendor.loader.js`.

```js
  /**
   * EDIT THIS ARRAY.
   *
   * @type {Array} define the 3rd party deps.
   */
  ssd.vendor.files = [
    'when.js',
    'jQuery-1.9.1.js'
  ];
```

Add or remove strings in the array as you see fit.

### Configure Third-Party Building

To define what third-party files will get bundled with your production file you need to edit the [Gruntfile][]. At the top of the Gruntfile the `vendorFiles` *Array* is defined:

```js
  // define the path to the app
  var APP_PATH = 'app/js';

  // the file globbing pattern for vendor file uglification.
  var vendorFiles = [
    // all files JS in vendor folder
    APP_PATH + '/vendor/*.js',
    // and jQuery, we'll use a CDN for it.
    '!' + APP_PATH + '/vendor/jQuery*'
  ];
```

This configuration will include every javascript file in the `app/js/vendor/` directory, except any jQuery file. We don't want to include jQuery in the production file as it is faster to include from a public CDN.

<sup>[↑ Back to TOC](#table-of-contents)</sup>

## The Test Suites

The test suite uses [Mocha][] with [Chai.js][] and [Sinon.js][]. Two seperate types are included, *Behavioral* and *Unit* tests.

### Behavioral Driven Development

BDD tests are supposed to test against the development **and** compiled code. They ensure your API is properly exposed and all functionality and behavior happens as expected.

24 tests are included that can run against your development or compiled code. Launch them on your browser with grunt:

```shell
grunt server:test
```

### Test Drive Development

Unit tests are designed to test your codebase only in development state. They will fail if run against your compiled code.

This provides you with the ability to unit test down to the most granular level your code. 4 unit tests are included to get you started. You can view them in the browser after you click on the `Unit Tests` link at the top of your browser:

```shell
grunt server:test
```

### Tests on the CLI

```shell
grunt test
```

'nough said.

### Common Browser Pitfalls

You may noticed that to switch from BDD to Unit tests or to Compiled codebase on the browser, a GET param is added on the url. E.g. to view the unit tests the url is `http://localhost:4242/test/?unit=1`.

If you want to drill down on a specific test that GET param `?unit=1` will be lost. For example, if you click on the `isjQ()` test you will be redirected to this url and see nothing:

```
http://localhost:4242/test/?grep=ssd.helpers%20isjQ
```

The reason this is blank is because the `unit` GET param is not there. You need to add it manually:

```
http://localhost:4242/test/?grep=ssd.helpers%20isjQ&unit=1
```

Sorry about that, please share your thoughts.

<sup>[↑ Back to TOC](#table-of-contents)</sup>

## Contributing

Closure is so vast and we need to have a common place to document all the techniques and best practises used today.

## The `ssd` Namespace

The `ssd` namespace that's included in some libraries stands for SuperStartup Development. It is the development namespace used by the [Superstartup][] library.

## Release History

- **v0.1.12**, *05 Dec 2013*
  - Updated all dependencies to latest.
- **v0.1.9**, *14 Oct 2013*
  - Allow overriding hostname and port of grunt server.
  - Fix generator `green` bug.
  - Enables defining closure-library location using the `CLOSURE_PATH` env var closureplease/generator-closure#3
- **v0.1.8**, *8 Jun 2013*
  - Fix event handling so it works with recent closure changes.
- **v0.1.7**, *3 Jun 2013*
  - Bug fix for library generation
- **v0.1.6**, *1 May 2013*
  - Several bugfixes, all found thanks to [@JayGray](https://github.com/JayGray).
- **v0.1.5**, *07 May 2013*
  - Renamed `component.json` to `bower.json`
  - Linted Gruntfile
  - Minor color tweaks
- **v0.1.4**, *14 Apr 2013*
  - Added Closure Linter task, thanks @pr4v33n
- **v0.1.3**, *14 Apr 2013*
  - Minor bugs
- **v0.1.2**, *21 Mar 2013*
  - Added *Library* generator
  - Added Bower support
  - Instruction changes
- **v0.1.1**, *20 Mar 2013*
  - Added Source Map option
  - Minor typo fixes
- **v0.1.0**, *Mid Mar 2013*
  - Big Bang

## License
Copyright (c) 2013 Thanasis Polychronakis
Licensed under the [MIT](LICENSE-MIT).

<sup>[↑ Back to TOC](#table-of-contents)</sup>

[closure-library]: https://developers.google.com/closure/library/ "Google Closure Library"
[closure-tools]: https://developers.google.com/closure/ "Google Closure Tools"
[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/wiki/Getting-started
[package.json]: https://npmjs.org/doc/json.html
[Gruntfile]: https://github.com/gruntjs/grunt/wiki/Sample-Gruntfile "Grunt's Gruntfile.js"
[yeoman]: http://yeoman.io/ "yeoman Modern Workflows for Modern Webapps"
[grunt-live-reload]: https://github.com/gruntjs/grunt-contrib-livereload#readme "Grunt contrib livereload"
[closure compiler]: https://developers.google.com/closure/compiler/ "Google's Closure Compiler"
[ADVANCED_OPTIMIZATIONS]: https://developers.google.com/closure/compiler/docs/api-tutorial3 "closure compiler Advanced optimizations"
[ss-compiler]: https://github.com/thanpolas/superstartup-closure-compiler#readme "superstartup closure compiler"
[Mocha]: http://visionmedia.github.com/mocha/ "Mocha testing library"
[Chai.js]: http://chaijs.com/ "Chai Assertion Library"
[Sinon.js]: http://sinonjs.org/ "Standalone test spies, stubs and mocks for JavaScript."
[Externs]: https://developers.google.com/closure/compiler/docs/api-tutorial3#externs "Closure Compiler externs file"
[Grunt Closure Tools]: https://github.com/thanpolas/grunt-closure-tools/#closure-builder "The Grunt Closure Tools plugin"
[Superstartup Closure Compiler]: https://github.com/thanpolas/superstartup-closure-compiler#readme "Superstartup Closure Compiler"
[eventtarget]: http://docs.closure-library.googlecode.com/git/class_goog_events_EventTarget.html "events.EventTarget class"
[goog.Disposable]: http://docs.closure-library.googlecode.com/git/class_goog_Disposable.html "goog.Disposable class"
[goog.XhrIo]: http://docs.closure-library.googlecode.com/git/class_goog_net_XhrIo.html "goog.net.XhrIo"
[Superstartup]: https://github.com/thanpolas/superstartup#readme
