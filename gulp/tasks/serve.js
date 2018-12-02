const gulp = require('gulp');
const browserSync = require('browser-sync');

const { reload } = browserSync;
// Static server
const serve = () => {
  browserSync.create();
  browserSync.init({
    server: {
      baseDir: './dev',
      browser: 'chrome',
      notify: false
    }
  });
  gulp.watch('./dev/pug/**/*.pug', gulp.task('pug'), reload);
};

module.exports = serve;
