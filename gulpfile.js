const gulp = require('gulp');

const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync');

const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const paths = {
  root: './build',
  templates: {
    pages: 'src/templates/pages/*.pug',
    src: 'src/templates/**/*.pug'
  },
  styles: {
    src: 'src/styles/**/*.scss',
    dest: 'build/assets/styles/'
  },
  images: {
    src: 'src/images/**/*.*',
    dest: 'build/assets/images/'
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'build/assets/scripts/'
  },
  fonts: {
    src: 'src/fonts/*.*',
    dest: 'build/assets/fonts/'
  }
}

//pug
function templates() {
  return gulp.src(paths.templates.pages)
    .pipe(plumber({
      errorHandler: notify.onError(function(error) {
        return {
          title: 'Pug',
          message: error.message
        };
      })
    }))
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(paths.root));
}

//sass
function styles() {
  return gulp.src('./src/styles/app.scss')
    .pipe(plumber({
      errorHandler: notify.onError(function(error) {
        return {
          title: 'Styles',
          message: error.message
        };
      })
    }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 3 versions', '> 5%']
    }))﻿
    .pipe(sourcemaps.write())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.styles.dest))
}

//Переносим стили библиотек
function lib_styles() {
  return gulp.src('src/styles/**/*.css')
    .pipe(gulp.dest(paths.styles.dest))
}

//clean
function clean() {
  return del(paths.root)
}

//Переносим скрипты
function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(gulp.dest(paths.scripts.dest));
}

//Переносим картинки
function images() {
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
}

//Переносим шрифты
function fonts() {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
}

//галповский вотчер
function watch() {
  gulp.watch(paths.templates.src, templates);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.scripts.src, scripts);
}

//локальный сервер + livereload
function server() {
  browserSync.init({
    server: paths.root
  });
  browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

exports.templates = templates;
exports.styles = styles;
exports.lib_styles = lib_styles;
exports.clean = clean;
exports.images = images;
exports.fonts = fonts;
exports.scripts = scripts;

gulp.task('default', gulp.series(
  clean,
  gulp.parallel(templates, styles, lib_styles, images, fonts, scripts),
  gulp.parallel(watch, server)
));