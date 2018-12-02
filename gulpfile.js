const gulp = require('./gulp')(['serve']);

gulp.task('default', gulp.series(['serve']));
