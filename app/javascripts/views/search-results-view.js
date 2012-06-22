/*
 * Authors:       Jamie Dyer (http://kernowsoul.com)
 * Last changed:  2012-06-11
 */

/*global App: false */

App.SearchResultsView = App.ArticleView.extend({
  initialize: function(){
    this.setElement('#search_container');
    
    this.$el.masonry({ 
      itemSelector: ".news_item:visible",
      isFitWidth: false,
      layoutPriorities: { shelfOrder: 1.21 } 
    });
    
    _.bindAll(this, 'render', 'add');
    this.collection.bind('add', this.add);
  },

  add: function(article){
    this.$el.prepend(this.createArtilceView(article).render().el);
    $(".timeago").timeago();
    this.$el.masonry("reload");
  },

  createArtilceView: function(article){
    return new App.ArticleView({
      model:      article,
      id:         "article-" + article.cid,
      className:  "news_item in_category_" + article.get("category").toLowerCase().split(' ').join('_')
    });
  }
});
