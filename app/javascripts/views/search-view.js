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
    
    $("#search_form").submit(function(){
      self.performSearch($("#search_term").val());
      
      return false;
    });
  },

  events: {
    "click": "toggleSearch"
  },

  toggleSearch: function(){
    // Toggle body class to hide/show search
    $("body").toggleClass("search_triggered");
    
    // If the search has been triggered, focus on the input
    if($("body").hasClass("search_triggered")){ $("#search_term").focus(); }
  },

  performSearch: function(term){
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
