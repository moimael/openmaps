'use strict';

var gulp = require('gulp'),
  gutil = require('gulp-util'),
  browserSync = require('browser-sync'),
  browserify = require('browserify'),
  watchify = require('watchify'),
  sourcemaps = require('gulp-sourcemaps'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  minifyCss = require('gulp-minify-css'),
  csslint = require('gulp-csslint'),
  htmltidy = require('gulp-htmltidy'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant');

// watch files for changes and reload
gulp.task('serve', ['js'], function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch(['*.html', 'css/**/*.css', 'js/**/*.js'], {cwd: 'dist'}, browserSync.reload);
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
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', function () {
  var bundler = watchify(browserify({
    entries: ['./www/js/app.js'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  }));

  bundler.transform('brfs');

  var bundle = function () {
    return bundler
      .bundle()
          // log errors if they happen
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      // .pipe(jshint())
      // .pipe(jshint.reporter('jshint-stylish'))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/js'));
  };

  bundler.on('update', bundle); // on any dep update, runs the bundler
  bundler.on('log', gutil.log); // output build logs to terminal

  return bundle();
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