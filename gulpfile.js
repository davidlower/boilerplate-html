/* jshint esversion: 6 */

const gulp = require('gulp');
// MINIFY PLUGINS
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const purge = require('gulp-css-purge');
const groupmq = require('gulp-group-css-media-queries');
// CONCAT PLUGIN
const concat = require('gulp-concat');
// IMAGE COMPRESSION PLUGINS
const imagemin = require('gulp-imagemin');
const imageminOptipng = require('imagemin-optipng');
const imageminSvgo = require('imagemin-svgo');
const imageminMozjpeg = require('imagemin-mozjpeg');
const newer = require('gulp-newer');
// BROWSER-SYNC PLUGIN
const browserSync = require('browser-sync').create();
// CSS & AUTOPREFIXER PLUGINS
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
// SOURCEMAPS
const sourcemaps = require('gulp-sourcemaps');

//CSS
function css(done) {
   gulp.src('src/**/*.scss', 'src/scss/**/*.css')
      .pipe(sourcemaps.init())
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(concat('main.css'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('production'));
   done();
}

// CSS BUILD - AUTOPREFIXER, MINIFICATION, PURGING, MEDIA-QUERIES
function cssBuild(done) {
   gulp.src('production/*.css')
      .pipe(groupmq())
      .pipe(purge({
         trim: true,
         shorten: true,
         verbose: true
      }))
      .pipe(autoprefixer({
         browsers: ['last 2 versions'],
         cascade: false
      }))
      .pipe(cleanCSS({
         compatibility: 'ie8'
      }))
      .pipe(gulp.dest('production'));
   done();
}

// HTML
function html(done) {
   gulp.src('src/*.html')
      .pipe(gulp.dest('production'));
   done();
}

// HTML BUILD - MINIFY HTML
function htmlBuild(done) {
   gulp.src('production/*.html')
      .pipe(htmlmin({
         collapseWhitespace: true
      }))
      .pipe(gulp.dest('production'));
   done();
}

// JAVASCRIPT
function js(done) {
   gulp.src('src/**/*.js')
      .pipe(concat('main.js'))
      .pipe(gulp.dest('production'));
   done();
}

// JAVASCRIPT BUILD - MINIFY JS
function jsBuild(done) {
   gulp.src('production/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('production'));
   done();
}

// LAUNCH THIS AT THE BEGINNING OF ANY PROJECT - GRABS ALL ASSETS FROM NODE MODULES
// If sections are commented out it means they are not needed for this project
function launchProject(done) {
   // LITY - LIGHTBOX MODULE FOR JQUERY
   gulp.src('node_modules/lity/dist/lity.min.js')
      .pipe(gulp.dest('src/assets/js'));
   gulp.src('node_modules/lity/dist/lity.min.css')
      .pipe(gulp.dest('src/assets/sass'));

   // JQUERY
   gulp.src('node_modules/jquery/dist/jquery.min.js')
      .pipe(gulp.dest('src/assets/js'));

   // SIMPLE GRID - GRID SYSTEM LIKE BOOTSTRAP
   gulp.src('node_modules/simplegrid/simple-grid.scss')
      .pipe(gulp.dest('src/assets/sass'));

   // SLICK CAROUSEL - SLIDER MODULE FOR JQUERY
   gulp.src('node_modules/slick-carousel/slick/slick.min.js')
      .pipe(gulp.dest('src/assets/js'));
   gulp.src('node_modules/slick-carousel/slick/slick.scss')
      .pipe(gulp.dest('src/assets/sass'));
   done();
}

//IMAGE COMPRESSION
function imgCompression(done) {
   gulp.src('src/img/**/*')
      .pipe(newer('production/img'))
      .pipe(imagemin([
         //png
         imageminOptipng({
            optimizationLevel: 5
         }), // 0-7 low-high.
         //svg
         imageminSvgo({
            plugins: [{
               removeViewBox: false
            }]
         }),
         //jpg
         imageminMozjpeg({
            quality: 79
         }), // highest quality 100
      ], {
         verbose: true
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
         baseDir: 'production'
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
   gulp.watch('src/img/**/*', imgCompression);
   gulp.watch('src/*.html', html);
   gulp.watch(
      [
         'src/**/*'
      ],
      browserSyncReload);
   done();
}

gulp.task('css', css);
gulp.task('js', js);
gulp.task('img', imgCompression);
gulp.task('cssBuild', cssBuild);
gulp.task('jsBuild', jsBuild);
gulp.task('htmlBuild', htmlBuild);
gulp.task('build', gulp.series(cssBuild, css, jsBuild, js, htmlBuild, html)); // Use this to build your start project & again every time you push to live production
gulp.task('launch', launchProject); // Use this to fetch your assets or vendors - for example jQuery
gulp.task('default', gulp.parallel(css, imgCompression, js, html, bs, watchFiles));
