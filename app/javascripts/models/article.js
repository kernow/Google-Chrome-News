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

  // sort articles by the updatedTime field so that newest articles are first
  comparator: function(article) {
    return -article.get('updatedTime');
  },

  getFromFeed: function(feed){
    var collection = this;
    var feedUri = feed.uri("topStories");
    console.warn('getting news from: ' + feedUri);
    jQuery.getFeed({
      url: feedUri,
      success: function(result) {
        $.each(result.items, function(i, item){

          // parse the feed using the supplied feed parser
          var parsedItem = feed.parseItem(item);
          collection.storeImage(parsedItem);
        });
      }
    });
  },

  saveItem: function(item){
    // TODO only save new articles, update existing ones
    var article = new App.Article(item);
    article.save();
    this.add(article);
  },

  // grabbs the remote image linked in the article and saves it to the local store
  storeImage: function(item, callback){
    var xhr = new XMLHttpRequest();
    var collection = this;
    xhr.responseType = "arraybuffer";
    xhr.onload = function() {
      var d = xhr.response;
      var newUrl = encodeURIComponent(item.image);
      var contentType = xhr.getResponseHeader('Content-Type');
      App.filer.write(
        newUrl,
        {data: d, type: contentType},
        function(fileEntry, fileWriter) {
          item.image = fileEntry.toURL();
          collection.saveItem(item);
        },
        function(e) {console.warn(e);}
      );
    };
    xhr.open("GET", item.image);
    xhr.send();
  },

  // removes all articles from the database
  removeAll: function(){
    _.chain(App.articles.models).clone().each(function(model){
      model.destroy();
    });
  }
});
