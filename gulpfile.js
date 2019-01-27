/* jshint esversion: 6 */

const gulp = require('gulp');
// MINIFY PLUGINS
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
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
// AUTOPREFIXER PLUGINS
const postcss = require('gulp-postcss');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');

//SASS BUILD
gulp.task('styles', () => {
   gulp.src('src/**/sass/*.scss')
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(concat('main.css'))
      .pipe(gulp.dest('production/'))
      .pipe(browserSync.stream());
});

// JAVASCRIPT BUILD
gulp.task('js', () => {
   gulp.src('src/**/js/*.js')
      .pipe(concat('main.js'))
      .pipe(gulp.dest('production/'));
});
//HTML BUILD
gulp.task('html', () => {
   gulp.src('src/*.html')
      .pipe(gulp.dest('production/'));
});

// MINIFY FILES
// JAVASCRIPT
gulp.task("minify-js", () => {
   gulp.src('production/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('production/'));
});
// CSS
gulp.task("minify-css", () => {
   gulp.src('production/*.css')
      .pipe(autoprefixer({
         browsers: ['last 2 versions'],
         cascade: false
      }))
      .pipe(cleanCSS({
         compatibility: 'ie8'
      }))
      .pipe(gulp.dest('production/'));
});
// HTML
gulp.task("minify-html", () => {
   gulp.src('production/*.html')
      .pipe(htmlmin({
         collapseWhitespace: true
      }))
      .pipe(gulp.dest('production/'));
});

//IMAGE COMPRESSION
gulp.task('img-compression', () => {
   gulp.src(['src/img/**/*'])
      .pipe(newer('production/img/'))
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
            quality: 78
         }), // 100 highest quality
      ], {
         verbose: true
      }))
      .pipe(gulp.dest('production/img'));
});

// BROWSERSYNC
gulp.task('serve', () => {
   browserSync.init({
      // files: ['src' + '/**/'],
      open: false,
      // port: 4000,
      server: {
         baseDir: 'production'
      }
   });
   gulp.watch('src/**/sass/*.scss', ['styles']);
   gulp.watch('src/**/js/*.js', ['js']).on("change", browserSync.reload);
   gulp.watch('src/*.html', ['html']).on("change", browserSync.reload);
   gulp.watch('src/img/**/*', ['img-compression']).on("change", browserSync.reload);
});

// GULP COMMANDS
gulp.task('default', ['styles', 'js', 'html', 'serve', 'img-compression']); // type gulp
gulp.task('minify', ['minify-css', 'minify-js', 'minify-html']); // type gulp minify