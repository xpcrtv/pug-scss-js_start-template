const gulp = require('gulp');
const config = require('../config');

gulp.task('fonts:build', (done) => {
  gulp.src(config.dist.fonts.src).pipe(gulp.dest(config.dist.fonts.dest));
  done();
});
