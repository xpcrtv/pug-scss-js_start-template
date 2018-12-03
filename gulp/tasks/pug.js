const gulp = require('gulp');
const pug = require('gulp-pug');
const browserSync = require('browser-sync');
const config = require('../config');

gulp.task('pug:build', () =>
  gulp
    .src(config.dev.html.src)
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest(config.dist.html.dest))
);
gulp.task('pug', () =>
  gulp
    .src(config.watch.pug)
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest(config.dev.html.dest))
    .pipe(browserSync.stream())
);
