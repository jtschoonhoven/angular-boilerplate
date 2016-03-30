"use strict";
const fs = require('fs');
const gulp = require('gulp');
const jshint = require('gulp-jshint');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const inject = require('gulp-inject');
const browserify = require('browserify');
const babelify = require('babelify');
const stringify = require('stringify')

gulp.task('default', ['inject']);

/**
 * Bundle all JS assets.
 */
gulp.task('bundle', function() {
    const outFile = fs.createWriteStream("./app/bundle.js");
    const b = browserify("./app/app.js", {debug: true});

    b.transform(stringify, {
        appliesTo: { includeExtensions: ['.html'] },
        minify: true
    });

    b.transform(babelify.configure({
            compact: false,
            comments: false,
            sourceMaps: true
        }));

    return b.bundle().pipe(outFile);
});

/**
 * Inject bundled JS into HTML.
 */
gulp.task('inject', ['bundle'], function() {
    return gulp.src('./app/index.html')
        .pipe(inject(gulp.src(['./app/bundle.js']), {
            starttag: '<!-- inject:app -->',
            transform: function (filePath, file) {
                return `<script>${file.contents.toString('utf8')}</script>`
            }
        }
    ))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./'));
});


/**
 * Watch files and reinject bundled JS on change.
 */
gulp.task('watch', ['inject'], function () {
    gulp.watch([
        './app/**/*.js',
        './app/**/*.html',
        '!./app/bundle.js'
        ], ['inject']
    );
});

// Bundle JS and inject into HTML
// gulp.task('bundle', function() {
//     return gulp.src('js/*.js')
//         .pipe(concat('all.js'))
//         .pipe(gulp.dest('dist'))
//         .pipe(rename('all.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'));
// });

// Watch Files For Changes
// gulp.task('watch', function() {
//     gulp.watch('js/*.js', ['lint', 'scripts']);
//     gulp.watch('scss/*.scss', ['sass']);
// });

// Lint
// gulp.task('lint', function() {
//     return gulp.src('js/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'));
// });

// Compile Our Sass
// gulp.task('sass', function() {
//     return gulp.src('scss/*.scss')
//         .pipe(sass())
//         .pipe(gulp.dest('dist/css'));
// });
