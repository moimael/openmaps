'use strict';

var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  minifyCss = require('gulp-minify-css'),
  csslint = require('gulp-csslint'),
  htmltidy = require('gulp-htmltidy'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant');

// watch files for changes and reload
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'www'
    }
  });

  gulp.watch(['*.html', 'css/**/*.css', 'js/**/*.js'], {cwd: 'www'}, browserSync.reload);
});

gulp.task('html', function () {
   gulp.src('**/*.html', {cwd: 'www'})
      .pipe(htmltidy())
      .pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
   gulp.src('css/**/*.css', {cwd: 'www'})
      .pipe(csslint({
        'compatible-vendor-prefixes': false,
        'box-sizing': false
      }))
      .pipe(minifyCss())
      .pipe(concat('app.css'))
      .pipe(gulp.dest('dist'));
});

gulp.task('js', function () {
   gulp.src('js/**/*.js', {cwd: 'www'})
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(uglify())
      .pipe(concat('app.js'))
      .pipe(gulp.dest('dist'));
});

gulp.task('imgs', function () {
   gulp.src('**/*.png', {cwd: 'www'})
      .pipe(imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()]
      }))
      .pipe(gulp.dest('dist'));
});

gulp.task('build', ['html', 'css', 'js', 'imgs']);