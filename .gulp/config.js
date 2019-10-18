const util  = require('gulp-util');

let config = {
    logEnvironment: function() {
        util.log(
            'Environment:',
            util.colors.white.bgRed(' ' + process.env.NODE_ENV.toUpperCase() + ' ')
        );
    },
    paths: {
        build: {
            html: 'build/',
            js: 'build/js/',
            css: 'build/css/',
            img: 'build/img/',
            fonts: 'build/fonts/'
        },
        src: {
            html: 'src/*.html',
            js: 'src/js/*.js',
            css: 'src/sass/**/*.scss',
            cssLibs: 'src/css/libs/*.css',
            img: 'src/img/**/*.*',
            fonts: 'src/fonts/**/*.*'
        },
        watch: {
            html: 'src/*.html',
            js: 'src/js/**/*.js',
            jsLibs: 'src/js/libs/*.js',
            css: 'src/sass/**/*.scss',
            cssLibs: 'src/css/libs/*.css',
            img: 'src/img/**/*.*',
            fonts: 'src/fonts/**/*.*'
        },
    },
    server: {
        server: {
            baseDir: "build"
        },
        host: 'localhost',
        port: 1337,
        logPrefix: "UI"
    }
};

module.exports = config;