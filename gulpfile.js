/* jshint esversion: 6 */

const gulp = require('gulp');
// MINIFY PLUGINS
const uglify = require('gulp-uglify-es');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const purge = require('gulp-css-purge');
// CONCAT PLUGIN
const concat = require('gulp-concat');
// STRIP OUT JS FILES
const stripDebug = require('gulp-strip-debug');
// IMAGE COMPRESSION PLUGINS
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminWebp = require('imagemin-webp');
const newer = require('gulp-newer');
const rename = require("gulp-rename");
// BROWSER-SYNC PLUGIN
const browserSync = require('browser-sync').create();
// CSS & AUTOPREFIXER PLUGINS
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const globbing = require('gulp-css-globbing');
// SOURCEMAPS
const sourcemaps = require('gulp-sourcemaps');

//CSS BUILD
function css(done) {
   gulp.src('src/scss/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(globbing({
         extensions: ['.scss']
      }))
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('production/css'))
      .pipe(browserSync.stream());
   done();
}

// CSS BUILD - AUTOPREFIXER, MINIFICATION, PURGING, MEDIA-QUERIES
function cssBuild(done) {
   gulp.src('production/css/**/*.css')
      .pipe(purge({
         trim: true,
         shorten: true,
         verbose: true
      }))
      .pipe(autoprefixer({
         cascade: false
      }))
      .pipe(cleanCSS({
         compatibility: 'ie8'
      }))
      .pipe(gulp.dest('production/css'));
   done();
}

// HTML BUILD - MINIFY HTML
function htmlBuild(done) {
   gulp.src('./*.html')
      .pipe(htmlmin({
         collapseWhitespace: true
      }))
      .pipe(gulp.dest('./'));
   done();
}

// JAVASCRIPT
function js(done) {
   gulp.src('src/js/**/*.js')
      .pipe(concat('bundle.js'))
      .pipe(gulp.dest('production/js'));
   done();
}

// JAVASCRIPT BUILD - MINIFY JS
function jsBuild(done) {
   gulp.src('production/js/**/*.js')
      .pipe(stripDebug())
      .pipe(uglify())
      .pipe(gulp.dest('production/js'));
   done();
}

//IMAGE COMPRESSION
function imgCompress(done) {
   gulp.src('src/img/**/*')
      .pipe(newer('production/img'))
      .pipe(imagemin([
         //png
         imageminPngquant({
            speed: 1,
            Quality: '70-90',
            floyd: 1
         }),
         //jpg
         imageminJpegtran({
            progressive: true
         }),
         imageminMozjpeg({
            quality: 78
         }),
         //svg
         imageminSvgo({
            plugins: [{
               removeViewBox: false
            }]
         })
      ], {
         verbose: true
      }))
      .pipe(gulp.dest('production/img'));
   done();
}

function imgWebp(done) {
   gulp.src('src/img/**/*.{jpg,png}')
      .pipe(newer('production/img'))
      .pipe(imagemin([
         //webp
         imageminWebp({
            method: 6,
            quality: 50
         })
      ]))
      .pipe(rename({
         extname: '.webp'
      }))
      .pipe(gulp.dest('production/img'));
   done();
}

// BROWSERSYNC BUILD
function bs(done) {
   browserSync.init({
      open: false,
      port: 4000,
      server: {
         baseDir: './'
      }
   });
   done();
}

function browserSyncReload(done) {
   browserSync.reload();
   done();
}

function watchFiles(done) {
   gulp.watch('src/**/*.scss', css);
   gulp.watch('src/**/*.js', js);
   gulp.watch('src/img/**/*', imgCompress);
   gulp.watch(
      [
         './**/*.html'
      ],
      browserSyncReload);
   done();
}

gulp.task('css', css);
gulp.task('js', js);
gulp.task('img', imgCompress);
gulp.task('cssBuild', cssBuild);
gulp.task('jsBuild', jsBuild);
gulp.task('htmlBuild', htmlBuild);
gulp.task('build', gulp.parallel(cssBuild, jsBuild, htmlBuild)); // Use this to build your start project & again every time you push to live production
gulp.task('default', gulp.parallel(bs, watchFiles));