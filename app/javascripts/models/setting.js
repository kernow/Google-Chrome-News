/*
 * Authors:       Jamie Dyer (http://kernowsoul.com)
 * Last changed:  2012-06-12
 */

/*global App: false */

/*
 * Setting Model
 * fields: categories [ 'business', 'world' ] etc.
 */

App.Settings = Backbone.Model.extend({

  initialize: function(){
    var self = this;
    this.syncStore = chrome.storage.sync;
    chrome.storage.onChanged.addListener(function(changes, namespace){ self.onSyncDataChange(changes, namespace); });
  },

  addCategory: function(category){
    var categories = this.get('categories');
    categories.push(category);
    // Save the categories and call uniq on the array to make sure there are no duplicates
    this.save({ "categories" : _.uniq(categories) });
    // TODO optimiseation, we only need to grab articles from the category thats just been added
    App.articles.getFromFeed(App.googleFeed, category);
  },

  removeCategory: function(category){
    // Remove the category from the array and save it
    var categories = _.without(this.get('categories'), category);
    this.save({ "categories" : categories });
    // remove the articles from the category that is no longer displayed
    App.articles.removeWithCategory(category);
  },

  onSyncDataChange: function(changes, namespace){
    console.log('change called', arguments);
    if (namespace == 'sync' && changes.categories) {
      console.log('new values: ', changes.categories.newValue);
      // set the new values into the backbone model

      // only update the backbone model if there are changes to be made
      if(this.get('categories') != changes.categories.newValue){
        console.log('saving changes to backbone');
        // set the changes but no need to save them as they are already in the sync storage
        this.set({ 'categories': changes.categories.newValue });
      }
    }
  },

  sync: function(method, model, options){
    console.log('models sync called', method, model, options);
    var resp;
    var self = this;

    switch (method) {
      case "read":
        this.syncStore.get(null, function(items){
          if(chrome.extension.lastError){
            options.error(chrome.extension.lastError.message);
          }else{
            self.set(items);
            options.success();
          }
        });
        break;
      case "create":
      case "update":
        this.syncStore.set(model.attributes, function(){
          if(chrome.extension.lastError){
            options.error(chrome.extension.lastError.message);
          }else{
            options.success();
          }
        });
    }
  }

});
