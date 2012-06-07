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

  getFromFeed: function(){
    var collection = this;
    var feedUri = chrome.i18n.getMessage("baseFeedUri") + chrome.i18n.getMessage("ned") + chrome.i18n.getMessage("TopStoriesParams");
    console.warn('getting news from: ' + feedUri);
    jQuery.getFeed({
      url: feedUri,
      success: function(feed) {
        $.each(feed.items, function(i, item){
          // extract the image url from the description and use a larger version
          // TODO support articles that have no image
          var image = $(item.description).find('img').eq(0).attr('src');
          image = image.replace('0.jpg', '11.jpg').replace('//', 'http://');
          item.image = image;

          // extract the source from the title
          var arr = item.title.split(/ - ([^\-]+)$/);
          item.title = arr[0];
          // tweak the title
          item.source = arr[1];
          var article = new App.Article(item);
          article.save();
          collection.add(article);
        });
      }
    });
  }
});
