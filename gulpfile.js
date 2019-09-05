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
const tinypng = require('gulp-tinypng-compress');
const extReplace = require('gulp-ext-replace');
const webp = require('imagemin-webp');
const imagemin = require('gulp-imagemin');
const uncss = require('gulp-uncss');
const concat = require('gulp-concat');

gulp.task('webp', () => {
  return gulp.src('./dist/image/*')
    .pipe(imagemin([
      webp({ quality: 50 })
    ]))
    .pipe(extReplace('.webp'))
    .pipe(gulp.dest('./dist/webp/'))
});


// HTML: minify
gulp.task('html', () => {
  gulp.src('./src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'));
  gulp.watch('./src/*.html', ['html']);
});

// clean CSS => remove useless CSS
gulp.task('cleanCSS', () => {
  gulp.src('./src/css/*.css')
    .pipe(uncss({
      html: ['./src/index.html']
    }))
    .pipe(cssnano())
    .pipe(gulp.dest('./src/css'));
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
    .pipe(gulp.dest('./dist/css/build'));
  gulp.src('./src/css/*.css')
    .pipe(cssnano())
    .pipe(gulp.dest('./dist/css/build'));
  gulp.watch('./src/scss/*.scss', ['sass']); // => 監測 scss 檔案更新
  gulp.watch('./src/css/*.css', ['sass']); // => 監測 scss 檔案更新
});

// Concat CSS & JS
gulp.task('concat', () => {
  gulp.src('./dist/css/build/*.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./dist/css'));
  gulp.src(['./dist/js/build/*-min.js', '!./dist/js/build/jquery-3.4.1.slim-min.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/js'));
});


// JS: watch & compile & minify
gulp.task('js', () => {
  gulp.src('./src/js/*.js')
    .pipe(minify())
    .pipe(gulp.dest('./dist/js/build'));
  gulp.watch('./src/js/*.js', ['js']); // => 監測 js 檔案更新
});

// Image compress
gulp.task('tinypng', function () {
  gulp.src('./src/image/*.{png,jpg,jpeg}')
    .pipe(tinypng({
      key: 'GL3Dt8zj8BTvBZ4KvMM0hqbChmrYHp7x',
      sigFile: 'image/.tinypng-sigs',
      log: true
    }))
    .pipe(gulp.dest('./dist/image'));
});


gulp.task('clean', () => {
  return gulp.src('./dist')
    .pipe(clean());
});

// default task
gulp.task('default', ['html', 'sass', 'js', 'concat']);
