const gulp          = require('gulp');
const config        = require('../config');
const browserSync   = require('browser-sync');

gulp.task('html', function () {
    gulp
        .src(config.paths.src.html)
        .pipe(gulp.dest(config.paths.build.html))
        .pipe(browserSync.reload({
            stream: true
        }));
});

