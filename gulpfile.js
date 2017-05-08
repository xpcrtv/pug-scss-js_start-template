'use strict';
var gulp          = require('gulp'),                // Сам Gulp
    gutil         = require('gulp-util'),           // Вспомогательные функции Gulp
    cache         = require('gulp-cache'),          // Кеширование изображений
    notify        = require("gulp-notify"),         // Плагин для различных уведомлений
    plumber       = require('gulp-plumber'),        // Отслеживание ошибок 
    sass          = require('gulp-sass'),           // Sass/Scss
    autoprefixer  = require('gulp-autoprefixer'),   // Автопрефиксы для css
    csso          = require('gulp-csso'),           // Минификация CSS-файлов
    sourcemaps    = require('gulp-sourcemaps'),     // Генерация sourcemap
    concat        = require('gulp-concat'),         // Объединение файлов
    pug           = require('gulp-pug'),            // Pug
    rename        = require('gulp-rename'),         // Переименование файлов
    imagemin      = require('gulp-imagemin'),       // Оптимизация изображений
    browserSync   = require('browser-sync'),        // Сервер
    uglify        = require('gulp-uglify'),         // Минификация JS-файлов
    del           = require('del'),                 // Удаление, очистка содержимого папок
    ftp           = require('vinyl-ftp'),           // Отправка файлов через Ftp
    spritesmith   = require('gulp.spritesmith'),    // Создание спрайтов
    zip           = require('gulp-zip'),            // Архивировация файлов и директорий
    runSequence   = require('run-sequence'),        // Последовательный запуск задач
    csscomb       = require('gulp-csscomb');        // Форматирование css-стилей

// Переменные путей, задданых для использования в задачах
var paths = {

  // Основные директории
  dirs: {
    dev: './dev', // Рабочая директория с исходниками
    dist: './prod' // Директория с подготовленными на production файлами
  },

  // Пути для задач "html", "css", "js"
  dev: {
    // Пути для обработки pug/html-файлов
    html: {
      src: './dev/pug/*.pug', // Pug-файлы в папке "pug", кроме файлов в дочерних директориях.
      dest: './dev' // Директория в которую будут выведены рузультаты работы задачи "html"
    },
    // Пути для обработки scss/css-файлов
    css: {
      src: './dev/styles/main.scss', // Файл который будет обработан задачей "css"
      dest: './dev/assets/css' // Директория в которую будут выведены рузультаты работы задачи "css"
    },
    // Пути для обработки js-файлов
    js: {
      src: ['./dev/scripts/libs/jquery.min.js', './dev/scripts/**/*.js'], // Файл jquery.min.js и все остальные js-файлы в директории "scripts"
      dest: './dev/assets/js' // Директория в которую будут выведены рузультаты работы задачи "js"
    },
  },

  // Пути отслеживаемых директорий и файлов в задаче "server"
  watch: {
    pug: './dev/pug/**/*.pug', // Все pug-файлы в директории "pug/"
    scss: './dev/styles/**/*.scss', // Все scss-файлы в директории "scss/"
    js: './dev/scripts/**/*.js', // Все js-файлы в директории "scripts/"
    img: './dev/assets/img/**/*.*' // Все изображения в директории "assets/img/"
  },

  // Пути для задачи "img"
  img: {
    src: './dev/assets/img/**/*', // Все файлы в директории "assets/img"
    dest: './prod/assets/img' // Директория в которую будут выведены рузультаты работы задачи "img"
  },
  // Пути для задачи "sprite"
  sprites: {
    src: './dev/assets/img/sprites/*.*', // Все файлы в директории "assets/img/sprites"
    srcRetina: './dev/assets/img/sprites/**/*@2x.*', // Все файлы в директории "assets/img/sprites" содержащие в имени "@2x"
    dest: './dev/assets/img', // Директория в которую будет выведен рузультат работы (спрайт) задачи "sprite"
    destStyle: './dev/style' // Директория в которую будуе выведен рузультат работы (файл стилей) задачи "sprite"
  },

  // Пути для задачи "public"
  prod: {
    html: {
      src: './dev/*.html', // Все html-файлы в рабочей директории
      dest: './prod' //Директория выгрузки html-файлов
    },
    css: {
      src: './dev/assets/css/*.css', // Все css-файлы в директории "assets/css", без учета фалов в дочерних директориях
      dest: './prod/assets/css' //Директория выгрузки css-файлов
    },
    js: {
      src: './dev/assets/js/*.js', // Все js-файлы в директории "assets/js", без учета фалов в дочерних директориях
      dest: './prod/assets/js' //Директория выгрузки js-файлов
    },
    fonts: {
      src: './dev/assets/fonts/**/*.*', // Все файлы шрифтов в директории "assets/fonts"
      dest: './prod/assets/fonts' // Директория выгрузки шрифтов
    },
    other: {
      src: ['./dev/*.*', '!./dev/*.html'], // Все файлы в рабочей директории кроме html-файлов
      dest: './prod', // Директория выгрузки файлов
    }
  },
  // Пути для задач "zip" и "zipAll"
  zip: {
    srcAll: ['./**/*', '!./node_modules/**/*', '!./node_modules'], // Все файлы в корневой директории, кроме node_modules 
    srcProd: './prod/**', // Все файлы в директории "prod/"
    destAll: './', // Директория выгрузки архива задачи "zipAll"
    destProd: './' // Директория выгрузки архива задачи "zip"
  },

  // Пути для задачи "deploy"
  deploy: {
    src: ['prod/**', 'prod/.htaccess'], // Все файлы в директории "prod/"
    dest: '/path/to/folder/on/server' // Адрес директории в которую будут выгружаться файлы
  }
}

