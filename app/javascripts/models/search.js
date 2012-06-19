/*
 * Authors:       Jamie Dyer (http://kernowsoul.com)
 * Last changed:  2012-06-11
 */

/*global App: false */

App.SearchResult = Backbone.Model.extend({});

App.SearchResults = Backbone.Collection.extend({

  model: App.SearchResult,

  getFromFeed: function(query, feed){
    // clear the collection of any previous results
    this.removeAll();
    var collection = this;
    var feedUri = feed.uri({ 'query': query });
    console.warn('getting news from: ' + feedUri);
    jQuery.getFeed({
      url: feedUri,
      success: function(result) {
        $.each(result.items, function(i, item){

          // parse the feed using the supplied feed parser
          var parsedItem = feed.parseItem(item);

          // Only store the image and save the article if it not already in teh database
          if(!collection.get(item.id)){
            console.log('Adding and article');
            // TODO add callback argument to storeImage call
            collection.storeImage(parsedItem);
          }
        });
      }
    });
  },

  saveItem: function(item){
    var article = new App.Article(item);
    article.save();
    this.add(article);
  },

  // grabbs the remote image linked in the article and saves it to the local store
  storeImage: function(item, callback){
    // TODO only request images that haven't already been downloaded
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
    _.chain(this.models).clone().each(function(model){
      model.destroy();
    });
  }
});
