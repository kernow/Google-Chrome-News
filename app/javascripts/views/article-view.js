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
    console.log('loading link: ', this.model.get('link'));
    $('#browser_container').empty().append(App.templates.browser(this.model.toJSON()));
  }
});

App.ArticlesView = App.ArticleView.extend({
  initialize: function(){
    _.bindAll(this, 'render', 'add', 'remove');
    this.collection.bind('reset', this.render);
    this.collection.bind('add', this.add);
    this.collection.bind('remove', this.remove);
    
    $("#news_container").masonry({ isFitWidth: true });
  },
  add: function(article){
    $('#news_container').prepend(this.createArtilceView(article).render().el);
    this.postRender();
  },
  remove: function(article){
    $('#article-' + article.cid).remove();
    this.postRender();
  },
  render: function(){
    var self = this;

    this.collection.each(function(article){
      $('#news_container').append(self.createArtilceView(article).render().el);
    });
    
    $("#news_container").masonry("reload");
    
    
    this.postRender();

    return this;
  },
  postRender: function(){
    $(".timeago").timeago();
    $('#news_container>li').tsort('.timeago', { 'data': 'sort_by', 'order': 'desc' });
    
    $("#news_container").masonry('reload');
  },
  createArtilceView: function(article){
    return new App.ArticleView({
      model:      article,
      id:         "article-" + article.cid,
      className:  "news_item in_category_" + article.get("category").toLowerCase().split(' ').join('_')
    });
  }
});
