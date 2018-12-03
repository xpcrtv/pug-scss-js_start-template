const gulp = require('gulp');
const browserSync = require('browser-sync');
const config = require('../config');

const { reload } = browserSync;

gulp.task('server', () => {
  browserSync.create();
  browserSync.init({
    server: {
      baseDir: config.dirs.dev,
      browser: 'chrome',
      notify: false
    }
  });
  gulp.watch(config.watch.css, gulp.task('sass'));
  gulp.watch(config.watch.pug, gulp.task('pug'));
  gulp.watch(config.watch.js, gulp.task('scripts'));
  gulp.watch(config.watch.html).on('change', reload);
});
