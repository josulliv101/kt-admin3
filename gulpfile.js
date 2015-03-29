var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var es6ify = require('es6ify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('browserify', function() {
  gulp.src('src/js/main.js')
    .pipe(browserify({
      debug: true,
      transform: ['reactify', 'es6ify']
    }))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});

gulp.task('copy', function() {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'))
});

gulp.task('copyimg', function() {
  gulp.src('src/img/**/*.*')
    .pipe(gulp.dest('dist/img'))
});

gulp.task('sass', function() {
  gulp.src('src/scss/*.scss')
    .pipe(concat('main.css'))
    .pipe(sass({
      style: 'compressed'
    }))
    .pipe(gulp.dest('dist/css'));
});


gulp.task('default', ['sass', 'browserify', 'copy', 'copyimg']);

gulp.task('watch', function() {
  gulp.watch('src/**/*.*', ['default']);
});