browserSync.create();
var reload = browserSync.reload;
//  Запуск browserSync, и слежения за изменениями в файлах 
gulp.task('server', function () {
  browserSync.init({
    server: paths.dirs.dev, //Рабоччая директория
    browser: 'chrome', //Запуск браузера Google Chrome
    notify: false //Не отображать уведомления browserSync в браузере
  });
  gulp.watch(paths.watch.pug, ['html']); // Cлежение за Pug-файлами
  gulp.watch(paths.watch.scss, ['css']); // Cлежение за Scss-файлами
  gulp.watch(paths.watch.js, ['js']); // Cлежение за JS-файлами
  gulp.watch(paths.watch.img, ['img']); // Cлежение за файлами изображений
  gulp.watch('*.html').on('change', reload); // Перезагрузка браузера при изменеии
});

// Преобразование pug-файлов в html-файлы
gulp.task('html', function () {
  return gulp.src(paths.dev.html.src) // Источник pug-файлов
    .pipe(plumber()) // Обработка ошибок при работе плагина pug
    .pipe(pug({
      pretty: true
    })) // преобразование pug-файлов в html-файлы
    .pipe(gulp.dest(paths.dev.html.dest)) // Директория в которую сохраняется результат работы задачи
    .pipe(browserSync.stream()); // Работа метода stream без опций
});

// Преобразование scss-файорв в css c оптимизацией и минификацией:
gulp.task('css', function () {
  return gulp.src(paths.dev.css.src) // Источник scss-файла(ов)
    .pipe(plumber()) // Обработка ошибок при работе плагина sass
    .pipe(sourcemaps.init()) // Инициализация sourcemaps
    .pipe(sass()).on("error", notify.onError()) // Преобразование scss-файлов в css, вывод уведомления в случае ошибки
    .pipe(autoprefixer()) // Добавление необходимых браузерных префиксов
    .pipe(rename({
      suffix: '.min'
    })) // Переименование файла(ов) с добавлением в название .min (Например: main.css в main.min.css)
    .pipe(csscomb()) // Форматирование, сортировка стилей
    .pipe(csso()) // Минификация файла(ов), без опций
    .pipe(sourcemaps.write("./")) // Добавление sourcemap в файл
    .pipe(gulp.dest(paths.dev.css.dest)) // Директория в которую сохраняется результат работы задачи
    .pipe(browserSync.stream()); // Работа метода stream без опций
});

// Таск для объединения и минификации JS-файлов:
gulp.task('js', function () {
  return gulp.src(paths.dev.js.src) //Источник js-файла(ов)
    .pipe(plumber()) // Обработка ошибок при работе плагинов обработки js-файлов
    .pipe(sourcemaps.init()) // Инициализация sourcemaps
    .pipe(concat('scripts.min.js')) // Объединение js-файлов в файл с названием scripts.min.js
    .pipe(uglify()) // Минификация js-файла(ов)
    .pipe(sourcemaps.write()) // Добавление sourcemap в файл
    .pipe(gulp.dest(paths.dev.js.dest)) // Директория в которую сохраняется результат работы задачи
    .pipe(browserSync.stream()); // Работа метода stream без опций
});

