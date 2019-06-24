const {src, dest, watch, series, task, parallel} = require('gulp'),
	  sass = require('gulp-sass'),
	  sync = require("browser-sync"),
	  prefixer = require('gulp-autoprefixer'),
	  browserSync = require('browser-sync').create();

var path = {
	src: {
		html: 'src/html/**/*.html',
		style: 'src/styles/**/*.scss',
		js: 'src/js/**/*.js',
		image: 'src/img/**/*.*',
		fonts: 'src/fonts/*.*',
		other: 'src/other/**/*.*'
	},
	dest: {
		html: 'dest/html/',
		style: 'dest/styles/',
		js: 'dest/js/',
		image: 'dest/img/',
		fonts: 'dest/fonts/',
		other: 'dest/other/'
	}
};

task('webserver', function(){
	browserSync.init({
	    server: {
	        baseDir: "./",
	       	index: './dest/html/index.html'
	    },
	    tunnel: true,
	    host: 'localhost',
	    port: 3000
	});
})

task('destHTML', function(){
	return src(path.src.html)
		.pipe(dest(path.dest.html))
		.pipe(browserSync.stream());
});

task('destStyles', function(){
	return src(path.src.style)
		.pipe(sass())
		.pipe(prefixer())
		.pipe(dest(path.dest.style))
		.pipe(browserSync.stream());
});

task('destScripts', function(){
	return src(path.src.js)
		.pipe(dest(path.dest.js))
		.pipe(browserSync.stream());
});

task('destImages', function(){
	return src(path.src.image)
		.pipe(dest(path.dest.image))
		.pipe(browserSync.stream());
});

task('destFonts', function(){
	return src(path.src.fonts)
		.pipe(dest(path.dest.fonts))
		.pipe(browserSync.stream());
});

task('destOther', function(){
	return src(path.src.other)
		.pipe(dest(path.dest.other))
		.pipe(browserSync.stream());
});

task('watchHTML', function(){
	watch(path.src.html, series('destHTML'));
});

task('watchStyles', function(){
	watch(path.src.style, series('destStyles'));
});

task('watchScripts', function(){
	watch(path.src.js, series('destScripts'));
});

task('watchImages', function(){
	watch(path.src.image, series('destImages'));
});

task('watchFonts', function(){
	watch(path.src.fonts, series('destFonts'));
});

task('watchOther', function(){
	watch(path.src.other, series('destOther'));
});

task('watchAll', parallel('watchHTML', 'watchStyles', 'watchScripts', 'watchImages', 'watchFonts', 'watchOther'));

task('build', series('destHTML', 'destStyles', 'destScripts', "destImages", 'destFonts', 'destOther'));

task('default', parallel('webserver', 'watchAll', 'build'));