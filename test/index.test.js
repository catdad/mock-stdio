/* jshint node: true, mocha: true */

var expect = require('chai').expect;

var lib = require('../');

describe('[index]', function () {
  it('has two methods', function () {
    expect(lib).to.have.all.keys(['start', 'end']);
  });

  it('collects stdout data from process.stdout stream', function () {
    var str = 'banana';

    lib.start();

    process.stdout.write(str);

    var data = lib.end();

    expect(data.stdout).to.equal(str);
  });

  it('collects stdout data from console.log', function () {
    var str = 'banana';

    lib.start();

    console.log(str);

    var data = lib.end();

    expect(data.stdout).to.equal(str + '\n');
  });

  it('collects stderr data from process.stderr stream', function () {
    var str = 'banana';

    lib.start();

    process.stderr.write(str);

    var data = lib.end();

    expect(data.stderr).to.equal(str);
  });

  it('collects stdout data from console.error', function () {
    var str = 'banana';

    lib.start();

    console.error(str);

    var data = lib.end();

    expect(data.stderr).to.equal(str + '\n');
  });

});
