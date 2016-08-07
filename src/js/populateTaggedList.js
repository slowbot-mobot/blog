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

  var populateTaggedPosts = function(json){
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
/*
  var populateRelatedPosts = function(json, tagsToSearch){
   for (key = 0; key < json.length; key++){
     for (key=0; key < json[key].tags.length; key++){
      var searchableList = [];
      searchableList.push(json[key].tags); 
      }
     var tagBeingSearched; 
     for searchableList
    }
  };
  */
  populateTaggedPosts(jsonPosts);
});
