(function() {
  var gulp = require('gulp');
  var markdown = require('gulp-markdown');

  gulp.task('blog', function() {
    return gulp.src("src/posts/**/*.md")
               .pipe(markdown())
               .pipe(gulp.dest("dist/blog"));
  });

  gulp.task('default', ['blog']);
})();
