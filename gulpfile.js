var gulp 		    = require('gulp');
var sass 		    = require('gulp-sass');
var browserSync = require('browser-sync');
var reload 	  	= browserSync.reload;
var nodemon   	= require('gulp-nodemon');
var prefix 	  	= require('gulp-autoprefixer');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var minifyCSS   = require('gulp-minify-css');

var paths = {
	sass: './public/assets/sass/*.sass'
};
var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('browser-sync', ['sass', 'nodemon', 'minify'], function() {
    browserSync({
        proxy: 'http://localhost:3000',
  		port: 4000,
   		notify: false
    });
});

gulp.task('sass', function () {
    return gulp.src('public/assets/sass/style.sass')
        .pipe(sass({
            includePaths: ['sass'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('public/assets/css/'))
        .pipe(minifyCSS())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('public/assets/css'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'server.js',
    watch: ['server.js']
  })
    .on('start', function onStart() {
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      setTimeout(function reload() {
        browserSync.reload({
          stream: false  
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});


gulp.task('minify', function () {
  gulp.src(['public/app/js/script.js'])
      .pipe(uglify())
      .pipe(rename('script.min.js'))
      .pipe(gulp.dest('public/app/js/build'));
});

gulp.task('watch', function () {
    gulp.watch('public/assets/sass/*.sass', ['sass']);
    gulp.watch('public/app/js/*',['minify']);
    gulp.watch(['public/app/js/*','public/app/views/*', 'public/app/views/*/*'], reload);
});

gulp.task('default', ['browser-sync', 'watch']);