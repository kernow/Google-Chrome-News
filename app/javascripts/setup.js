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

      $.getJSON('javascripts/settings.json', function(data) {

        App.defaultCategories   = data.defaultCategories;
        App.supportedLanguages  = data.languages;

        // If no categories have been previously stored set the default categories
        if(!App.settings.get('categories')){
          // Save the categories in the settings model
          App.settings.save({ "categories" : App.defaultCategories });
        }

        // If not feed language has been set create one
        if(!App.settings.get('feedLanguage')){
          App.settings.save({ "feedLanguage" : chrome.i18n.getMessage("languageCode") });
        }

        // Settings have been fetched so we can initialize the articles and settings view
        App.initializeArtilces();
        App.initializeSettingsView();
      });
    }
  });

  // send a message to the background process to stop working every 60 seconds
  // currently there is no event for when the app window is closed so we get the main app to send a message to
  // the background process every 60 seconds telling it to stay paused. There should be an onSuspend event at
  // some point which can be used instead of this code
  chrome.extension.sendMessage('pause');
  setInterval(function() {
    chrome.extension.sendMessage('pause');
  }, 60000);

});

App.initializeSettingsView = function(){
  new App.SettingsView();
};

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

    // Search initialization
    App.searchResults = new App.SearchResults();
    new App.SearchResultsView({ collection: App.searchResults });
    new App.SearchView();


  }, function(e){
    console.warn('error: ', e);
  });
};
