/* jshint node: true */

// allow hijacking IO, so that we can both
// test values and not log during a test
var fakeIo = (function () {

  var originalStdout = process.stdout.write;
  var originalStderr = process.stderr.write;

  var outData = [];
  var errData = [];

  function collect(arr) {
    return function (val) {
      arr.push(new Buffer(val));
    };
  }

  return {
    activate: function () {
      process.stdout.write = collect(outData);
      process.stderr.write = collect(errData);
    },
    deactivate: function () {
      process.stdout.write = originalStdout;
      process.stderr.write = originalStderr;

      var data = {
        stdout: Buffer.concat(outData).toString(),
        stderr: Buffer.concat(errData).toString()
      };

      outData = [];
      errData = [];

      return data;
    }
  };
})();

module.exports = fakeIo;
