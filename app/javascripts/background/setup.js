/*
 * Authors:       Jamie Dyer (http://kernowsoul.com)
 * Last changed:  2012-06-11
 */

/*global App: false, Filer: false, webkitNotifications: false */

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
          App.initializeArticles();
        });
      }else{

        // Settings have been fetched so we can initialize the articles
        App.initializeArticles();
      }
    }
  });

  // Temporary message listening code
  // currently there is no event for when the app window is closed so we get the main app to send a message to
  // the background process every 60 seconds telling it to stay paused. There should be an onSuspend event at
  // some point which can be used instead of this code
  chrome.extension.onMessage.addListener(
    function(message, sender, sendResponse) {
      if(message == 'pause'){
        console.log('Calling stop processing from message handler');
        // Stop processing new articles, but set to automatically resume in 70 seconds
        App.articles.stopProcessing(90000);
      }
  });
});

App.initializeArticles = function(){
  // initialize filer
  App.filer = new Filer();
  App.filer.init({persistent: true, size: 1024 * 1024}, function(fs) {
    App.filer.size = 10485760; // set the file size limit to 10 mb

    App.articles = new App.Articles();
    new App.NotificationsView({ collection: App.articles });
    App.articles.fetch({
      success: function(){
        console.log('start BG processing');
        App.articles.getFromFeed(App.googleFeed);
        App.articles.startProcessing();
      }
    });
  }, function(e){
    console.warn('error: ', e);
  });
};
