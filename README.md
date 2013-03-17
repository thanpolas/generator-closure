# Closure Library Yeoman Generator

Create a fully working [Closure Library][closure-library] project in seconds.

## Getting Started

The generator is using [yeoman][] and relies on [Grunt][] to operate. If you don't have them installed:

```shell
npm install -g yo grunt-cli
```

Next **create and enter** your project's directory. Install the generator locally:

```shell
npm install generator-closure
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
npm install
```

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
* A set of Grunt Tasks that will:
  - Manage your dependencies.
  - Compile your code.
  - Run a static webserver with livereload.
  - Test your code on the CLI & the browser.

## Grunt Tasks

### Overview

* **`grunt server`** Start a static server
* **`grunt`** or **`grunt deps`** Calculate Dependencies
* **`grunt build`** Compile your code
* **`grunt test`** Run tests on the command line
* **`grunt server:test`** Run tests on the browser

### In Detail

### `grunt server`

The `grunt server` task will do quite a few things for you.

* A static server will listen on port 9000.
* A [live reload server][grunt-live-reload] will be launched.
* All your codebase will be wathed for changes and trigger livereload events
* Finally, your browser will open on the project page

### `grunt deps`

The `grunt deps` task will calculate the dependencies of your project and output to the deps file: `app/js/deps-app.js`.

It will also run the dependencies task for the behavioral and unit tests updating the files: `test/bdd/deps-test-bdd.js` and `test/unit/deps-test-tdd.js`. Find more about testing bellow.

### `grunt build`

The build task employs a long flow so it can enable you to bundle third-party dependencies on your production file. Here is the overview of what happens:

* Temporary folder `.tmp` is cleared.
* All the defined third-party dependencies are minified using uglify. The output can be found in `temp/vendor.js`.
* [Closure Compiler] will compile your closure codebase using [ADVANCED_OPTIMIZATIONS][]. The output can be found at: `temp/compiled.js`
* Concatenate the *vendor* and *compiled* files into one final, production ready file: `app/jsc/app.js`

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
