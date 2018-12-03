const gulp = require('gulp');

gulp.task('default', (done) =>
  gulp.series('server', 'pug', 'sass', 'scripts', 'sprites')(done)
);
