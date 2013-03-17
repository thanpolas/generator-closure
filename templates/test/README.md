# Application Tests

## Introduction
There are two kind of tests performed behavioral and unit.

### Behavioral Tests
Behavioral tests examine the exposed API of the library and must be run both while developing the library but most importantly **after the library has been packaged and compiled** to ensure all public API calls behave as expected and the library's integrity is intact.

### Unit Tests
Unit tests will examine the innards of the library. Internally used components, helpers and tools are tested down to the smallest unit.

> Unit tests are not expected to run against compiled code.


## How to run

### Run from the command line

There are grunt tasks for running the tests. To better emulate running conditions all tests are run using phantomJS so there is a complete DOM environment.

```shell
grunt test
```

### Run from the browser

```shell
grunt server:test
```
