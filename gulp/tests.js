  'use strict';
var gulp = require('gulp');
var mocha = require('gulp-spawn-mocha');

var mochaReporter = process.env.CIRCLE_TEST_REPORTS ? 'mocha-junit-reporter': 'dot';

gulp.task('spec',function () {
    return gulp.src([
      'app/js/**/_spec/**/*.js'
      ])
      .pipe(mocha({
          compilers: 'js:babel/register',
        reporter: mochaReporter,
        // reporter: 'dot',
      }));
});
