
/*

	gulp start -> start gulp with open in new tab browser
	gulp -> (default) start gulp WITHOUT open in new tab browser
	gulp folder -> create folder with project
	gulp zip -> create zip with project (WRONG WORKING ON MAC OS !!!)

*/


const { src, dest, watch, parallel, series } = require('gulp');


const scss			= require('gulp-sass')(require('sass')),
	  fs			= require('fs'),
	  concat		= require('gulp-concat'),
	  avif			= require('gulp-avif'),
	  webp			= require('gulp-webp'),
	  imagemin		= require('gulp-imagemin'),
	  newer			= require('gulp-newer'),
	  beautify		= require('gulp-beautify'),
	  browserSync	= require('browser-sync').create(),
	  uglify		= require('gulp-uglify-es').default,
	  autoprefixer	= require('gulp-autoprefixer'),
	  del			= require('del'),
	  include		= require('gulp-file-include'),
	  cssbeautify	= require('gulp-cssbeautify'),
	  minCSS		= require('gulp-cssmin'),
	  mediaGroup	= require('gulp-group-css-media-queries'),
	  ttf2woff		= require('gulp-ttf2woff'),
	  ttf2woff2		= require('gulp-ttf2woff2'),
	  zipArchive	= require('gulp-zip');





function cleanDist() {
	return del('dist')
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- <Live reload> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function browsersync() {
	browserSync.init({
		server: {
			baseDir: 'dist/',
		},
		notify: false,
		open: false,
	})
}

function browsersyncStart() {
	browserSync.init({
		server: {
			baseDir: 'dist/',
		},
		notify: false,
	})
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- </Live reload> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- <images> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function images() {
	return src(['app/img/**/*.*', '!app/img/**/*.webp', '!app/img/**/*.svg'])
	.pipe(newer('dist/img'))
	.pipe(avif({ quality: 70 }))

	.pipe(src('app/img/**/*.*'))
	.pipe(newer('dist/img'))
	.pipe(webp())

	.pipe(src('app/img/**/*.*'))
	.pipe(newer('dist/img'))
	.pipe(imagemin())


	.pipe(dest('dist/img'))
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- </images> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- <Scripts> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function scriptsLib() {
	return src([
		'node_modules/@splidejs/splide/dist/js/splide.min.js', // Слайдер | npm i @splidejs/splide --save | https://splidejs.com/guides/getting-started/
		//'node_modules/@splidejs/splide-extension-auto-scroll/dist/js/splide-extension-auto-scroll.min.js', // autoscroll для слайдера | $ npm install @splidejs/splide-extension-auto-scroll --save | https://splidejs.com/guides/getting-started/
		//'node_modules/@splidejs/splide-extension-grid/dist/js/splide-extension-grid.min.js', // Сетка для слайдера | npm install @splidejs/splide-extension-grid --save | https://splidejs.com/guides/getting-started/
		//'node_modules/vanilla-lazyload/dist/lazyload.min.js', // Lazyload img | npm i vanilla-lazyload --save | https://www.npmjs.com/package/vanilla-lazyload
		//'node_modules/smoothscroll-polyfill/dist/smoothscroll.min.js', // Полифил для window.scroll() | npm i smoothscroll-polyfill --save
		'node_modules/clipboard/dist/clipboard.min.js', // Копирование в буфер обмена | npm i clipboard --save | https://www.npmjs.com/package/clipboard
		'node_modules/aos/dist/aos.js', // Анимация | npm i aos --save | https://www.npmjs.com/package/aos
		'node_modules/gsap/dist/gsap.min.js', // GSAP (Animation) | npm i gsap --save | https://www.npmjs.com/package/gsap
		'node_modules/gsap/dist/ScrollTrigger.min.js', // GSAP (Animation) | npm i gsap --save | https://www.npmjs.com/package/gsap
		//'node_modules/split-type/umd/index.min.js', // split text | npm i split-type --save | https://www.npmjs.com/package/split-type
		//'app/js/ScrollSmoother.min.js', // GSAP
		//'node_modules/@studio-freight/lenis/dist/lenis.min.js', // smooth scroll | npm i @studio-freight/lenis --save | https://github.com/studio-freight/lenis
		//'node_modules/@barba/core/dist/barba.umd.js', // smooth transitions between pages | npm install @barba/core --save | https://barba.js.org/docs/getstarted/intro/
		'node_modules/slim-select/dist/slimselect.min.js', // Select | npm i slim-select --save | https://www.npmjs.com/package/slim-select
		//'node_modules/sticky-js/dist/sticky.min.js' // Sticky | npm i sticky-js --save | https://www.npmjs.com/package/sticky-js
		//'node_modules/nouislider/dist/nouislider.min.js', // Кастомный input[range] | npm i nouislider --save | https://www.npmjs.com/package/nouislider
		'node_modules/simplebar/dist/simplebar.min.js', // Кастомный скролбар | npm i simplebar --save | https://www.npmjs.com/package/simplebar
		//'node_modules/fslightbox/index.js', // Галерея | npm i fslightbox --save | https://www.npmjs.com/package/fslightbox
		//'node_modules/chart.js/dist/chart.umd.js', // График | npm i chart.js --save | https://www.npmjs.com/package/chart.js
		'node_modules/masonry-layout/dist/masonry.pkgd.min.js', // График | npm i chart.js --save | https://www.npmjs.com/package/chart.js
		//'node_modules/vanillajs-datepicker/js/i18n/locales/ru.js', // Выбор даты | npm install --save vanillajs-datepicker | https://mymth.github.io/vanillajs-datepicker/#/
		'node_modules/vanillajs-datepicker/dist/js/datepicker.min.js', // Выбор даты | npm install --save vanillajs-datepicker | https://mymth.github.io/vanillajs-datepicker/#/
		//'node_modules/swiper/swiper-bundle.min.js', // Слайдер
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(dest('dist/js'))
	.pipe(browserSync.stream())
}

function accountScriptsLib() {
	return src([
		//'node_modules/@splidejs/splide/dist/js/splide.min.js', // Слайдер | npm i @splidejs/splide --save | https://splidejs.com/guides/getting-started/
		//'node_modules/@splidejs/splide-extension-auto-scroll/dist/js/splide-extension-auto-scroll.min.js', // autoscroll для слайдера | $ npm install @splidejs/splide-extension-auto-scroll --save | https://splidejs.com/guides/getting-started/
		//'node_modules/@splidejs/splide-extension-grid/dist/js/splide-extension-grid.min.js', // Сетка для слайдера | npm install @splidejs/splide-extension-grid --save | https://splidejs.com/guides/getting-started/
		//'node_modules/vanilla-lazyload/dist/lazyload.min.js', // Lazyload img | npm i vanilla-lazyload --save | https://www.npmjs.com/package/vanilla-lazyload
		//'node_modules/smoothscroll-polyfill/dist/smoothscroll.min.js', // Полифил для window.scroll() | npm i smoothscroll-polyfill --save
		'node_modules/clipboard/dist/clipboard.min.js', // Копирование в буфер обмена | npm i clipboard --save | https://www.npmjs.com/package/clipboard
		//'node_modules/aos/dist/aos.js', // Анимация | npm i aos --save | https://www.npmjs.com/package/aos
		//'node_modules/gsap/dist/gsap.min.js', // GSAP (Animation) | npm i gsap --save | https://www.npmjs.com/package/gsap
		//'node_modules/gsap/dist/ScrollTrigger.min.js', // GSAP (Animation) | npm i gsap --save | https://www.npmjs.com/package/gsap
		//'node_modules/split-type/umd/index.min.js', // split text | npm i split-type --save | https://www.npmjs.com/package/split-type
		//'app/js/ScrollSmoother.min.js', // GSAP
		//'node_modules/@studio-freight/lenis/dist/lenis.min.js', // smooth scroll | npm i @studio-freight/lenis --save | https://github.com/studio-freight/lenis
		//'node_modules/@barba/core/dist/barba.umd.js', // smooth transitions between pages | npm install @barba/core --save | https://barba.js.org/docs/getstarted/intro/
		'node_modules/slim-select/dist/slimselect.min.js', // Select | npm i slim-select --save | https://www.npmjs.com/package/slim-select
		//'node_modules/sticky-js/dist/sticky.min.js' // Sticky | npm i sticky-js --save | https://www.npmjs.com/package/sticky-js
		//'node_modules/nouislider/dist/nouislider.min.js', // Кастомный input[range] | npm i nouislider --save | https://www.npmjs.com/package/nouislider
		'node_modules/simplebar/dist/simplebar.min.js', // Кастомный скролбар | npm i simplebar --save | https://www.npmjs.com/package/simplebar
		//'node_modules/fslightbox/index.js', // Галерея | npm i fslightbox --save | https://www.npmjs.com/package/fslightbox
		'node_modules/chart.js/dist/chart.umd.js', // График | npm i chart.js --save | https://www.npmjs.com/package/chart.js
		//'node_modules/masonry-layout/dist/masonry.pkgd.min.js', // График | npm i chart.js --save | https://www.npmjs.com/package/chart.js
		//'node_modules/vanillajs-datepicker/js/i18n/locales/ru.js', // Выбор даты | npm install --save vanillajs-datepicker | https://mymth.github.io/vanillajs-datepicker/#/
		'node_modules/vanillajs-datepicker/dist/js/datepicker.min.js', // Выбор даты | npm install --save vanillajs-datepicker | https://mymth.github.io/vanillajs-datepicker/#/
		//'node_modules/swiper/swiper-bundle.min.js', // Слайдер
	])
	.pipe(concat('account-libs.min.js'))
	.pipe(uglify())
	.pipe(dest('dist/js'))
	.pipe(browserSync.stream())
}

function scripts() {
	return src('app/js/*.js')
	.pipe(uglify())
	.pipe(dest('dist/js'))
	.pipe(browserSync.stream())
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- </Scripts> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- <HTML> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function htmlCompilation() {
	return src(['app/*.html'])
	.pipe(include())
	.pipe(beautify.html({ indent_size: 1, indent_char: "	" }))
	.pipe(dest('dist'))
	.pipe(browserSync.stream())
}

function htmlComponents() {
	return src('app/html/**/_*.html')
	.pipe(include())
	.pipe(htmlCompilation())
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- </HTML> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- <Styles> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function styles() {
	return src('app/scss/style.scss')
		.pipe(scss({outputStyle: 'compressed'}))
		.pipe(mediaGroup())
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 1 version'],
			cascade: false
		}))
		.pipe(minCSS())
		.pipe(concat('style.min.css'))
		.pipe(dest('dist/css'))
		.pipe(browserSync.stream())
}

function accountStyles() {
	return src('app/scss/account-style.scss')
		.pipe(scss({outputStyle: 'compressed'}))
		.pipe(mediaGroup())
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 1 version'],
			cascade: false
		}))
		.pipe(minCSS())
		.pipe(concat('account-style.min.css'))
		.pipe(dest('dist/css'))
		.pipe(browserSync.stream())
}

function stylesLib() {
	return src([
		'node_modules/normalize.css/normalize.css',
		'node_modules/@splidejs/splide/dist/css/splide.min.css', // Слайдер
		//'node_modules/@splidejs/splide/dist/css/splide-core.min.css', // Слайдер
		//'node_modules/swiper/swiper-bundle.min.css', // Слайдер
		'node_modules/slim-select/dist/slimselect.css', // Select
		'node_modules/aos/dist/aos.css', // Анимация
		//'node_modules/nouislider/dist/nouislider.css', // Кастомный input[range]
		'node_modules/simplebar/dist/simplebar.min.css', // Кастомный скролбар
		'node_modules/vanillajs-datepicker/dist/css/datepicker.min.css',
	])
	.pipe(concat('_libs.scss'))
	.pipe(dest('app/scss'))
}

function accountStylesLib() {
	return src([
		'node_modules/normalize.css/normalize.css',
		//'node_modules/@splidejs/splide/dist/css/splide.min.css', // Слайдер
		//'node_modules/@splidejs/splide/dist/css/splide-core.min.css', // Слайдер
		//'node_modules/swiper/swiper-bundle.min.css', // Слайдер
		'node_modules/slim-select/dist/slimselect.css', // Select
		//'node_modules/aos/dist/aos.css', // Анимация
		//'node_modules/nouislider/dist/nouislider.css', // Кастомный input[range]
		'node_modules/simplebar/dist/simplebar.min.css', // Кастомный скролбар
		'node_modules/vanillajs-datepicker/dist/css/datepicker.min.css',
	])
	.pipe(concat('_account-libs.scss'))
	.pipe(dest('app/scss'))
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- </Styles> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- <Fonts> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function ttf2woff2Convert() {
	return src('app/fonts/*.ttf')
		.pipe(ttf2woff2())
		.pipe(dest('dist/css'))
}

function fonts() {
	return src('app/css/*.woff2')
		.pipe(dest('dist/css'))
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- </Fonts> -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function json() {
	return src('app/json/*.json')
		.pipe(dest('dist/json'))
}

function video() {
	return src('app/video/*')
		.pipe(dest('dist/video'))
}

function audio() {
	return src('app/audio/*')
		.pipe(dest('dist/audio'))
}

let package = fs.readFileSync('package.json'),
	name;

	package = JSON.parse(package);
	name = package.name;

function delFolder() {
	return del(`${name}`)
}

function createFolder() {
	return src(['./**', '!./node_modules/**', '!./package-lock.json', `!./${name}.zip`])
		.pipe(dest(`./${name}`))
}

function createZip() {
	return src(`./${name}/**`)
		.pipe(zipArchive(`${name}.zip`))
		.pipe(dest(`./`))
}

function zipDel() {
	return del(`${name}`);
}

function sprites() {
	return src(`app/img/sprites.svg`)
		.pipe(dest(`dist/img`))
}

function watching() {
	watch(['app/scss/**/*.scss'], series(styles, accountStyles));
	watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
	watch(['app/json/*.json'], json);
	watch(['app/video/*.*'], video);
	watch(['app/audio/*.*'], audio);
	watch(['app/img/sprites.svg'], sprites);
	watch(['app/*.html'], htmlCompilation);
	watch(['app/html/**/_*.html'], htmlComponents);
}

exports.images = images;
exports.styles = styles;
exports.accountStyles = accountStyles;
exports.watching = watching;
exports.browsersyncStart = browsersyncStart;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.scriptsLib = scriptsLib;
exports.accountScriptsLib = accountScriptsLib;
exports.cleanDist = cleanDist;
exports.stylesLib = stylesLib;
exports.accountStylesLib = accountStylesLib;
exports.ttf2woff2Convert = ttf2woff2Convert;
exports.fonts = fonts;
exports.htmlComponents = htmlComponents;
exports.htmlCompilation = htmlCompilation;
exports.createFolder = createFolder;
exports.delFolder = delFolder;
exports.createZip = createZip;
exports.zipDel = zipDel;

exports.fonts = series(ttf2woff2Convert, fonts);
exports.folder = series(delFolder, createFolder);
exports.zip = series(createFolder, createZip, zipDel);
exports.start = parallel(stylesLib, styles, accountStylesLib, accountStyles, watching, scripts, scriptsLib, accountScriptsLib, htmlCompilation, json, sprites, browsersyncStart);
exports.default = parallel(stylesLib, styles, accountStylesLib, accountStyles, watching, scripts, scriptsLib, accountScriptsLib, htmlCompilation, json, sprites, browsersync);
