var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');

gulp.task('browserify', function() {
    return browserify('./js/app.js')
        .transform(reactify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./build/'));
});
gulp.task('sass', function () {
    return gulp.src('./styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./styles'));
});
gulp.task('watch', function() {
  gulp.watch('./js/**/*.js', ['browserify']);
    gulp.watch('./styles/*.scss', ['sass']);
});

gulp.task('build', ['browserify']);
gulp.task('default', ['watch', 'browserify','sass']);
