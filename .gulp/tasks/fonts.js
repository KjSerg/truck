const gulp          = require('gulp');
const config        = require('../config');
const browserSync   = require('browser-sync');

gulp.task('fonts', () => {
    gulp.src(config.paths.src.fonts)
        .pipe(gulp.dest(config.paths.build.fonts))
});