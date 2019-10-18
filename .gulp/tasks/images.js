const gulp          = require('gulp');
const config        = require('../config');
const browserSync   = require('browser-sync');

const imagemin      = require('gulp-imagemin');
const pngquant      = require('imagemin-pngquant');

gulp.task('images', () => {
    gulp.src(config.paths.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(config.paths.build.img))
        .pipe(browserSync.reload({
            stream: true
        }));
});