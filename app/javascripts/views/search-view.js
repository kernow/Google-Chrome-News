/*
 * Authors:       Jamie Dyer (http://kernowsoul.com)
 * Last changed:  2012-06-11
 */

/*global App: false */

App.SearchView = Backbone.View.extend({
  initialize: function(){ 
    var self = this;
    
    self.setElement('#search_trigger'); 
    
    // Trigger search on cmd+f
    $(window).bind("keyup", "f", function(){ self.toggleSearch(); });
  },

  events: {
    "click": "toggleSearch",
    // TODO add event to catch form submit and pass to performSearch
  },

  toggleSearch: function(){
    // Toggle body class to hide/show search
    $("body").toggleClass("search_triggered");
    
    // If the search has been triggered, focus on the input
    if($("body").hasClass("search_triggered")){ $("#search_term").focus(); }
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
