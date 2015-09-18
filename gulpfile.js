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
  filesize = require('gulp-filesize'),
  babelify = require('babelify'),
  //lrload = require('livereactload');
  assign = require('lodash.assign');

//add custom browserify options here
var customOpts = {
  entries: ['./www/js/app.js'],
  transform: ['babelify', 'brfs'],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true
};

var opts = assign({}, watchify.args, customOpts);
var bundler = browserify(opts);

function bundle() {
  return bundler
      .bundle()
      .on('error', gutil.log)
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(filesize())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(filesize())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/js'));
}

// watch files for changes and reload
gulp.task('serve', ['js'], function() {
  var watch = watchify(bundler);
  // Without the line, update events won't be fired
  watch.bundle().on('data', function() {});

  browserSync({
    server: {
      baseDir: 'dist'
    }
  });

  /* FIXME: separate watch to not rebuild css + js everytime */
  gulp.watch(['*.html'], {cwd: 'www'}, ['html', browserSync.reload]);
  gulp.watch(['css/**/*.css'], {cwd: 'www'}, ['css', browserSync.reload]);
  bundler.on('update', bundle); // on any dep update, runs the bundler
  bundler.on('log', gutil.log); // output build logs to terminal
  gulp.watch(['js/**/*.js'], {cwd: 'dist'}, browserSync.reload);
});

/**
 * Cleaning dist/ folder
 */
gulp.task('clean', function(cb) {
  del(['dist/**'], cb);
});

gulp.task('html', function () {
  return gulp.src('**/*.html', {cwd: 'www'})
    .pipe(htmltidy())
    .pipe(gulp.dest('./dist'));
});

gulp.task('css', function () {
  return gulp.src('css/**/*.css', {cwd: 'www'})
    .pipe(csslint({
      'compatible-vendor-prefixes': false,
      'box-sizing': false
    }))
    .pipe(sourcemaps.init())
    // .pipe(minifyCss())
    .pipe(concat('app.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'));
});

/* FIXME: transform jsx to js before linting */
gulp.task('lintjs', function () {
  return gulp.src('js/**/*.js', {cwd: 'www'})
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

//gulp.task('watchjs', function () {
//  lrload.monitor('dist/js/app.js', {displayNotification: true});
//});

gulp.task('js', bundle);

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

gulp.task('build', ['js', 'css', 'imgs', 'html', 'copy-manifest']);
gulp.task('default', ['serve']);
