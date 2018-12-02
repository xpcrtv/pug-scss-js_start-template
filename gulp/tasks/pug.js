const gulp = require('gulp');
const pug = require('gulp-pug');
const browserSync = require('browser-sync');

// gulp.task('pug:build', function() {
//   return gulp
//     .src('./dev/pug/*.pug')
//     .pipe(
//       pug({
//         pretty: true
//       })
//     )
//     .pipe(gulp.dest('./prod/'));
// });

const pugTask = () =>
  gulp
    .src('./dev/pug/*.pug')
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest('./dev/'))
    .pipe(browserSync.stream());
module.exports = pugTask;
