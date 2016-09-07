var gulp = require('gulp'),
    uglify = require('gulp-uglify'),//压缩js
    pump = require('pump'),//处理压缩文件错误
    concat = require('gulp-concat'),//合并js文件
    sass = require('gulp-sass'),//编译sass文件
    watch = require('gulp-watch'),//监控文件变化
    cleanCSS = require('gulp-clean-css'),//压缩css
    imagemin = require('gulp-imagemin');//压缩图片

gulp.task('minify-js', function (cb) {
    pump([
            gulp.src('./src/js/**/*.js'),
            uglify(),
            gulp.dest('./src/js-min/')
        ],
        cb
    );
});

gulp.task('minify-css', function() {
    return gulp.src('./src/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('concat-js', function() {
    return gulp.src('./src/js-min/**/*.js')
        .pipe(concat('blog.js'))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css/'));
});

gulp.task('watch', ['minify-js', 'minify-css', 'sass', 'concat-js'], function (){
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch('./src/css/**/*.css', ['minify-css']);
    gulp.watch('./src/js/**/*.js', ['minify-js']);
    gulp.watch('./src/js-min/js/*.js', ['concat-js']);
});

