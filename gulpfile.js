(function() {
  "use strict";

  var site = {
    posts: []
  };

  var gulp    = require('gulp');
  var fs    = require('fs');
  var concat = require('gulp-concat-util');
  var plugins = require('gulp-load-plugins')();
  var bSync   = require('browser-sync');
  var reload  = bSync.reload;
  var blogUtil= require('./lib/utility');
  var nunjucks = require('nunjucks');
  var del       = require('del');
  var through2  = require('through2');
  var dateFormat = require('dateformat');

  var summarize = function(html) {
    var parts = [];
    parts = html.split("<!--Summary ends here -->");
    return parts[0];
  };

  var collectPosts = function() {
    var posts = [];

    return through2.obj(function(file, enc, cb) {
      var post = file.page;
      post.content = file.contents.toString();
      post.summary = summarize(post.content);
      post.published_on = dateFormat(post.date_string, "dddd, mmmm dd yyyy");
      posts.push(post);
      this.push(file);
      cb();
    }, function(cb) {
      site.posts = posts;
      cb();
    });
  };
  
  var nunOpts = {
    path: ["src/templates"], 
    engine: 'nunjucks'
  };

  gulp.task("clean", function() {
    return del('dist');
  });

  gulp.task('blog', function() {
    return gulp.src("src/posts/**/*.md")
      .pipe(plugins.frontMatter({ property: "page", remove: true }))
      .pipe(plugins.data({site: site}))
      .pipe(collectPosts())
      .pipe(plugins.markdown())
      .pipe(plugins.wrap(function (data) {
        return fs.readFileSync('src/templates/post.html').toString();
      }, null, nunOpts)) 
    .pipe(plugins.htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest("dist/blog"))
      .pipe(reload({stream: true}));
  });

  gulp.task('pages', function() {
    return gulp.src(["src/pages/**/*.html"])
      .pipe(plugins.data({site: site}))
      .pipe(plugins.nunjucksRender(nunOpts))
      .pipe(plugins.htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest("dist/"))
      .pipe(reload({stream: true}));
      });

  gulp.task('images', function() {
    return gulp.src(["src/img/**/*"])
      .pipe(gulp.dest("dist/img"))
      .pipe(reload({stream: true}));
      });

  gulp.task('static', function() {
    return gulp.src(["src/static/**/*"])
      .pipe(gulp.dest("dist"))
      .pipe(reload({stream: true}));
      });

  gulp.task('scripts', function() {
    return gulp.src(["src/js/**/*.js"])
       .pipe(plugins.uglify())
       .pipe(concat('app.min.js'))
       .pipe(gulp.dest("dist/js"))
       .pipe(reload({stream: true}));
      });

  gulp.task('styles', function() {
    return gulp.src(["src/css/**/*.css"])
        .pipe(plugins.cssmin())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest("dist/css"))
        .pipe(reload({stream: true}));
      });

  gulp.task('serve', function(cb) {
    return plugins.sequence('sync', 'watch', cb);
      });

  gulp.task('assets', ['images', 'styles', 'scripts']);

  gulp.task('content', function(cb) {
    return plugins.sequence('static', 'blog', 'pages', cb);
      });

  gulp.task('sync', function() {
    return bSync({server: { baseDir: 'dist' }});
      });

  gulp.task('watch', function() {
    gulp.watch( [ "src/posts/**/*"   ] , [ 'content' ] );
    gulp.watch( [ 'src/js/**/*.js'   ] , [ 'scripts' ] );
    gulp.watch( [ 'src/css/**/*.css' ] , [ 'styles'  ] );
    gulp.watch( [ 'src/**/*.html'    ] , [ 'content' ] );
    gulp.watch( [ 'src/images/**/*'  ] , [ 'images'  ] );
  });

  gulp.task('deploy', function() {
    return gulp.src('./dist/**/*')
               .pipe(ghPages());
  });

  gulp.task('production', plugins.sequence('clean', 'assets', 'content', 'pages', 'blog'));

  gulp.task('default', plugins.sequence('clean', 'assets', 'content', 'pages', 'blog', 'serve'));
})();
