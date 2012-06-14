/*
 * Authors:       Jamie Dyer (http://kernowsoul.com)
 * Last changed:  2012-06-11
 */

/*global App: false */
$(function() {
  // Setup code goes here
  App.articles = new App.Articles();
  new App.ArticlesView({ collection: App.articles });
  App.articles.fetch();

  $(window).scroll(function(){
    if($(this).scrollTop() > 0){
      $("body").addClass("in_scroll");
    }else{
      $("body").removeClass("in_scroll");
    }
  });

});

$(window).load(function(){
  $("#news_container").masonry({ isFitWidth: true });
  setTimeout(function(){ $("body").addClass("news_loaded"); }, 900);
});
