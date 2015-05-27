'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.test_emit_manifest = test_emit_manifest;

var _manifest = require('./manifest');

function test_emit_manifest(test) {
  var m = new _manifest.Manifest();
  m.push('foo', 'foo');
  m.push('bar', 'bar');
  var x = m.emit();
  var y = eval(x);
  test.ok(y.foo = 'foo');
  test.ok(y.bar = 'bar');
  test.done();
}