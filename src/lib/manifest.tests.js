import {Manifest} from './manifest';

export function test_emit_manifest(test) {
  var m = new Manifest();
  m.push('foo', 'foo');
  m.push('bar', 'bar');
  var x = m.emit();
  var y = eval(x);
  test.ok(y.foo = 'foo');
  test.ok(y.bar = 'bar');
  test.done();
}
