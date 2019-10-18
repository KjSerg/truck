const gulp      = require('gulp');
const watch     = require('gulp-watch');
const config    = require('../config');

gulp.task('watch', function(){
    watch([config.paths.watch.html], () => {
        gulp.start('html');
    });
    watch([config.paths.watch.js], () => {
        gulp.start('scripts');
    });
    watch([config.paths.watch.css], () => {
        gulp.start('styles');
    });
    watch([config.paths.watch.img], () => {
        gulp.start('images');
    });
    watch([config.paths.watch.fonts], () => {
        gulp.start('fonts');
    });
});