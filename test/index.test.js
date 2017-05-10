/* jshint node: true, mocha: true */

var expect = require('chai').expect;

var lib = require('../');

describe('[index]', function () {
  it('has two methods', function () {
    expect(lib).to.have.all.keys(['activate', 'deactivate']);
  });
});
