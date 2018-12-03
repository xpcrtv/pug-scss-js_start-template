const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const config = require('../config');

gulp.task('html:build', () =>
  gulp
    .src(config.dist.html.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(config.dist.html.dest))
);
