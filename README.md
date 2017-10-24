# mock-stdio

[![travis][travis.svg]][travis.link]
[![cov-codeclimate][cov-codeclimate.svg]][cov-codeclimate.link]
[![gpa-codeclimate][gpa-codeclimate.svg]][gpa-codeclimate.link]
[![npm-downloads][npm-downloads.svg]][npm.link]
[![npm-version][npm-version.svg]][npm.link]
[![dm-david][dm-david.svg]][dm-david.link]

[travis.svg]: https://travis-ci.org/catdad/mock-stdio.svg?branch=master
[travis.link]: https://travis-ci.org/catdad/mock-stdio
[cov-codeclimate.svg]: https://codeclimate.com/github/catdad/mock-stdio/badges/coverage.svg
[cov-codeclimate.link]: https://codeclimate.com/github/catdad/mock-stdio/coverage
[gpa-codeclimate.svg]: https://codeclimate.com/github/catdad/mock-stdio/badges/gpa.svg
[gpa-codeclimate.link]: https://codeclimate.com/github/catdad/mock-stdio
[npm-downloads.svg]: https://img.shields.io/npm/dm/mock-stdio.svg
[npm.link]: https://www.npmjs.com/package/mock-stdio
[npm-version.svg]: https://img.shields.io/npm/v/mock-stdio.svg
[dm-david.svg]: https://david-dm.org/catdad/mock-stdio.svg
[dm-david.link]: https://david-dm.org/catdad/mock-stdio

This is just a simple module allowing you to easily test (or just ignore) code that needs to `console.log` or otherwise write to standard out and standard error.

## Install

```bash
npm install --save-dev mock-stdio
```

## Example

```javascript
var mockIo = require('mock-stdio');
var expect = require('chai').expect;

describe('thing', function () {
  it('writes to standard out', function () {
    // Start the mock... it will not be possible to write to
    // the real stdout and stderr when this is active.
    mockIo.start();

    // Call your code.
    someFunction();

    // When you are done, end the mock, and it will return
    // all the data written to stdout and stderr while the mock
    // was active.
    var result = mockIo.end();

    // Make sure that what you expected was written to
    // the corresponding output.
    expect(result.stdout).to.be.a('string');
    expect(result.stderr).to.be.a('string');
  });
});
```

Note that it is best to use the mock directly inside the test, rather than in `before` or `after` functions, as it will not be possible for anything within the node process to log to `stdout` and `stderr`, meaning you may lose messages that are printed by your test framework.
