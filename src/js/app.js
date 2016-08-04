/*$(document).ready(function(){
  var posts = [];
  var mergeArticleJson = function(template, json){
    return template; 
  };
  var insertTaggedPosts = function(){
    var json = JSON.parse($('<div/>').html($('#json_posts').html()).text());
    console.log(json);
    var tmpl = $('#taggedPostTemplate').html();
    console.log(tmpl);
    for (var key in json){
      posts.push(mergeArticleJson(tmpl, json[key]));
    }
  };
  insertTaggedPosts();
  console.log(insertTaggedPosts());
});
*/

$(document).ready(function(){
  var jsonPosts = JSON.parse($('<div/>').html($('#json_posts').html()).text());

  var injectPost = function(json){
    var title = json.title;
    var author = json.author;
    var body = json.summary;
    var date = json.published_on;
    var html = $('#taggedPostTemplate').clone();
    html.removeAttr('id');
    html.append( $("<div></div>").addClass("title").text(title));
    html.append( $("<div></div>").addClass("author").text(author));
    html.append( $("<div></div>").addClass("date").text(date));
    html.append( $("<div></div>").addClass("body").html(body));
    $("#posts").append(html);
  };

  var postRunner = function(json){
    var query = urlParser().toString();
    var taggedPosts = [];
    for (var key = 0; key < json.length; key++){
      if (json[key].tags.indexOf(query) !== -1){
        taggedPosts.push(json[key]);
      }
    }
    for (key = 0; key < taggedPosts.length; key++){
      injectPost(taggedPosts[key]);
    }
  };

  var urlParser = function(){
    var query = window.location.search.substring(1);
    return query;
  };
  postRunner(jsonPosts);
});
