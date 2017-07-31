let gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	htmlmin = require('gulp-htmlmin'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	del = require('del'),
	prefix = require('gulp-autoprefixer'),
	imagemin = require('gulp-imagemin');

//complete 
gulp.task('complete', function(){
	console.log("Готово, ошибок нет.")
});

//templates
gulp.task('templ', function() {
 	return gulp.src('./dev/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./prod/'));
});


//styles
gulp.task('styles', function () {
	return gulp.src('./dev/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix("last 5 version"))
    .pipe(gulp.dest('./dev/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('css-minify', ['styles'], function () {
	return gulp.src('dev/css/style.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('prod/css'))
	.pipe(browserSync.reload({stream: true}))
});

//browser-sync

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'prod',
		},
		notify: false
	})
});

//images
gulp.task('images', function () {
    gulp.src('./dev/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./prod/images'));

});


//scripts
gulp.task('libs', function () {
		gulp.src(['node_modules/jquery/dist/jquery.min.js','node_modules/magnific-popup/dist/jquery.magnific-popup.min.js'])
	    .pipe(concat('lib.js'))
	    .pipe(uglify())
	    .pipe(gulp.dest('prod/js'))
	    .pipe(gulp.dest('dev/js/lib'))
    });

gulp.task('scripts', function () {
     gulp.src('dev/js/*.js')
    .pipe(concat('functions.js'))
    .pipe(uglify())
    .pipe(gulp.dest('prod/js'))
    .pipe(browserSync.reload({stream: true}))
});


//clean
gulp.task('clean', function () {
	return del.sync('prod');
});


gulp.task('watch', ['browser-sync', 'libs', 'css-minify', 'templ', 'scripts'], function () {
	gulp.watch('dev/sass/**/*.scss', ['styles'])
	gulp.watch('dev/js/lib/**/*.js', browserSync.reload)
	gulp.watch('dev/js/**/*.js', ['scripts'])
	gulp.watch('dev/*.html', browserSync.reload)
	gulp.watch('dev/**/*.html', ['templ']);
	gulp.watch('dev/css/style.css', ['css-minify'])
	gulp.watch('img/**/*.{png,jpg,jpeg,gif,svg}', {cwd: './dev/'}, ['images']);
});


gulp.task('default', ['styles', 'scripts', 'images', 'templ']);
gulp.task('dev', ['default', 'watch']);
gulp.task('prod', ['default', 'complete']);
