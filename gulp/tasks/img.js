const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const config = require('../config');

gulp.task('img:build', () =>
  gulp
    .src(config.dist.img.src)
    .pipe(imagemin())
    .pipe(gulp.dest(config.dist.img.dest))
);
