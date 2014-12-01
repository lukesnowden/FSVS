var gulp 					= require('gulp'),
	autoprefixer 			= require('gulp-autoprefixer'),
	cache 					= require('gulp-cache'),
	clean 					= require('gulp-clean'),
	concat 					= require('gulp-concat'),
	minifyCSS 				= require('gulp-minify-css'),
	plumber 				= require('gulp-plumber'),
	rename 					= require('gulp-rename'),
	sass 					= require('gulp-ruby-sass'),
	sequence 				= require('run-sequence'),
	uglify 					= require('gulp-uglify'),

	/**
	 * If developing this package set to true but make sure you change it to false before
	 * deploying and re-run gulp
	 */

	local					= true,
	destination 			= 'assets/';


/**
 * setup stream for package's sass files
 * @return gulp object
 */

gulp.task( 'styles', function()
{
	var _gulp = gulp.src( 'scss/**/*.scss' )
	.pipe( plumber() )
	.pipe( sass() )
	.pipe( autoprefixer( 'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4' ) );
	// don't bother with source map rubbish...
	if( ! local ) _gulp.pipe( minifyCSS() );
	_gulp.pipe( gulp.dest( destination + 'css' ) );
	return _gulp;
});

/**
 * setup stream for package's javascript files
 * @return gulp object
 */

gulp.task( 'scripts', function()
{
	var _gulp = gulp.src([
		'js/fsvs.js'
	])
	.pipe( plumber() )
	.pipe( concat( 'bundle.js' ) );
	if( ! local ) _gulp.pipe( uglify() );
	_gulp.pipe( gulp.dest( destination + 'js' ) );
	return _gulp;
});

/**
 * [description]
 * @return {[type]} [description]
 */

gulp.task( 'clean', function()
{
	return gulp.src([
		destination + 'css',
		destination + 'js'
	], { read: false } )
	.pipe( clean({ force : true }) );
});

/**
 * [description]
 * @return {[type]} [description]
 */

gulp.task( 'watch', function () {
	gulp.watch( 'scss/**/*.scss', ['styles']);
	gulp.watch( 'js/*.js', ['scripts'] );
});

/**
 * [description]
 * @return {[type]} [description]
 */

gulp.task( 'default', ['clean'], function() {
        sequence( 'styles', 'scripts' );
});
