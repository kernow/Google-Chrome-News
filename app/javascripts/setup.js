/*
 * Authors:       Jamie Dyer (http://kernowsoul.com)
 * Last changed:  2012-06-11
 */

/*global App: false, Filer: false */
$(function() {
  // initialize filer
  App.filer = new Filer();
  App.filer.init({persistent: true, size: 1024 * 1024}, function(fs) {
    // filer.size == Filer.DEFAULT_FS_SIZE
    // filer.isOpen == true
    // filer.fs == fs

    App.articles = new App.Articles();
    new App.ArticlesView({ collection: App.articles });
    App.articles.fetch({
      success: function(){
        App.articles.getFromFeed(App.googleFeed);
      }
    });
  }, function(e){
    console.warn('error: ', e);
  });

  $(window).scroll(function(){
    if($(this).scrollTop() > 0){
      $("body").addClass("in_scroll");
    }else{
      $("body").removeClass("in_scroll");
    }
  });
});
