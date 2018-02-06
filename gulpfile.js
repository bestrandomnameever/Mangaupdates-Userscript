var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
//var log = require('gulplog');
var sourcemaps = require('gulp-sourcemaps');
//var assign = require('lodash.assign');
var tsify = require('tsify');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

var b = browserify({
        entries: ['./app/src/main.ts'],
        debug: true,
        cache: {},
        packageCache: {}
    })
    //.add('main.ts')
    .plugin(tsify)
    .plugin(watchify);

function update_ts() {
    return b.bundle()
    .on('error', function(error) {console.error(error.toString());})
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./app/dist'));
}

function bundle() {
    update_ts();
    browserSync.reload();
}

b.on('update', bundle);

gulp.task('bundle-ts', update_ts);

gulp.task('sass', function() {
    return gulp.src("app/src/scss/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("app/dist/"))
        .pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./app/dist"
        }
    });
});

gulp.task('default', ['sass', 'bundle-ts', 'browser-sync'], function (){
    gulp.watch('./app/src/scss/**/*.scss', ['sass']);
    gulp.watch("app/dist/*.html").on('change', browserSync.reload);
});