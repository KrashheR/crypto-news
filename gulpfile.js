"use strict"

const {src, dest} = require("gulp");
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const cssbeautify = require("gulp-cssbeautify");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require('sass'));
const cssnano = require("gulp-cssnano");
const uglify = require("gulp-uglify");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const imagemin = require("gulp-imagemin");
const del = require("del");
const rigger = require("gulp-rigger");
const concat = require("gulp-concat");
const webp = require('gulp-webp');
const browserSync = require("browser-sync").create();

const srcPath = "src/";
const distPath = "dist/";   


const path = {
    build: {
        html: distPath,
        css: distPath + "assets/sass/",
        js: distPath + "assets/js/",
        images: distPath + "assets/blocks/"
    },
    src: {
        html: srcPath + "**/*.html",
        css: srcPath + "**/*.scss",
        js: srcPath + "blocks/**/*.js",
        images: srcPath + "blocks/**/*.{jpg,jpeg,png,svg,gif,ico,webp,xml}"
    },
    watch: {
        html: srcPath + "**/*.html",
        css: srcPath + "**/*.scss",
        js: srcPath + "blocks/**/*.js",
        images: srcPath + "blocks/**/*.{jpg,jpeg,png,svg,gif,ico,webp,xml}"
    },
    clean: "./" + distPath
}

function serve() {
    browserSync.init({
        server: {
            baseDir: "./" + distPath
        }
    });
}

function html() {
    return src(path.src.html, {base: srcPath})
        .pipe(dest(path.build.html))
        .pipe(browserSync.reload({stream: true}))
}

function css() {
    return src(['src/sass/*.scss', 'src/blocks/**/*.scss'])
        .pipe(concat("style.css"))    
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssbeautify())
        //.pipe(dest(path.build.css))
        .pipe(cssnano({
            zindex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browserSync.reload({stream: true}));
}

function js() {
    return src(path.src.js, {base: srcPath + "blocks/"})
        .pipe(plumber())
        .pipe(rigger())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min",
            extname: ".js"
        }))
        .pipe(dest(path.build.js))
        .pipe(browserSync.reload({stream: true}))
}

function images() {
    return src(path.src.images, {base: srcPath + "blocks/"})
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 80, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(webp())
        .pipe(dest(path.build.images))
        .pipe(browserSync.reload({stream: true}))
}

function clean() {
    return del(path.clean)
}

function watchFiles() {
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.js], js)
    gulp.watch([path.watch.images], images)
}

const build = gulp.series(clean, gulp.parallel(html, css, js, images))
const watch = gulp.parallel(build, watchFiles, serve)

exports.html = html
exports.css = css
exports.js = js
exports.images = images
exports.clean = clean
exports.build = build
exports.watch = watch
exports.default = watch