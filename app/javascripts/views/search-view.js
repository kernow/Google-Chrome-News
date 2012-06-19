/*
 * Authors:       Jamie Dyer (http://kernowsoul.com)
 * Last changed:  2012-06-11
 */

/*global App: false */

App.SearchView = Backbone.View.extend({
  initialize: function(){
    this.setElement('#search_trigger');
  },

  events: {
    "click": "openSearch"
    // TODO add event to catch form submit and pass to performSearch
    // TODO add event to catch click on close button and pass to closeSearch
  },

  openSearch: function(){
    console.log('opening the search');
    // TODO add code for rendering/showing the search form here
  },

  performSearch: function(){
    $('#news_container').hide();
    $('#search_container').empty().show();
    // TODO get the query from the search field
    App.searchResults.getFromFeed('apple computers', App.googleFeed);
  },

  closeSearch: function(){
    $('#news_container').show();
    $('#search_container').hide();
  }
});
