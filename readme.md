# Стартовый шаблон для верстки

Стартовый шаблон для верстки, с использованием [Pug](https://pugjs.org/api/getting-started.html 'pugjs.org')-шаблонизатора, [SASS](http://sass-lang.com/ 'sass-lang.com')-препроцессора и js.

Сборка осуществляется с помощью [Gulp](http://gulpjs.com/ 'gulpjs.com')

---

## Gulp задачи (таски):

### Основные:

- **npm start**: Запуск сервера для верстки
- **npm build**: Сборка проекта.

---

## Структура:

- **dev/..** - Рабочая директория
  - **assets/..** - Директория с обработанными файлами, всеми изображениями, спрайтами, а также шрифтами
  - **pug/..** - Директория с pug-файлами
  - **scripts/..** - Директория со всеми скриптами проекта
  - **styles/..** - Директория с файлами стилей проекта в формате ".scss"
  - **.htaccess** - Конфигурационный файл веб-сервера
  - **index.html** - Стартовая страница
- **dist/..** - Директория с подготовленными на production файлами
- **gulp/..** - Директория с конфигурационным файлом и фалами тасков
- **.csscomb.json** - Файл с конфигурацией плагина [СSSComb](https://github.com/csscomb/csscomb.js 'github.com/csscomb/csscomb.js')
- **gulpfile.js** - Файл с конфигурацией [Gulp](http://gulpjs.com/ 'gulpjs.com')

---

### Список зависимостей:

[Gulp-babel](https://github.com/babel/gulp-babel),
[browser-sync](https://github.com/Browsersync/browser-sync),
[del](https://github.com/sindresorhus/del),
[eslint](https://github.com/eslint/eslint),
[eslint-config-airbnb-base](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base),
[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier),
[eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import),
[eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier),
[gulp](https://gulpjs.com/),
[gulp-autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer),
[gulp-babel](https://github.com/babel/gulp-babel),
[gulp-csscomb](https://github.com/koistya/gulp-csscomb),
[gulp-csso](https://github.com/ben-eb/gulp-csso),
[gulp-htmlmin](https://github.com/jonschlinkert/gulp-htmlmin),
[gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin),
[gulp-pug](https://github.com/gulp-community/gulp-pug),
[gulp-rename](https://github.com/hparra/gulp-rename),
[gulp-sass](https://github.com/dlmanning/gulp-sass),
[gulp-uglify](https://github.com/terinjokes/gulp-uglify/),
[gulp.spritesmith](https://github.com/twolfson/gulp.spritesmith),
[node-sass](https://github.com/sass/node-sass),
[prettier](https://github.com/prettier/prettier),
[require-dir](https://github.com/aseemk/requireDir)
