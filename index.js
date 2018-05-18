/* jshint node: true */

var originalStdout = process.stdout.write;
var originalStderr = process.stderr.write;

var outData = [];
var errData = [];

function collect(arr) {
  return function (val) {
    /* istanbul ignore next */
    try {
      // Buffer.from was officially introduced
      // in node 4.5.0, but was actually present
      // with only partial abilities before that.
      // In earlier versions of node 4, it could
      // not handle string data. Simply testing
      // for the existence of Buffer.from does not
      // support all versions of node.
      arr.push(Buffer.from(val));
    } catch(e) {
      arr.push(new Buffer(val));
    }
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
