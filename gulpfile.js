(function() {
  "use strict";

  var site = {
    posts: []
  };

  var gulp    = require('gulp');
  var plugins = require('gulp-load-plugins')();
  var bSync   = require('browser-sync');
  var reload  = bSync.reload;
  var blogUtil= require('./lib/utility');

  var del       = require('del');
  var through2  = require('through2');

  var collectPosts = function() {
    var posts = [];

    return through2.obj(function(file, enc, cb) {
      var post = file.page;
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
               .pipe(plugins.frontMatter({ property: 'page', remove: true }))
               .pipe(plugins.markdown())
               .pipe(collectPosts())
               .pipe(plugins.htmlmin({collapseWhitespace: true}))
               .pipe(gulp.dest("dist/blog"))
               .pipe(reload({stream: true}));
  });

  gulp.task('pages', function() {
    return gulp.src(["src/pages/**/*.html", "src/templates/**/*.html"])
               .pipe(plugins.data({site: site}))
               .pipe(plugins.nunjucksRender({
                 path: ['src/templates']
               }))
               .pipe(plugins.htmlmin({collapseWhitespace: true}))
               .pipe(gulp.dest("dist"))
               .pipe(reload({stream: true}));
  });

  gulp.task('images', function() {
    return gulp.src(["src/img/**/*"])
               .pipe(gulp.dest("dist/img"))
               .pipe(reload({stream: true}));
  });

  gulp.task('scripts', function() {
    return gulp.src(["src/js/**/*.js"])
               .pipe(gulp.dest("dist/js"))
               .pipe(reload({stream: true}));
  });

  gulp.task('styles', function() {
    return gulp.src(["src/css/**/*.css"])
               .pipe(gulp.dest("dist/css"))
               .pipe(reload({stream: true}));
  });

  gulp.task('serve', function(cb) {
    return plugins.sequence('sync', 'watch', cb);
  });
  
  gulp.task('assets', ['images', 'styles', 'scripts']);

  gulp.task('content', function(cb) {
    return plugins.sequence('blog', 'pages', cb);
  });

  gulp.task('sync', function() {
    return bSync({server: { baseDir: 'dist' }});
  });

  gulp.task('watch', function() {
    gulp.watch(['src/posts/**/*'], ['content']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/css/**/*.css', ['styles']);
    gulp.watch(['src/**/*.html'], ['content']);
    gulp.watch('src/images/**/*', ['images']);
  });

  gulp.task('default', plugins.sequence('clean', 'assets', 'content', 'serve'));
})();
