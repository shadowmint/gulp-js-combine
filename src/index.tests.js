'use strict';

import {read_from_stream, read_files_from_stream} from 'gulp-tools/lib/utils';
import plugin from './index';
import fs from 'fs';
import File from 'vinyl';

export function test_with_buffer(test) {
  test.expect(2);

  var file1 = new File({ path: 'source1.js', cwd: 'tests/', base: 'tests/', contents: new Buffer("Hello") });
  var file2 = new File({ path: 'source2.js', cwd: 'tests/', base: 'tests/', contents: new Buffer("World") });

  var stream = plugin();
  read_from_stream(stream, 'utf8', function(value) {
    var value = eval(value);
    test.ok(value['source1.js'] == 'Hello');
    test.ok(value['source2.js'] == 'World');
    test.done();
  });

  stream.write(file1);
  stream.write(file2);
  stream.end();
}

export function test_with_stream(test) {
  test.expect(2);

  var file1 = new File({
    path: 'source1.js',
    cwd: 'tests/',
    base: 'tests/',
    contents: fs.createReadStream('./tests/source1.js')
  });
  var file2 = new File({
    path: 'source2.js',
    cwd: 'tests/',
    base: 'tests/',
    contents: fs.createReadStream('./tests/source2.js')
  });

  var stream = plugin();
  read_from_stream(stream, 'utf8', function(value) {
    var value = eval(value);
    test.ok(value['source1.js'] == 'Hello\n');
    test.ok(value['source2.js'] == 'World\n');
    test.done();
  });

  stream.write(file1);
  stream.write(file2);
  stream.end();
}

export function test_with_invalid_stream(test) {
  test.expect(1);

  var file1 = new File({
    path: 'source3.js',
    cwd: 'tests/',
    base: 'tests/',
    contents: fs.createReadStream('./tests/source3.js')
  });

  var stream = plugin();
  stream.on('error', function(err) {
    test.ok(true);
    test.done();
  });
  read_from_stream(stream, 'utf8', function(value) {
    test.ok(false); // Unreachable
  });

  stream.write(file1);
  stream.end();
}

export function test_with_no_options(test) {
  test.expect(2);

  var file1 = new File({ path: 'source1.js', cwd: 'tests/', base: 'tests/', contents: new Buffer("Hello") });
  var file2 = new File({ path: 'source2.js', cwd: 'tests/', base: 'tests/', contents: new Buffer("World") });

  var stream = plugin();
  read_files_from_stream(stream, function(files) {
    test.ok(files.length == 1);
    test.ok(files[0].path = 'combined.js');
    test.done();
  });

  stream.write(file1);
  stream.write(file2);
  stream.end();
}

export function test_with_valid_output_option(test) {
  test.expect(2);

  var file1 = new File({ path: 'source1.js', cwd: 'tests/', base: 'tests/', contents: new Buffer("Hello") });
  var file2 = new File({ path: 'source2.js', cwd: 'tests/', base: 'tests/', contents: new Buffer("World") });

  var stream = plugin({ output: 'junk.js' });
  read_files_from_stream(stream, function(files) {
    test.ok(files.length == 1);
    test.ok(files[0].path = 'junk.js');
    test.done();
  });

  stream.write(file1);
  stream.write(file2);
  stream.end();
}

export function test_with_invalid_output_option(test) {
  try {
    var stream = plugin({ output: null });
    test.ok(false);  // Unreachable
  }
  catch(err) {
    test.ok(true);
    test.done();
  }
}
