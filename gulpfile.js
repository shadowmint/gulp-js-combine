var nodeunit = require('gulp-nodeunit');
var babel = require('gulp-babel');
var gulp = require('gulp');

gulp.task('default', ['scripts']);

/// Run tests
gulp.task('tests', function () {
  gulp.src('./build/**/*.tests.js').pipe(nodeunit());
});

// Compile ES6 scripts using bable and combine
gulp.task('scripts', function() {
  gulp.src('./src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./build'));
});
