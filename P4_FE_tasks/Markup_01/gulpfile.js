'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
//    requirejsOptimize = require('gulp-requirejs-optimize'),
    sass = require('gulp-sass'),
//    sourcemaps = require('gulp-sourcemaps'),
//    rigger = require('gulp-rigger'),
//    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'client_src/*.html',
        js: 'client_src/js/app.js',
        style: 'client_src/scss/main.scss',
        img: 'client_src/img/**/*.*',
        fonts: 'client_src/fonts/**/*.*'
    },
    watch: {
        html: 'client_src/**/*.html',
        js: 'client_src/js/**/*.js',
        style: 'client_src/scss/**/*.scss',
        img: 'client_src/img/**/*.*',
        fonts: 'client_src/fonts/**/*.*'
    },
    clean: 'build'
};

var config = {
    server: {
        baseDir: "build"
    },
    tunnel: false,
    host: 'localhost',
    port: 3000,
    logPrefix: "Frontend_Project"
};


gulp.task('build:html', function () {
    return gulp.src(path.src.html)
//        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('build:js', function () {
    return gulp.src(path.src.js)
/*        // .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(requirejsOptimize({
            paths: {
                'jquery': 'http://code.jquery.com/jquery-1.12.0.min',
            },
            shim: {
                'jquery': {
                    exports: 'jquery'
                },
            },
            include: ['../../node_modules/requirejs/require.js', 'app.js'],
            // optimize: "none"
        }))
        .pipe(sourcemaps.write())*/
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('build:style', function () {
    return gulp.src(path.src.style)
//        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
//        .pipe(cssnano())
//        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('build:image', function () {
    return gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant({quality: '65-80', speed: 4})],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('build:fonts', function() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task('build', [
    'build:html',
    'build:js',
    'build:style',
    'build:image',
    'build:fonts'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('build:html');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('build:style');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('build:js');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('build:image');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('build:fonts');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);
