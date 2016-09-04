var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass');

gulp.task('compress', function (cb) {
    pump([
            gulp.src('src/javascript/**/*.js'),
            uglify(),
            gulp.dest('dist/javascript/')
        ],
        cb
    );
});

gulp.task('concatjs', function() {
    return gulp.src('./dist/javascript/**/*.js')
        .pipe(concat('output.js'))
        .pipe(gulp.dest('./dist/javascript/'));
});

gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});

