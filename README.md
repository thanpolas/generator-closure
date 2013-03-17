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

## Grunt Tasks

* **`grunt server`** Start a static server
* **`grunt deps`** Calculate Dependencies
* **`grunt test`** Run tests on the command live


[closure-library]: https://developers.google.com/closure/library/ "Google Closure Library"
[closure-tools]: https://developers.google.com/closure/ "Google Closure Tools"
[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/wiki/Getting-started
[package.json]: https://npmjs.org/doc/json.html
[Gruntfile]: https://github.com/gruntjs/grunt/wiki/Sample-Gruntfile "Grunt's Gruntfile.js"
[yeoman]: http://yeoman.io/ "yeoman Modern Workflows for Modern Webapps"
