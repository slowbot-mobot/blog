$(document).ready(function(){
  var posts = [];
  var mergeArticleJson = function(template, json){
    return [
    template.find('#taggedPostTemplate.title') 
    ];
  };
  var insertTaggedPosts = function(){
    var json = JSON.parse($('<div/>').html($('#json_posts').html()).text());
    var tmpl = $('#taggedPostTemplate').html();
    for (var key in json){
      posts.push(mergeArticleJson(tmpl, json[key]));
    }
  };
  insertTaggedPosts();
  console.log(posts);
});
