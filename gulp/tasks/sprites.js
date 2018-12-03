const gulp = require('gulp');
const spritesmith = require('gulp.spritesmith');
const config = require('../config');

gulp.task('sprites', (done) => {
  const spriteData = gulp.src(config.sprites.src).pipe(
    spritesmith({
      retinaSrcFilter: [config.sprites.srcRetina],
      imgName: 'sprite.png',
      retinaImgName: 'sprite@2x.png',
      cssName: '_sprite.scss',
      padding: 10,
      algorithm: 'binary-tree',
      cssVarMap: (sprite) => {
        /* eslint-disable no-param-reassign */
        sprite.name = `s- + ${sprite.name}`;
      },
      imgPath: config.sprites.imgPath,
      retinaImgPath: config.sprites.retinaImgPath
    })
  );

  spriteData.img.pipe(gulp.dest(config.sprites.dest));
  spriteData.css.pipe(gulp.dest(config.sprites.destStyle));
  done();
});
