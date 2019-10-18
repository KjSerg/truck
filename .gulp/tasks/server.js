const gulp          = require('gulp');
const browserSync   = require('browser-sync');
const config        = require('../config');

gulp.task('server', function () {
    process.env.NODE_ENV === 'development' ? browserSync(config.server) : null;
});