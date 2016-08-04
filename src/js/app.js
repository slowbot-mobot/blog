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
    $('#taggedPostTemplate').append( $("<div></div>").addClass("title").text(title));
    $('#taggedPostTemplate').append( $("<div></div>").addClass("author").text(author));
    $('#taggedPostTemplate').append( $("<div></div>").addClass("date").text(date));
    $('#taggedPostTemplate').append( $("<div></div>").addClass("body").text(body));
  };
  var postRunner = function(json){
    for (var key = 0; key < json.length; key++){
      injectPost(json[key]);
    }
  };
  var urlParser = function(){
      
  };
  postRunner(jsonPosts);
});
