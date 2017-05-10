/* jshint node: true */

var originalStdout = process.stdout.write;
var originalStderr = process.stderr.write;

var outData = [];
var errData = [];

function collect(arr) {
  return function (val) {
    arr.push(new Buffer(val));
  };
}

module.exports = {
  start: function () {
    process.stdout.write = collect(outData);
    process.stderr.write = collect(errData);
  },
  end: function () {
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
