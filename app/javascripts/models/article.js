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
  id: "google-news-database",
  description: "News acrticles",
  migrations : [{
    version: 1,
    migrate: function (transaction, next) {
      var store = transaction.db.createObjectStore("articles");
      store.createIndex("categoryIndex", "category", { unique: false }); // Adds an index on the categories
      next();
    }
  }]
};

App.Article = Backbone.Model.extend({
  database:   App.articlesDatabase,
  storeName:  "articles",

  initialize: function(){
    this.on('destroy', this.destroyFile, this);
  },

  // When the record is destroyed remove the image from the filesystem
  destroyFile: function(article){
    App.filer.rm(article.get('image'), function(){});
  }
});

App.Articles = Backbone.Collection.extend({
  database:   App.articlesDatabase,
  storeName:  "articles",
  model:      App.Article,

  // sort articles by the updatedTime field so that newest articles are first
  comparator: function(article) {
    return -article.get('updatedTime');
  },

  startProcessing: function(interval){
    if(!interval){ interval = 60000; } // Set the default interval to 60 seconds
    var self = this;
    if(this.intervalId){
      console.log('Calling stop processing from start...');
      this.stopProcessing();
    }
    console.log('started processing');
    this.intervalId = setInterval(function() {
      self.getFromFeed(App.googleFeed);
    }, interval);
  },

  stopProcessing: function(interval){
    var self = this;
    console.log('stopped processing');
    clearInterval(this.intervalId);
    clearInterval(this.timeOutIntervalId);
    delete this.intervalId;
    delete this.timeOutIntervalId;
    // If an interval is passed automatically resume processing in the specified time
    if(interval){
      console.log('Interval set, will start processing in: ', interval);
      this.timeOutIntervalId = setTimeout(function(){
        console.log('Starting processing from interval timeout');
        self.startProcessing();
      }, interval);
    }
  },

  getFromFeed: function(feed, category){
    var collection = this;
    var categories = category !== undefined ? [category] : App.settings.get('categories');
    var language = App.settings.get('feedLanguage');
    _.each(categories, function(category){
      var feedUri = feed.uri({ 'category': category, 'language': language.code });
      console.log('getting news from: ' + feedUri);
      jQuery.getFeed({
        url: feedUri,
        success: function(result) {
          $.each(result.items, function(i, item){

            // parse the feed using the supplied feed parser
            var parsedItem = feed.parseItem(item);

            // Save the english category name so we can use it programatically
            parsedItem.categoryEnglish = category;

            // instead of storing "nation" store the real country name
            if(category == "nation"){
              parsedItem.category = App.settings.get('feedLanguage').name;
            }

            // Only store the image and save teh article if it not already in the database
            if(!collection.get(item.id)){
              console.log('Adding and article');
              collection.storeImage(parsedItem);
            }
          });
        }
      });
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

  removeWithCategory: function(category){
    console.log('removing articles with category: ', category);
    var articles = this.where({ 'categoryEnglish': category });
    console.log(articles);
    _.each(articles, function(article){
      article.destroy();
    });
    console.log('articles removed');
    // raise event to call post render
    this.trigger("articlesFromCategoryRemoved");
  },

  // removes all articles from the database
  removeAll: function(){
    _.chain(App.articles.models).clone().each(function(model){
      model.destroy();
    });
  }
});
