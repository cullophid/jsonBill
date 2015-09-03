'use strict';
//modules
var gulp = require('gulp');
var gutil = require('gulp-util');
var reload = require('gulp-livereload');
var rename = require('gulp-rename');
var run = require('gulp-run');
var serve = require('gulp-serve');
// require('babel/register');
//constants
gulp.task('serve', serve('app'));

gulp.task('static'  , function () {
  reload();
});

gulp.task('watch', function () {
  gulp.watch(['services/**/*.js', 'api/**/*.js'], ['spec']);
  gulp.watch(['app/js/**/*'], ['spec']);
});

gulp.task('live', ['serve'], function () {
  reload.listen();
  gulp.watch(['app/js/**/*'], ['browserify']);
  gulp.watch('app/styles/**/*.less', ['less']);
  gulp.watch(['app/index.html', 'app/img/**/*', 'app/templates/**/*'], ['static']);
});
