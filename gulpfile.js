'use strict';

var browserify    = require('browserify');
var del           = require('del');
var gulp          = require('gulp');
var autoprefixer  = require('gulp-autoprefixer');
var changed       = require('gulp-changed');
var combineMq     = require('gulp-combine-mq');
var concat        = require('gulp-concat');
var cssnano       = require('gulp-cssnano');
var eslint        = require('gulp-eslint');
var htmlmin       = require('gulp-htmlmin');
var gulpif        = require('gulp-if');
var imagemin      = require('gulp-imagemin');
var rename        = require('gulp-rename');
var sass          = require('gulp-sass');
var sassLint      = require('gulp-sass-lint');
var shell         = require('gulp-shell');
var sourcemaps    = require('gulp-sourcemaps');
var uglify        = require('gulp-uglify');
var runSequence   = require('run-sequence');
var vinylBuffer   = require('vinyl-buffer');
var vinylSource   = require('vinyl-source-stream');

var isProduction  = false;

// Icons
gulp.task('icons', function() {
  return gulp.src(['./assets/icons/spinner.svg'])
    .pipe(imagemin())
    .pipe(gulp.dest('./static/icons'));
});

// Images
gulp.task('images', function() {
  return gulp.src(['./public/uploads/**/*'])
    .pipe(imagemin())
    .pipe(gulp.dest('./public/uploads'));
});

// Styles
gulp.task('clean:styles', function() {
  return del(['./static/css/**/*']);
});

gulp.task('styles:lint', ['clean:styles'], function() {
  return gulp.src(['./assets/sass/**/*.s+(a|c)ss', '!./assets/sass/generic/_normalize.scss'])
    .pipe(sassLint({
      configFile: '.sass-lint.yml',
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

gulp.task('styles', ['styles:lint'], function() {
  return gulp.src('./assets/sass/styles.s+(a|c)ss')
    .pipe(changed('./static/css'))
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['node_modules/susy/sass']
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 9', 'ie 10'],
    }))
    .pipe(combineMq())
    .pipe(gulp.dest('./static/css'))
    .pipe(gulpif(isProduction, sourcemaps.init({loadMaps: true})))
    .pipe(gulpif(isProduction, cssnano()))
    .pipe(gulpif(isProduction, sourcemaps.write()))
    .pipe(gulpif(isProduction, rename('styles.min.css')))
    .pipe(gulpif(isProduction, gulp.dest('./static/css')));
});

// Scripts
gulp.task('clean:scripts', function() {
  return del(['./static/js/**/*']);
});

gulp.task('scripts:lint', ['clean:scripts'], function() {
  return gulp.src(['./assets/js/**/*.js', '!./node_modules/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('scripts', ['scripts:lint'], function() {
  var b = browserify({
    entries: './assets/js/scripts.js',
    debug: true
  });

  return b.bundle()
    .pipe(vinylSource('scripts.js'))
    .pipe(vinylBuffer())
    .pipe(gulp.dest('./static/js'))
    .pipe(gulpif(isProduction, sourcemaps.init({loadMaps: true})))
    .pipe(gulpif(isProduction, uglify()))
    .pipe(gulpif(isProduction, sourcemaps.write()))
    .pipe(gulpif(isProduction, rename('scripts.min.js')))
    .pipe(gulpif(isProduction, gulp.dest('./static/js')));
});

// Markup
gulp.task('html', function() {
  return gulp.src('./public/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      useShortDoctype: true,
    }))
    .pipe(gulp.dest('./public'));
});

// Clean
gulp.task('clean', function(){
  return del(['./public/**/*', './static/**/*'], {
    force: true,
  });
});

// Watch
gulp.task('watch', function() {
  gulp.watch('./assets/sass/**/*.s+(a|c)ss', ['styles']);
  gulp.watch('./assets/js/**/*.js', ['scripts']);
});

// Server
gulp.task('hugo:server', shell.task([
  'hugo server -D'
]));

gulp.task('hugo:build', shell.task([
  'hugo'
]));

// Environment Build
gulp.task('dev', function() {
  isProduction = false;
  runSequence('icons', 'styles', 'scripts', 'watch', 'hugo:server');
});

gulp.task('prod', function() {
  isProduction = true;
  runSequence('clean','icons', 'styles', 'scripts', 'hugo:build', 'html', 'images');
});

// Default Task
gulp.task('default', ['dev']);