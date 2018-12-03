const gulp = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const csscomb = require('gulp-csscomb');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const config = require('../config');

gulp.task('sass', () =>
  gulp
    .src(config.dev.css.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(csscomb())
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(gulp.dest(config.dev.css.dest))
    .pipe(browserSync.stream())
);

gulp.task('sass:build', () =>
  gulp
    .src(config.dist.css.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(csscomb())
    .pipe(
      csso({
        comments: false
      })
    )
    .pipe(gulp.dest(config.dist.css.dest))
);
