const gulp          = require('gulp');
const config        = require('../config');
const browserSync   = require('browser-sync');

const sass          = require('gulp-sass');
const gcmq          = require('gulp-group-css-media-queries');
const prefixer      = require('gulp-autoprefixer');
const cssmin        = require('gulp-minify-css');
const sm            = require('gulp-sourcemaps');
const plumber       = require('gulp-plumber');
const notify        = require('gulp-notify');

gulp.task('styles', () => {
    return gulp
        .src(config.paths.src.css)
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sm.init())
        .pipe(sass())
        .pipe(gcmq())
        .pipe(prefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(sm.write())
        .pipe(gulp.dest(config.paths.build.css))
        .pipe(browserSync.reload({
            stream: true
        }));
});