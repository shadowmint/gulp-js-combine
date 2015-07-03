# gulp-js-combine

Combines arbitrary files into a single combined javascript file.

## Why?

...because, sometimes its actually quite useful to have a 'one file'
drop in javascript file.

## Install

```
$ npm install --save-dev shadowmint/gulp-js-combine#0.0.2
```

## Build and tests

Just run gulp in the build folder:

    npm install
    gulp

## Usage

Running this script generates a javascript block that returns a json
file with each input file bound to it, in the form:

    {
      'foo.txt': 'text from foo here',
      'bar/foo.js': '(function foo() { ... }'
    }

### Options

- output: The name of the single output file to generate.
- root: The prefix to remove from the output; by default the current path.
- bootstrap: The bootstrap javascript file.
- bootsym: The bootstrap javascript symbol to run (default: bootstrap).
- export: Export the resulting javascript as a variable.

A typical bootstrap might look like:

    function bootstrap(foo) {
      return (config) => {
        console.log(foo);
      };
    };

See the demo/ folder.

```js
var combine = require('../');
var run = require('run-sequence');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var gulp = require('gulp');

gulp.task('scripts', function() {
  return gulp.src('./src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./build'));
});

gulp.task('templates', function() {
  return gulp.src('./src/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./build'));
});

gulp.task('styles', function() {
  return gulp.src('./src/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build'));
});

gulp.task('combine', function() {
  gulp.src('./build/**/*')
    .pipe(combine({
      root: './build',
      output: 'static/combined.js',
      bootstrap: 'bootstrap.js'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('default', function(callback) {
  run('templates', 'styles', 'scripts', 'combine', callback);
});
```

Generates the output script:

```js
(function() { 'use strict';

function bootstrap(foo) {
  console.log(foo);

  // Inject content
  document.write('<style>' + foo['class1.css'] + '</style>');
  document.write(foo['class1.html']);

  // Load a class from a js file
  var one = eval('(function() { ' + foo['class1.js'] + '; return One; })()');
  var instance = new one();
  console.log(instance);
};; return bootstrap({"class1.css":".class1 h1 {\n  color: #f00; }\n","class1.html":"<div class=\"class1\"><h1> \nHi</h1></div>","class1.js":"'use strict';\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }\n\nvar One = function One() {\n  _classCallCheck(this, One);\n\n  this.foo = 'bar';\n};"}); })();
```

It may sometimes (for example, using gulp-umd) to generate an output variable in
the resulting javascript; using the `export` option:

    .pipe(combine({ output: 'value.js', export: Value })

Generates a suitable output:

    var Value = (function() { .... })();

### Notes

Note that minification, compression, etc. is not done at all; there are other
plugins that perform those tasks. To use them, pipe the generated files to
the compression plugins (eg. uglify for javascript) and combine the resulting
files.

This adheres to the 'do one thing' principal in gulp.

Note *also* that this does not attempt to solve the same problem as browserify;
you may want to browserify a script *before* combining it; this plugin is for
converting multiple files into a single file.

For images, consider converting them into inline base64 strings. A number of
gulp plugins already exist for the purpose of processing images and html in
this way.

This plugin does *not* support embedding binary content and will only process
input string values. Preprocess binary content appropriately.

## License

MIT
