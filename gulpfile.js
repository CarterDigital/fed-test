// npm install 'gulpjs/gulp.git#4.0' --save-dev

var gulp = require('gulp')
var log = require('fancy-log')
var concat = require('gulp-concat')
var sass = require('gulp-sass')
var browserSync = require('browser-sync').create()
var browserify = require('gulp-browserify')
var jsminify = require('gulp-uglify')
var handlebars = require('gulp-handlebars')
var cleanCSS = require('gulp-clean-css')
var wrap = require('gulp-wrap')
var declare = require('gulp-declare')
var autoprefixer = require('gulp-autoprefixer')

var prodDirectory = 'prod/'
var devDirectory = 'dev/'
var sources =
  {
    'sass': [devDirectory + 'sass/*.scss'],
    'js': [devDirectory + 'js/*.js'],
    'css': [devDirectory + 'sass/*.css'],
    'hbs': [devDirectory + 'js/hbs/*.hbs'],
    'html': [devDirectory + 'html/*.html']
  }
var paths =
  {
    'sassDev': devDirectory + 'sass/',
    'sassDist': prodDirectory,
    'jsDev': devDirectory + 'js/',
    'jsDist': prodDirectory,
    'hbs': devDirectory + 'js/',
    'html': prodDirectory
  }
var watching =
  {
    'sass': sources.sass,
    'js': sources.js,
    'css': prodDirectory + '*.css',
    'html': sources.html,
    'hbs': sources.hbs
  }

gulp.task('browser-sync', function () {
  browserSync.init({
    proxy: 'localhost'
  })
  log('BrowserSync Initiated')
})

gulp.task('sass', function () {
  return gulp.src(sources.sass)
    .pipe(sass({sourceComments: true}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: [
        'last 2 versions',
        'ie >= 9'
      ],
      cascade: false
    }))
    .pipe(gulp.dest(paths.sassDev))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.sassDist))
    .pipe(browserSync.stream())
})

gulp.task('js', function () {
  return gulp.src(sources.js)
  .pipe(concat('script.js'))
  .pipe(browserify())

    // .pipe(gulp.dest(paths.jsDev))
    .pipe(jsminify())
    .pipe(gulp.dest(paths.jsDist))
    .pipe(browserSync.stream())
})

gulp.task('handlebars', function () {
  return gulp.src(sources.hbs)
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'MyApp.templates',
      noRedeclare: true // Avoid duplicate declarations
    }))
    .pipe(concat('templates.js'))
    .pipe(jsminify())
    .pipe(gulp.dest(prodDirectory))
    .pipe(browserSync.stream())
})

gulp.task('css', function () {
  return gulp.src(watching.css)
  .pipe(browserSync.stream())
})

gulp.task('html', function (done) {
  return gulp.src(sources.html)
  .pipe(gulp.dest(paths.html))
  .pipe(browserSync.stream())
})

gulp.task('watch', gulp.parallel('browser-sync', function (done) {
  gulp.watch(watching.sass, gulp.parallel('sass'))
  gulp.watch(watching.js, gulp.parallel('js'))
  gulp.watch(watching.css, gulp.parallel('css'))
  gulp.watch(watching.html, gulp.parallel('html'))
  gulp.watch(watching.hbs, gulp.parallel('handlebars'))
  done()
}))

gulp.task('default', gulp.parallel(
  'sass',
  'js',
  'handlebars',
  'html',
  'watch'
))
