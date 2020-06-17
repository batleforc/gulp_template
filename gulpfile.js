const gulp = require('gulp'); //le moteur de gulp
const del = require('del');
const browserSync = require('browser-sync'); //HOT RELOAD
const babel = require('gulp-babel'); //Clean le code
const uglify = require('gulp-uglify'); // Minify the JS
const rename = require('gulp-rename'); //renome le code
const cleanCSS = require('gulp-clean-css'); //minify the CSS

// Clean "build" directory
const clean = () => {
    return del(['build/*'], {dot: true});
  };
  gulp.task('clean', clean);

function copy() { //permet de creer un dossier build
    return gulp.src([
      'app/*.html',
      'app/**/*.jpg',
      //'app/**/*.css',
      //'app/**/*.js' //process by processJS
    ])
    .pipe(gulp.dest('build'));
  }
gulp.task('copy', copy); //ajoute la tache de copy

function processJs() { //Clean le JS, le réduit et le renome
    return gulp.src('app/scripts/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('build/scripts'));
  }
gulp.task('processJs', processJs); //ajoute la tache pour clean le js

function processCss(){ //update les changement sur les fichier CSS
    return gulp.src('app/styles/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('build/styles'));
}
gulp.task('processCSS',processCss); //ajoute la tache pour clean le css

function watch() { //update les changement sur les fichier JS
    gulp.watch('app/scripts/*.js', processJs);
    gulp.watch('/app/styles/*.css',processCss);
} 
gulp.task('watch', watch);

const build = gulp.series(clean, copy, processCss,processJs);
gulp.task('build', build);
const browserSyncOptions = {
    server: 'build',
    port: 8081,
    open: false
  };
// L'interface de browser sync est en :3001 tendis que le webserveur sera en 3000
const serve = gulp.series(build, () => {
    browserSync.init(browserSyncOptions);
    return gulp.watch('app/**/*', build).on('change', browserSync.reload);
  });
  gulp.task('serve', serve);