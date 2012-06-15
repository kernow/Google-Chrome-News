/*
 * Authors:       Jamie Dyer (http://kernowsoul.com)
 * Last changed:  2012-06-11
 */

/*global App: false, Filer: false */

$(function() {

  // initialize settings

  // Create a new settings model
  App.settings = new App.Settings();

  // Fetch the settings from the sync storage
  App.settings.fetch({
    success: function(){

      // If no categories have been previously stored load the defaults from the json file
      if(!App.settings.get('categories')){
        console.log('loading default categories');
        $.getJSON('javascripts/settings.json', function(data) {

          // Save the categories in the settings model
          App.settings.save({ "categories" : data.defaultCategories });

          // Now we have the settings loaded we can initialize the articles
          App.initializeArtilces();
        });
      }else{

        // Settings have been fetched so we can initialize the articles
        App.initializeArtilces();
      }
    }
  });
});

App.initializeArtilces = function(){
  // initialize filer
  App.filer = new Filer();
  App.filer.init({persistent: true, size: 1024 * 1024}, function(fs) {
    App.filer.size = 10485760; // set the file size limit to 10 mb

    App.articles = new App.Articles();
    new App.ArticlesView({ collection: App.articles });
    App.articles.fetch({
      success: function(){

        // Load articles on initialisation
        App.articles.getFromFeed(App.googleFeed);

        // Load new articles every minute
        setInterval(function() {
          App.articles.getFromFeed(App.googleFeed);
        }, 60000);
      }
    });
  }, function(e){
    console.warn('error: ', e);
  });
};
