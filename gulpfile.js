const {src, dest, watch, series, task, parallel} = require('gulp'),
	  sass = require('gulp-sass'),
	  sync = require("browser-sync"),
	  prefixer = require('gulp-autoprefixer'),
	  browserSync = require('browser-sync').create();

var path = {
	src: {
		html: 'src/html/**/*.html',
		style: 'src/styles/index.scss',
		js: 'src/js/**/*.js',
		image: 'src/img/**/*.*',
		fonts: 'src/fonts/*.*'
	},
	dist: {
		html: 'dist/html/',
		style: 'dist/styles/',
		js: 'dist/js/',
		image: 'dist/img/',
		fonts: 'dist/fonts/'
	},
	watch: {
		html: 'src/html/**/*.html',
		style: 'src/styles/**/*.scss',
		js: 'src/js/**/*.js',
		image: 'src/img/**/*.*',
		fonts: 'src/fonts/*.*'
	}
};

task('webserver', function(){
	browserSync.init({
		server: {
		baseDir: "./dist",
			index: './html/index.html'
		},
		tunnel: true,
		host: 'localhost',
		port: 3000
	});
})

task('destHTML', function(){
	return src(path.src.html)
		.pipe(dest(path.dist.html))
		.pipe(browserSync.stream());
});

task('destStyles', function(){
	return src(path.src.style)
		.pipe(sass())
		.pipe(prefixer())
		.pipe(dest(path.dist.style))
		.pipe(browserSync.stream());
});

task('destScripts', function(){
	return src(path.src.js)
		.pipe(dest(path.dist.js))
		.pipe(browserSync.stream());
});

task('destImages', function(){
	return src(path.src.image)
		.pipe(dest(path.dist.image))
		.pipe(browserSync.stream());
});

task('destFonts', function(){
	return src(path.src.fonts)
		.pipe(dest(path.dist.fonts))
		.pipe(browserSync.stream());
});

task('watchHTML', function(){
	watch(path.watch.html, series('destHTML'));
});

task('watchStyles', function(){
	watch(path.watch.style, series('destStyles'));
});

task('watchScripts', function(){
	watch(path.watch.js, series('destScripts'));
});

task('watchImages', function(){
	watch(path.watch.image, series('destImages'));
});

task('watchFonts', function(){
	watch(path.watch.fonts, series('destFonts'));
});

task('watch', parallel('watchHTML', 'watchStyles', 'watchScripts', 'watchImages', 'watchFonts'));

task('build', series('destHTML', 'destStyles', 'destScripts', 'destImages', 'destFonts'))

task('default', series('build', 'webserver', 'watch'));