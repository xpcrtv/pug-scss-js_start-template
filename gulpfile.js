const gulp = require('./gulp')(['serve', 'pug']);

gulp.task('default', gulp.series(['serve', 'pug']));
