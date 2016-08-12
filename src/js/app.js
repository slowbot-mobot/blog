$(document).ready(function(){
  var jsonPosts = JSON.parse($('<div/>').html($('#json_posts').html()).text());
  //var currTags = JSON.parse($('<div/>').html($('#currTags').html()).text());

  var injectPost = function(json){
    var title = json.title;
    var author = json.author;
    var body = json.summary;
    var date = json.published_on;
    var link = json.permalink;
    var html = $('#taggedPostTemplate').clone();
    html.removeAttr('id');
    html.append( $("<div></div>").addClass("post-title").text(title));
    html.append( $("<div></div>").addClass("post-author").text(author));
    html.append( $("<div></div>").addClass("post-date").text(date));
    html.append( $("<div></div>").addClass("post-body").html(body));
    html.append( $("<a href=" + link + "></a>").addClass("post-link").text("Continue reading this article"));
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


  var populateRelatedPosts = function(json, tagsToSearch){
    injectRelatedPosts(json.filter(function(article){
      return article.title !== $('.post-title h2').text();
    }).filter(function(article){
      return article.tags.filter(function(tag){
        return tagsToSearch.includes(tag);
      });
    }));
  };

  var injectRelatedPosts = function(similarPosts){
    _.sample(similarPosts, 3).forEach(function(post){
      var related = $("#relatedPostTemplate").clone();
      related.removeAttr('id');
      related.append( $("<a href=" + post.permalink + "></a>").addClass("title").text(post.title));
      $('#relatedPosts').append(related);
    });
  };
  populateRelatedPosts(jsonPosts, $("#currTags").text().split(',') );
  populateTaggedPosts(jsonPosts);
});
