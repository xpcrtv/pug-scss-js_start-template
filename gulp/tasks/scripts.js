const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const config = require('../config');

gulp.task('scripts', () =>
  gulp
    .src(config.dev.js.src)
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(gulp.dest(config.dev.js.dest))
    .pipe(browserSync.stream())
);

gulp.task('scripts:build', () =>
  gulp
    .src(config.dist.js.src)
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest(config.dist.js.dest))
);
