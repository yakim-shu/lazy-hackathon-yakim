/* eslint-disable arrow-body-style */
const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const minify = require('gulp-minify');
const clean = require('gulp-clean');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const htmlmin = require('gulp-htmlmin');

// HTML: minify
gulp.task('html', () => {
  gulp.src('./src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'));
  gulp.watch('./src/*.html', ['html']);
});

// SCSS: watch & compile & minify
gulp.task('sass', () => {
  const processors = [
    autoprefixer({ overrideBrowserslist: ['last 2 version'] }),
  ];
  gulp.src('./src/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'));
  gulp.src('./src/css/*.css')
    .pipe(cssnano())
    .pipe(gulp.dest('./dist/css'));
  gulp.watch('./src/scss/*.scss', ['sass']); // => 監測 scss 檔案更新
});


// JS: watch & compile & minify
gulp.task('js', () => {
  gulp.src('./src/js/*.js')
    .pipe(minify())
    .pipe(gulp.dest('./dist/js'));
  gulp.watch('./src/js/*.js', ['js']); // => 監測 js 檔案更新
});

// Image: 
gulp.task('image', () => {
  gulp.src('./src/image/*')
    .pipe(gulp.dest('./dist/image/'));
});

gulp.task('clean', () => {
  return gulp.src('./dist')
    .pipe(clean());
});

// default task
gulp.task('default', ['html', 'sass', 'js', 'image']);
