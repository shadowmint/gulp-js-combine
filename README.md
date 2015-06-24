# gulp-combine

Combines arbitrary files into a single combined javascript file.

## Why?

...because, sometimes its actually quite useful to have a 'one file'
drop in javascript file.

## Install

```
$ npm install --save-dev shadowmint/gulp-js-combine#0.0.1
```

## Tests

    gulp && gulp tests

## Usage

```js
var gulp = require('gulp');
var combine = require('gulp-js-combine');

gulp.task('default', function () {
  return gulp.src('src/*')
    .pipe(combine({ output: 'output.js' }))
    .pipe(gulp.dest('dist'));
});
```

## License

MIT
