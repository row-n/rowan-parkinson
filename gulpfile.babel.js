// Set environment
let isProduction = false;

// Load gulp
const gulp = require('gulp');

// Load all plugins in 'devDependencies' into the variable $
const $ = require('gulp-load-plugins')({
  pattern: ['*'],
  scope: ['devDependencies'],
});

// Icons
gulp.task('icons', () => {
  const stream = gulp.src(['./assets/icons/spinner.svg'])
    .pipe($.plumber())
    .pipe($.imagemin())
    .pipe(gulp.dest('./static/icons'));
  return stream;
});

// Images
gulp.task('images', () => {
  const stream = gulp.src(['./public/uploads/**/*'])
    .pipe($.plumber())
    .pipe($.imagemin())
    .pipe(gulp.dest('./public/uploads'));
  return stream;
});

// Styles
gulp.task('clean:styles', () => {
  const stream = $.del(['./static/css/**/*']);
  return stream;
});

gulp.task('styles:lint', ['clean:styles'], () => {
  const stream = gulp.src(['./assets/sass/**/*.s+(a|c)ss', '!./assets/sass/generic/_normalize.scss'])
    .pipe($.plumber())
    .pipe($.sassLint({
      configFile: '.sass-lint.yml',
    }))
    .pipe($.sassLint.format())
    .pipe($.sassLint.failOnError());
  return stream;
});

gulp.task('styles', ['styles:lint'], () => {
  const stream = gulp.src('./assets/sass/styles.s+(a|c)ss')
    .pipe($.plumber())
    .pipe($.changed('./static/css'))
    .pipe($.sass({
      outputStyle: 'compressed',
      includePaths: ['node_modules/susy/sass'],
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie 9', 'ie 10'],
    }))
    .pipe($.combineMq())
    .pipe(gulp.dest('./static/css'))
    .pipe($.if(isProduction, $.sourcemaps.init({ loadMaps: true })))
    .pipe($.if(isProduction, $.cssnano()))
    .pipe($.if(isProduction, $.sourcemaps.write()))
    .pipe($.if(isProduction, $.rename('styles.min.css')))
    .pipe($.if(isProduction, gulp.dest('./static/css')));
  return stream;
});

// Scripts
gulp.task('clean:scripts', () => {
  const stream = $.del(['./static/js/**/*']);
  return stream;
});

gulp.task('scripts:lint', ['clean:scripts'], () => {
  const stream = gulp.src(['./assets/js/**/*.js', '!./node_modules/**/*.js'])
    .pipe($.plumber())
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
  return stream;
});

gulp.task('scripts', ['scripts:lint'], () => {
  const b = $.browserify({
    entries: './assets/js/scripts.js',
    debug: true,
  });

  return b.bundle()
    .pipe($.plumber())
    .pipe($.vinylSourceStream('scripts.js'))
    .pipe($.vinylBuffer())
    .pipe(gulp.dest('./static/js'))
    .pipe($.if(isProduction, $.sourcemaps.init({ loadMaps: true })))
    .pipe($.if(isProduction, $.babel({
      presets: ['es2015'],
    })))
    .pipe($.if(isProduction, $.uglify()))
    .pipe($.if(isProduction, $.sourcemaps.write()))
    .pipe($.if(isProduction, $.rename('scripts.min.js')))
    .pipe($.if(isProduction, gulp.dest('./static/js')));
});

// Markup
gulp.task('html', () => {
  const stream = gulp.src('./public/**/*.html')
    .pipe($.plumber())
    .pipe($.htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      useShortDoctype: true,
    }))
    .pipe(gulp.dest('./public'));
  return stream;
});

// Clean
gulp.task('clean', () => {
  const stream = $.del(['./public/**/*', './static/**/*'], {
    force: true,
  });
  return stream;
});

// Watch
gulp.task('watch', () => {
  gulp.watch('./assets/sass/**/*.s+(a|c)ss', ['styles']);
  gulp.watch('./assets/js/**/*.js', ['scripts']);
});

// Server
gulp.task('hugo:server', $.shell.task(['hugo server -D']));

gulp.task('hugo', $.shell.task(['hugo']));

// Environment Build
gulp.task('dev', () => {
  isProduction = false;
  $.runSequence('icons', 'styles', 'scripts', 'watch', 'hugo:server');
});

gulp.task('prod', () => {
  isProduction = true;
  $.runSequence('clean', 'icons', 'styles', 'scripts', 'html', 'images');
});

// Default Task
gulp.task('default', ['dev']);
