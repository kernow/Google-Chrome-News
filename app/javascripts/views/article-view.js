/*global App: false, news_browser: false */

// ### Authors
// Jamie Dyer <http://kernowsoul.com>
// ### Last changed
// 2012-06-23



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

    // Save the currently open article in the settings model so the app's state is saved
    App.settings.saveOpenArticleId(this.model.get('id'));
  }
});

App.ArticlesView = Backbone.View.extend({
  initialize: function(){
    this.collection.on('reset', this.render, this);
    this.collection.on('add', this.add, this);
    this.collection.on('remove', this.remove, this);
    this.collection.on('reset', this.reset, this);
    this.collection.on('articlesRemoved', this.postRender, this);
    this.collection.on('articlesAdded', this.postRender, this);

    this.setElement("#news_container");

    this.$el.masonry({
      itemSelector: ".news_item:visible",
      isFitWidth: false,
      layoutPriorities: { shelfOrder: 1.21 }
    });
  },
  add: function(article){
    var articleView = this.createArtilceView(article);
    this.$el.prepend(articleView.render().el);

    var currentCategory = App.settings.getFilterCategory();
    if(currentCategory != 'allStories' && currentCategory != article.get('categoryEnglish')){
      articleView.$el.hide();
    }
  },
  remove: function(article){
    $('#article-' + article.cid).remove();
  },
  reset: function(){
    this.$el.empty();
  },
  articlesRemoved: function(){
    this.postRender();
  },
  render: function(){
    var self = this;

    this.collection.each(function(article){
      self.add(article);
    });

    this.postRender();

    return this;
  },
  postRender: function(){
    $(".timeago").timeago();

    $('#news_container>li').tsort('.timeago', { 'data': 'sort_by', 'order': 'desc' });

    this.$el.masonry("reload");
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

      // Remove the currently open article from the settings model so the app's state is saved
      App.settings.saveOpenArticleId('');

      return false;
    }
  }
});
