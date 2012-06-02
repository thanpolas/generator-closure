Closure Boilerplate
===================

A google closure boilerplate repository, clone to construct a google closure based project

Quick Start
-----------

* Clone the repo, `git clone git@github.com:thanpolas/closure-boilerplate.git`
* Init the submodules to get the latest google-closure library
    - `git submodule init`
    - `git submodule update`
* Point your apache to the 'html/' folder
* You are ready!

Directory Structure
----------
* **html/** Your DOCUMENT_ROOT folder
   * **js/** The javascript source folder. Closure library is here, as well as a sample JS source
   * **jsc/** The JS compiling scripts output here the compiled .JS
* **bin/** The scripts to calculate dependencies and compile the JS are in this folder
   * **externs/** [The extern files](https://developers.google.com/closure/compiler/docs/api-tutorial3#externs) required by the compiler for ADVANCED_OPTIMIZATIONS
   * **compilers/** The compilers .jar files. A modified compiler exists `sscompiler.jar` which when used excludes from compilation all calls to the following:
       - **Libraries**: `goog.debug.*`, `goog.asserts.*`, `window.console`
       - **Inline execution of**: `logger`, `logger_`, `window.console.log`

How to Operate
-------------
###Calc Deps###
Whenever you need to update the dependencies file located in `html/js/deps.js` you need to go to the `bin/` folder and run `./01.run_calcdeps.pl`

###JS Compile###
From the same folder (`bin/`) you can run the compile command `./05.js_compile.pl` which will produce the packed compiled JS files and put them in the `html/jsc/` directory.


