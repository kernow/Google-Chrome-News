/*
 * Authors:       Jamie Dyer (http://kernowsoul.com)
 * Last changed:  2012-06-11
 */

/*global App: false, news_browser: false */

App.ArticleView = Backbone.View.extend({
  tagName:    "li",

  render: function(){
    $(this.el).html(App.templates.article(this.model.toJSON()));
    return this;
  },
  events: {
    "click": "openLink"
  },
  openLink: function(){
    $("body").toggleClass("news_loaded");
    
    news_browser.postMessage(this.model.get('link'));
  }
});

App.ArticlesView = App.ArticleView.extend({
  initialize: function(){
    _.bindAll(this, 'render', 'add', 'remove');
    this.collection.bind('reset', this.render);
    this.collection.bind('add', this.add);
    this.collection.bind('remove', this.remove);
  },
  add: function(article){
    $('#news_container').prepend(this.createArtilceView(article).render().el);
    $(".timeago").timeago();
  },
  remove: function(article){
    $('#article-' + article.cid).remove();
  },
  render: function(){
    var self = this;
    
    this.collection.each(function(article){
      $('#news_container').append(self.createArtilceView(article).render().el);
    });
    
    $(".timeago").timeago();
    
    $("#news_container").imagesLoaded(function(){
      $("#news_container").masonry({ isFitWidth: true });
    });
    
    return this;
  },
  createArtilceView: function(article){
    return new App.ArticleView({
      model:      article,
      id:         "article-" + article.cid,
      className:  "news_item in_category_" + article.get("category").toLowerCase().split(' ').join('_')
    });
  }
});
