const gulp = require('gulp');
const browserSync = require('browser-sync');

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
};

gulp.task('serve', serve);

module.exports = serve;
