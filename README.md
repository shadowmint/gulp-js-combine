# gulp-combine

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

    (function() { var bootstrap = eval("'use strict';\n\n(function (foo) {\n  console.log(foo);\n  document.write(foo['class1.html']);\n  document.write('<style>' + foo['class1.css'] + '</style>');\n  document.write('<script>' + foo['class1.js'] + '</script>');\n});"); return bootstrap((function() { return {"class1.css":".class1 h1 {\n  color: #f00; }\n","class1.html":"<div class=\"class1\"><h1> \nHi</h1></div>","class1.js":"'use strict';\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }\n\nvar One = function One() {\n  _classCallCheck(this, One);\n\n  this.foo = 'bar';\n};"}; })()) })();

## License

MIT
