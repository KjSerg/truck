const gulp          = require('gulp');
const runSequence   = require('run-sequence').use(gulp);
const config        = require('../config');


gulp.task('build', () => {
    runSequence(
        'html',
        'styles',
        'scripts',
        'images',
        'fonts'
    );
    config.logEnvironment();
});