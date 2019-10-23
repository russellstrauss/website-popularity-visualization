var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream'); // required to dest() for browserify
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
	return gulp.src('./css/style.scss')
	.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError)) // .on('error', sass.logError) prevents gulp from crashing when saving a typo or syntax error
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./css'))
	.pipe(browserSync.stream()); // causes injection of styles on save
});

gulp.task('sync', ['sass'], function() {
	browserSync.init({
		open: true,
		server: {
			baseDir: "./",
		}
	});
});

gulp.task('HTML', function() {
	return gulp.src(['./index.html'])
		.pipe(browserSync.stream()); // causes injection of html changes on save
});

gulp.task('javascript', function() {
	return gulp.src(['./js/main.js'])
		.pipe(browserSync.stream());
});

gulp.task('watch', function() {

	watch('./css/**/*.scss', function() {
		gulp.start('sass');
	});
	watch(['./js/**/*.js'], function() {
		gulp.start('javascript');
	});
	watch('./**/*.html', function() {
		gulp.start('HTML');
	});	
});

// Default Task
gulp.task('default', ['sass', 'javascript', 'watch', 'sync']);