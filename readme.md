<h1>Стартовый шаблон для верстки</h1>

<p>Стартовый шаблон для верстки, с использованием <a href="https://pugjs.org/api/getting-started.html" title="pugjs.org">Pug</a>-шаблонизатора, <a href="http://sass-lang.com/" title="sass-lang.com">SASS</a>-препроцессора и js.</p>
<p>Сборка осуществляется с помощью <a href="http://gulpjs.com/" title="gulpjs.com">Gulp</a></p>
<hr>
<h2>Структура:</h2>
<ul>
	<li><b>dev/..</b> - Рабочая директория
		<ul>
			<li><b>assets/..</b> - Директория с обработанными файлами, всеми изображениями, спрайтами, а также шрифтами</li>
			<li><b>pug/..</b> - Директория с pug-файлами</li>
			<li><b>scripts/..</b> - Директория со всеми скриптами проекта</li>
			<li><b>styles/..</b> - Директория с файлами стилей проекта в формате ".scss"</li>
			<li><b>.htaccess</b> - Конфигурационный файл веб-сервера </li>
			<li><b>index.html</b> - Стартовая страница</li>
		</ul>
	</li>
	<li><b>prod/..</b> - Директория с подготовленными на production файлами</li>
	<li><b>.csscomb.json</b> - Файл с конфигурацией плагина <a href="https://github.com/csscomb/csscomb.js" title="github.com/csscomb/csscomb.js">СSSComb</a></li>
	<li><b>gulpfile.js</b> - Файл с конфигурацией <a href="http://gulpjs.com/" title="gulpjs.com">Gulp</a></li>
	<li><b>package.json</b> - Файл с информацией о проекте и всех использованных зависимостях</li>

</ul>
<hr>
<h2>Gulp задачи (таски):</h2>
<h3>Основные:</h3>
<ul>
	<li><b>gulp</b>: Запуск задачи по-умолчанию. По-умолчанию запускает "prepare" и "server"</li>
	<li><b>gulp build</b>: Сборка проекта. Последовательно выполняет "clean", "sprite", "img" и "replace";</li>
	<li><b>gulp deploy</b>: Выгрузка файлов по ftp на сервер ;</li>
	<li><b>gulp zip</b>: Архивация иректории с подготовленными на production файлами;</li>
	<li><b>gulp zipall</b>: Архивация проекта целиком;</li>
</ul>
<h3>Вспомогательные:</h3>
<ul>
	<li><b>gulp server</b>: Запуск browserSync, и слежения за изменениями в файлах;</li>
	<li><b>gulp img</b>: Обработка изображений и перенос их из development-папки в production;</li>
	<li><b>gulp sprite</b>: Генерация спрайта;</li>
	<li><b>gulp html</b>: Преобразование pug-файлов в html-файлы;</li>
	<li><b>gulp css</b>: Преобразование scss-файорв в css c оптимизацией и минификацией;</li>
	<li><b>gulp js</b>: Задача для объединения и минификации JS-файлов;</li>
	<li><b>gulp clearcache</b>: Очистка кэша;</li>
	<li><b>gulp clean</b>: Очистка папки "prod/" путем удаления их нее всех файлов;</li>
	<li><b>gulp prepare</b>: Подготовка структуры;</li>
	<li><b>gulp replace</b>: Перенос html,css,js,шрифтов и остальных необходимых файлов в директорию "prod/";</li>
</ul>


