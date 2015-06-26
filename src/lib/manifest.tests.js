import {Manifest} from './manifest';
import path from 'path';

export function test_emit_manifest(test) {
  var m = new Manifest();
  m.push('foo', 'foo');
  m.push('bar', 'bar');
  var x = m.emit();
  var y = eval(x);
  test.ok(y.foo == 'foo');
  test.ok(y.bar == 'bar');
  test.done();
}

export function test_configure_root(test) {
  var m = new Manifest();
  m.configure({root: 'foo/bar'});
  m.push(path.resolve('foo/bar/foo'), 'foo');
  m.push(path.resolve('foo/bar/foo/bar'), 'bar');
  var x = m.emit();
  var y = eval(x);
  console.log(y);
  test.ok(y['foo'] == 'foo');
  test.ok(y['foo/bar'] == 'bar');
  test.done();
}

export function test_configure_bootstrap(test) {
  var m = new Manifest();
  m.configure({root: './', bootstrap: 'bootstrap'});
  m.push(path.resolve('foo'), 'foo');
  m.push(path.resolve('bar'), 'bar');
  m.push(path.resolve('bootstrap'), '(function(x) { return x; })');
  var x = m.emit();
  var y = eval(x);
  test.ok(y.foo == 'foo');
  test.ok(y.bar == 'bar');
  test.done();
}
