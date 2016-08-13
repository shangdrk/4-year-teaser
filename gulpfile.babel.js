const babel = require('gulp-babel');
const crypto = require('crypto');
const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const spawn = require('child_process').spawn;
const webpackStream = require('webpack-stream');

gulp.task('dev-server', ['build', 'launch-dev-server'], () => {
  gulp.watch(['assets/**/*'], ['copy-assets']);
  gulp.watch(['components/**/*.jsx'], ['build-browser']);
  gulp.watch(['server/**/*'], ['launch-dev-server']);
});

let node;
gulp.task('launch-dev-server', ['build-server'], () => {
  if (node) {
    node.kill();
  }
  node = spawn('node', ['build/server.js']);

  node.stdout.on('data', data => {
    process.stdout.write(data.toString());
  });

  node.stderr.on('data', data => {
    process.stderr.write(data.toString());
  });
});

gulp.task('build', ['copy-assets', 'build-browser', 'build-server']);

gulp.task('copy-assets', () => {
  return gulp.src('assets/**/*')
    .pipe(gulp.dest('build/assets'));
});

gulp.task('build-browser', () => {
  return gulp.src('components/App.jsx')
    .pipe(plumber())
    .pipe(webpackStream(require('./webpack.config.js')))
    .pipe(gulp.dest('build/components'));
});

gulp.task('build-server', ['create-secrets'], () => {
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

gulp.task('create-secrets', () => {
  let secretsExist;
  try {
    if (fs.statSync('server/secrets.js').isFile()) {
      secretsExist = true;
    } else {
      secretsExist = false;
    }
  } catch (error) {
    secretsExist = false;
  }

  if (secretsExist) return;

  const sessionKey = crypto.randomBytes(16).toString('hex');
  const passcode = crypto.randomBytes(4).toString('hex');
  fs.writeFileSync('server/secrets.js', `
    module.exports = {
      sessionKey: '${sessionKey}',
      passcode: '${passcode}',
    }
  `);
});

gulp.task('clean', () => {
  return del(['build/**']);
});
