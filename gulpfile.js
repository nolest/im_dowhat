'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var rjs = require('gulp-requirejs');
var debug = require('gulp-debug');
var path = require('path');
var foreach = require('gulp-foreach');

// gulp.task('all', function () {
//   return gulp.src(['./src/**','!./src/css/**/*.scss'])
//     .pipe(gulp.dest('./app/'));
// });

gulp.task('sass', function () {
  return gulp.src('./src2.0/pages/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({
			extname: ".css"
		}))
    .pipe(gulp.dest('./dest/pages'));
});

gulp.task('watches', function () {
  gulp.watch('./src2.0/**', ['sass','requirejsBuild']);
});

gulp.task('requirejsBuild',function(){
	return gulp.src('./src2.0/modules/**/*.js')
	// .pipe(debug({
	// 	title : 'gulp-debug',
	// 	minimal : true,
	// 	showFiles : true
	// }))
	.pipe(rjs({baseUrl: './src2.0/modules/hashes.min.js',out:'123.js'}))
	.pipe(gulp.dest('./dest/modules'));
})