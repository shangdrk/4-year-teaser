var babel = require('gulp-babel');
var del = require('del');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var spawn = require('child_process').spawn;
var webpackStream = require('webpack-stream');

gulp.task('dev-server', ['build', 'launch-dev-server'], function() {
  gulp.watch(['assets/**/*'], ['copy-assets']);
  gulp.watch(['components/**/*.jsx'], ['build-browser']);
  gulp.watch(['server/**/*'], ['launch-dev-server']);
});

gulp.task('launch-dev-server', ['build-server'], function() {
  var node = spawn('node', ['build/server.js']);

  node.stdout.on('data', function(data) {
    process.stdout.write(data.toString());
  });

  node.stderr.on('data', function(data) {
    process.stderr.write(data.toString());
  });
});

gulp.task('build', ['copy-assets', 'build-browser', 'build-server']);

gulp.task('copy-assets', function() {
  return gulp.src('assets/**/*')
    .pipe(gulp.dest('build/assets'));
});

gulp.task('build-browser', function() {
  return gulp.src('components/App.jsx')
    .pipe(plumber())
    .pipe(webpackStream(require('./webpack.config.js')))
    .pipe(gulp.dest('build/components'));
});

gulp.task('build-server', function() {
  return gulp.src(['server/**/*'])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel({
      babelrc: false,
      presets: ['es2015', 'stage-1'],
      only: [/\/server\//],
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function() {
  return del(['build/**']);
});
