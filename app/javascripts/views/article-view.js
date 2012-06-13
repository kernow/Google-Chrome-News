/*
 * Authors:       Jamie Dyer (http://kernowsoul.com)
 * Last changed:  2012-06-11
 */

/*global App: false, newsbrowser: false */

App.ArticleView = Backbone.View.extend({
  initialize: function(){
    // this.template = _.template($('#article-template').html());
  },
  render: function(){
    $(this.el).html(App.templates.article(this.model.toJSON()));
    return this;
  },
  events: {
    'click a': 'openLink'
  },
  openLink: function(){
    console.log("loading link: ", this.model.get('link'));
    // load the link into the browser tag plugin
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
    $('#news_container').prepend(new App.ArticleView({ model: article, id: 'article-' + article.cid }).render().el);
  },
  remove: function(article){
    $('#article-' + article.cid).remove();
  },
  render: function(){
    this.collection.each(function(article){
      $('#news_container').append(new App.ArticleView({ model: article, id: 'article-' + article.cid }).render().el);
    });
    return this;
  }
});
