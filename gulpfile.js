var gulp = require('gulp'),
    uglify = require('gulp-uglify'),//压缩js
    concat = require('gulp-concat'),//合并js文件
    sass = require('gulp-sass'),//编译sass文件
    watch = require('gulp-watch'),//监控文件变化
    cleanCSS = require('gulp-clean-css'),//压缩css
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),//压缩图片
    pngquant = require('imagemin-pngquant'),//imagemin deep
    imageminOptipng = require('imagemin-optipng'),
    imageminSvgo = require('imagemin-svgo'),
    imageminGifsicle = require('imagemin-gifsicle'),
    imageminJpegtran = require('imagemin-jpegtran');
    // cache = require('gulp-cache')//imggemin cache

gulp.task('js', function () {
    return gulp.src('./src/js/**/*.js') //需要操作的文件
        .pipe(concat('blog.js')) //合并所有js到blog.js
        .pipe(gulp.dest('./src/js_concat/')) //输出到文件夹
        .pipe(rename({suffix: '.min'})) //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('./dist/js/')); //输出
});

gulp.task('css', function() {
    return gulp.src('./src/css/**/*.css')
        .pipe(concat('blog.css'))
        .pipe(gulp.dest('./src/css_concat/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css/'));
});

gulp.task('img', function (){
    return gulp.src('./src/img/**/*')
        .pipe(imagemin({     
            progressive: true,          
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant(),imageminJpegtran({progressive: true})
            , imageminGifsicle({interlaced: true}),imageminOptipng({optimizationLevel:3}), imageminSvgo()] //使用pngquant深度压缩png图片的imagemin插件          
        }))
        .pipe(gulp.dest('./dist/img/'));
});

// gulp.task('deepImg', function () {
//     gulp.src('./src/img-min/**/*')
//         .pipe(imagemin({
//             progressive: true,
//             svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
//             use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
//         }))
//         .pipe(gulp.dest('./dist/img/'));
// });

gulp.task('watch', ['js', 'css', 'sass'], function (){
    gulp.watch('./src/js/**/*.js', ['js']);
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch('./src/css/**/*.css', ['css']);
});   

