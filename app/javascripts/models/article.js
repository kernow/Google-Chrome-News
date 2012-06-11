/*
 * Authors:       Jamie Dyer (http://kernowsoul.com)
 * Last changed:  2012-06-11
 */

/*global App: false */

/*
 * Article Model
 * Fields title, source, link, category, date, originalData
 */

App.articlesDatabase = {
  id: "articles-database",
  description: "News acrticles",
  migrations : [{
      version: 1,
      migrate:function (transaction, next) {
        var store = transaction.db.createObjectStore("articles");
        next();
      }
  }]
};

App.Article = Backbone.Model.extend({
  database:   App.articlesDatabase,
  storeName:  "articles"
});

App.Articles = Backbone.Collection.extend({
  database:   App.articlesDatabase,
  storeName:  "articles",
  model:      App.Article,

  // sort articles by the updated field so that newest articles are first
  comparator: function(article) {
    var time = new Date(article.get("updated")).getTime();
    return -time;
  },

  getFromFeed: function(feed){
    var collection = this;
    var feedUri = feed.uri("topStories");
    console.warn('getting news from: ' + feedUri);
    jQuery.getFeed({
      url: feedUri,
      success: function(feed) {
        $.each(feed.items, function(i, item){

          // parse the feed using the supplied feed parser
          var parsedItem = feed.parseItem(item);

          // create a new article record
          var article = new App.Article(parsedItem);
          article.save();


          collection.add(article);
        });
      }
    });
  }
});
