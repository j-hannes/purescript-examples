var gulp = require('gulp')
var gutil = require('gulp-util')
var shell = require('gulp-shell')
var plumber = require('gulp-plumber')
var purescript = require('gulp-purescript')
var config = {
  purescript: {
    src: [
      'bower_components/purescript-*/src/**/*.purs',
      'src/**/*.purs'
    ]
  }
}

function error(e) {
  gutil.log(
    gutil.colors.magenta('>>>> Error <<<<') + '\n' + e.toString().trim()
  );
  this.emit('end');
}

gulp.task('purescript', function() {
  var pscOptions = {
    main: 'Chapter2',
    modules: ['Chapter2'],
    output: 'Main.js'
  }
  return gulp
    .src(config.purescript.src)
    .pipe(purescript.psc(pscOptions))
    .pipe(gulp.dest('dist/'))
})

gulp.task('psci', function() {
  return gulp
    .src(config.purescript.src)
    .pipe(plumber())
    .pipe(purescript.dotPsci())
    .on('error', error)
})

gulp.task('run', function() {
  return gulp
    .src('dist/Main.js')
    .pipe(shell('node <%= file.path %>'))
})

gulp.task('default', ['purescript', 'psci'])