// Обработка изображений и перенос их из development-папки в production:
gulp.task('img', function () {
  return gulp.src(paths.img.src) // Источник файлов изображений
    .pipe(cache(imagemin())) // Оптимизация изображений с их кэшированием
    .pipe(gulp.dest(paths.img.dest)); // Директория в которую сохраняется результат работы задачи
});

//Генерация спрайта 
gulp.task('sprite', function () {
  var spriteData =
    gulp.src(paths.sprites.src) // Источник изображений для спрайта
    .pipe(plumber()) // Обработка ошибок при работе плагинов обработки js-файлов
    .pipe(spritesmith({
      retinaSrcFilter: [paths.sprites.srcRetina], // Все png-файлы содержашие "@2x" в названии
      imgName: 'sprite.png', // Название итогового файла спрайта 
      retinaImgName: 'sprite@2x.png', // Название итогового файла спрайта для retina-экранов 
      cssName: '_sprite.scss', // Название итогового файла стилей
      cssFormat: 'scss', // Формат файла содержащего стили
      padding: 10, // Отступы между изображениями в файле прайта
      algorithm: 'binary-tree', // Cпособ сортировки изображений
      cssVarMap: function (sprite) {
        sprite.name = 's-' + sprite.name;
      } // Генерация названий css-переменных в файле со стилями
    }));

  spriteData.img.pipe(gulp.dest(paths.sprites.dest)); // Директория, в которую сохраняется спрайт
  spriteData.css.pipe(gulp.dest(paths.sprites.destStyle)); // Директория, в которую сохраняется файл стилей
});

// Архивация проекта целиком
gulp.task('zipall', function () {
  gulp.src(paths.zip.srcAll) // Источник файлов для архивации
    .pipe(zip('archive.zip')) // Архивация в файл с указанным названием
    .pipe(gulp.dest(paths.zip.destAll)) // Директория, в которую сохраняется итоговый архив
});

// Архивация иректории с подготовленными на production файлами
gulp.task('zip', function () {
  gulp.src(paths.zip.srcProd) // Источник файлов для архивации
    .pipe(zip('prod.zip')) // Архивация в файл с указанным названием
    .pipe(gulp.dest(paths.zip.destProd)) // Директория, в которую сохраняется итоговый архив
});

// Выгрузка файлов по ftp на сервер 
gulp.task('deploy', function () {

  var conn = ftp.create({
    host: 'mywebsite.tld', //ftp-хост
    user: 'me', // ftp-пользователь
    password: 'mypass', // ftp-пароль
    parallel: 10, // количество одновременных операций
    log: gutil.log // функция лога
  });

  var globs = paths.deploy.src; // Выгружаемые файлы и директории
  return gulp.src(globs, {
      buffer: false // Буферизация файлов
    })
    .pipe(conn.dest(paths.deploy.dest)); // Директория в которую будут выгружены файлы

});

// Очистка кэша
gulp.task('clearcache', function () {
  return cache.clearAll();
});

// Очистка папки "prod/" путем удаления их нее всех файлов
gulp.task('clean', function () {
  return del(paths.dirs.dist);
});

//Подготовка структуры
gulp.task('prepare', ['html', 'css', 'js']);


//Перенос html,css,js,шрифтов и остальных необходимых файлов в директорию "prod/"
gulp.task('replace', function () {
  var htmlProd = gulp.src(paths.prod.html.src)
    .pipe(gulp.dest(paths.prod.html.dest)); // Перенос html-файлов
  var cssProd = gulp.src(paths.prod.css.src)
    .pipe(gulp.dest(paths.prod.css.dest)); // Перенос css-файлов
  var jsProd = gulp.src(paths.prod.js.src)
    .pipe(gulp.dest(paths.prod.js.dest)); // Перенос js-файлов
  var fontsProd = gulp.src(paths.prod.fonts.src)
    .pipe(gulp.dest(paths.prod.fonts.dest)); // Перенос шрифтов
  var otherProd = gulp.src(paths.prod.other.src)
    .pipe(gulp.dest(paths.prod.other.dest)); // Перенос остальных файлов
});

// Сборка проекта. Последовательно выполняет "clean", "sprite", "img" и "replace"
gulp.task('build', function (callback) {
  runSequence('clean', 'sprite', 'img', 'replace');
});

// Задача по-умолчанию, при запуске которой будут запущены указанные задачи
gulp.task('default',  function (callback) {
  runSequence('prepare', 'server');
});
