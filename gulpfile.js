(function() {
  var site = {
    posts: []
  };

  var gulp           = require('gulp');
  var markdown       = require('gulp-markdown');
  var htmlmin        = require('gulp-htmlmin');
  var sequence       = require('gulp-sequence');
  var data           = require('gulp-data');
  var webserver      = require('gulp-webserver');
  var nunjucksRender = require('gulp-nunjucks-render');
  var frontMatter    = require('gulp-front-matter');

  var del       = require('del');
  var through2  = require('through2');

  var collectPosts = function() {
    var posts = [];

    return through2.obj(function(file, enc, cb) {
      var post = file.page;
      post.title = "foo title";
      post.content = file.contents.toString();
      posts.push(post);
      this.push(file);
      cb();
    }, function(cb) {
      site.posts = posts;
      cb();
    });
  };

  gulp.task("clean", function() {
    return del('dist');
  });

  gulp.task('blog', function() {
    return gulp.src("src/posts/**/*.md")
               .pipe(frontMatter({ property: 'page', remove: true }))
               .pipe(markdown())
               .pipe(collectPosts())
               .pipe(htmlmin({collapseWhitespace: true}))
               .pipe(gulp.dest("dist/blog"));
  });

  gulp.task('pages', function() {
    return gulp.src(["src/pages/**/*.html", "src/templates/**/*.html"])
               .pipe(data({site: site}))
               .pipe(nunjucksRender({
                 path: ['src/templates']
               }))
               .pipe(htmlmin({collapseWhitespace: true}))
               .pipe(gulp.dest("dist"));
  });

  gulp.task('serve', function() {
    gulp.src('dist')
      .pipe(webserver({
	livereload: true,
	directoryListing: false,
        host: "127.0.0.1",
        post: 3000,
	open: true
      }));
  });

  gulp.task('default', sequence('clean', 'blog', 'pages', 'serve'));
})();
