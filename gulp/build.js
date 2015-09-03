'use strict';
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var babelify = require('babelify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var reload = require('gulp-livereload');

gulp.task('browserify', function () {
  var b = browserify({
    entries: ['./app/js/main.js'],
    debug: true,
    extensions: ['.jsx'],
    // defining transforms here will avoid crashing your stream
    transform: [babelify]
  });
  // set up the browserify instance on a task basis
  return b.bundle()
    .on('error', function (err) {
      console.log(err);
      this.emit('end');
    })
    .pipe(source('app/js/main.js'))
    .pipe(buffer())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./app'))
    .pipe(reload());
});

gulp.task('less', function () {
    return gulp.src('app/styles/style.less')
      .pipe(sourcemaps.init())
      .pipe(less())
      .on('error', function (err) {
        console.log(err.stack);
        this.emit('end');
      })
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('app'))
      .pipe(reload());
});

gulp.task('build', ['less', 'browserify', 'static']);
