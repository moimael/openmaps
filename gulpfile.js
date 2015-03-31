'use strict';

var gulp = require('gulp'),
  gutil = require('gulp-util'),
  browserSync = require('browser-sync'),
  browserify = require('browserify'),
  watchify = require('watchify'),
  del = require('del'),
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
  pngquant = require('imagemin-pngquant'),
  filesize = require('gulp-filesize');

// watch files for changes and reload
gulp.task('serve', ['js'], function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });
  /* FIXME: separate watch to not rebuild css + js everytime */
  gulp.watch(['*.html', 'css/**/*.css', 'js/**/*.js', 'js/**/*.jsx'], {cwd: 'dist'}, browserSync.reload);
});

/**
 * Cleaning dist/ folder
 */
gulp.task('clean', function(cb) {
  del(['dist/**'], cb);
})

gulp.task('html', function () {
  return gulp.src('**/*.html', {cwd: 'www'})
    .pipe(htmltidy())
    .pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
  return gulp.src('css/**/*.css', {cwd: 'www'})
    .pipe(csslint({
      'compatible-vendor-prefixes': false,
      'box-sizing': false
    }))
    .pipe(minifyCss())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('lintjs', function () {
  return gulp.src('js/**/*.js', {cwd: 'www'})
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
});

gulp.task('js', function () {
  var bundler = watchify(browserify({
    entries: ['./www/js/app.js'],
    transform: ['reactify', 'brfs'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  }));

  var bundle = function () {
    return bundler
      .bundle()
          // log errors if they happen
      // .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(filesize())
      .pipe(sourcemaps.init({loadMaps: true}))
      // .pipe(uglify())
      .pipe(filesize())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/js'));
  };

  bundler.on('update', bundle); // on any dep update, runs the bundler
  bundler.on('log', gutil.log); // output build logs to terminal

  return bundle();
});

gulp.task('imgs', function () {
  return gulp.src('**/*.png', {cwd: 'www'})
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-manifest', function(){
  return gulp.src('manifest.webapp', {cwd: 'www'})
    .pipe(gulp.dest('dist'));
});

gulp.watch(['*.html'], {cwd: 'www'}, ['html']);
gulp.watch(['css/**/*.css'], {cwd: 'www'}, ['css']);

gulp.task('build', ['lintjs', 'js', 'imgs', 'css', 'html', 'copy-manifest']);
gulp.task('default', ['serve']);