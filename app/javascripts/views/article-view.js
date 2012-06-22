/*
 * Authors:       Jamie Dyer (http://kernowsoul.com)
 * Last changed:  2012-06-11
 */

/*global App: false, news_browser: false */

App.ArticleView = Backbone.View.extend({
  tagName: "li",

  render: function(){
    $(this.el).html(App.templates.article(this.model.toJSON()));
    return this;
  },
  events: {
    "click": "openLink"
  },
  openLink: function(){
    // Set the article title as the browser heading text
    $(".browser_heading").text(this.model.get("title"));

    // Update the intent triggers hrefs for reference
    $(".save_trigger, .share_trigger").attr("href", this.model.get("link"));
    
    // Set the body class to trigger the article loaded state and styles
    $("body").toggleClass("news_loaded");

    // Empty the browser wrapper and append a new browser object
    $('#browser_container').empty().append(App.templates.browser(this.model.toJSON()));
  }
});

App.ArticlesView = App.ArticleView.extend({
  initialize: function(){
    _.bindAll(this, 'render', 'add', 'remove', 'articlesFromCategoryRemoved');
    this.collection.bind('reset', this.render);
    this.collection.bind('add', this.add);
    this.collection.bind('remove', this.remove);
    this.collection.bind('articlesFromCategoryRemoved', this.articlesFromCategoryRemoved);

    $("#news_container").masonry({
      itemSelector: ".news_item:visible",
      isFitWidth: false,
      layoutPriorities: { shelfOrder: 1.21 }
    });
  },
  add: function(article){
    $('#news_container').prepend(this.createArtilceView(article).render().el);
    this.postRender();
  },
  remove: function(article){
    $('#article-' + article.cid).remove();
    // We don't call postRender after removing an article as it's an expensive operation
    // and can slow down the browser. Instead we listen out of the articlesFromCategoryRemoved event
    // and call postRender then
  },
  articlesFromCategoryRemoved: function(){
    this.postRender();
  },
  render: function(){
    var self = this;

    this.collection.each(function(article){
      $('#news_container').append(self.createArtilceView(article).render().el);
    });

    this.postRender();

    return this;
  },
  postRender: function(){
    $(".timeago").timeago();

    $('#news_container>li').tsort('.timeago', { 'data': 'sort_by', 'order': 'desc' });

    $("#news_container").masonry("reload");
  },
  createArtilceView: function(article){
    return new App.ArticleView({
      model:      article,
      id:         "article-" + article.cid,
      className:  "news_item in_category_" + article.get("categoryEnglish").underscore()
    });
  }
});

App.CloseBrowserView = Backbone.View.extend({
  initialize: function(){
    // Fetch the close button from DOM    
    this.setElement('.close_browser_trigger');
  },
  
  events: { 
    click: function(){
      $("body").removeClass("news_loaded");

      $("#browser_container").html("");

      return false;
    } 
  }
});