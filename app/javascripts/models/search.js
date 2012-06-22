/*
 * Authors:       Jamie Dyer (http://kernowsoul.com)
 * Last changed:  2012-06-11
 */

/*global App: false */

App.SearchResult = Backbone.Model.extend({});

App.SearchResults = Backbone.Collection.extend({

  model: App.SearchResult,

  initialize: function(){
    this.on('articleGrabbedWithImage',  this.storeImage,  this);
    this.on('articleGrabbed',           this.saveItem,    this);
    this.on('imageGrabbed',             this.saveItem,    this);
  },

  getFromFeed: function(query, feed){
    // clear the collection of any previous results
    this.removeAll();
    var self = this;
    var language = App.settings.get('feedLanguage');
    var feedUri = feed.uri({ 'query': query, 'language': language });
    console.log('getting news from: ' + feedUri);
    jQuery.getFeed({
      url: feedUri,
      success: function(result) {
        $.each(result.items, function(i, item){

          // parse the feed using the supplied feed parser
          var parsedItem = feed.parseItem(item);

          // Only store the image and save the article if it not already in teh database
          if(!self.get(item.id)){
            if(parsedItem.image){
              self.trigger('articleGrabbedWithImage', parsedItem);
            }else{
              self.trigger('articleGrabbed', parsedItem);
            }
          }
        });
      }
    });
  },

  saveItem: function(item){
    var searchResult = new App.SearchResult(item);
    searchResult.save();
    this.add(searchResult);
  },

  // grabbs the remote image linked in the article and saves it to the local store
  storeImage: function(item){
    // TODO only request images that haven't already been downloaded
    var xhr = new XMLHttpRequest();
    var self = this;
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
          self.trigger('imageGrabbed', item);
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
