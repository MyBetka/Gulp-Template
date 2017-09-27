var gulp = require('gulp'), // npm install gulp-cli -g
	sass = require('gulp-sass'), // npm gulp-sass --save-dev
	browserSync = require('browser-sync'), // npm install browser-sync --save-dev
	postcss = require('gulp-postcss'), // npm install gulp-postcss --save-dev
	uncss = require('postcss-uncss'); // npm install postcss-uncss --save-dev

gulp.task('sass', function(){
	return gulp.src('app/sass/*.sass')
		.pipe(sass())
		.pipe(gulp.dest('app'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('watch', ['browser-sync', 'sass'], function(){
	gulp.watch('app/sass/*.sass', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/*.js', browserSync.reload);
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	})
})
gulp.task('css-clean', function () {
    var plugins = [
        uncss({
            html: ['app/*.html']
        }),
    ];
    return gulp.src('app/*.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('css'));
});

