/*global App */

// ### Authors
// Jamie Dyer <http://kernowsoul.com>
// ### Last changed
// 2012-06-23

App.SearchView = Backbone.View.extend({
  initialize: function(){
    var self = this;

    this.setElement('#search_menu');

    // Trigger search on cmd+f
    $(window).bind("keyup", "f", function(){ self.toggleSearch(); });
  },

  events: {
    "click #search_trigger": "toggleSearch",
    "submit #search_form":   "performSearch"
  },

  exit_method: "close",

  toggleSearch: function(e){
    // Toggle body class to hide/show search
    $("body").toggleClass("search_triggered");

    $("#search_trigger").text(($("body").hasClass("search_triggered")) ? "*" : "s");

    // If the search has been triggered, focus on the input
    if($("body").hasClass("search_triggered")){
      $("#search_term").focus();
    }else{
      // when the search is closed show the main display again
      this.closeSearch();
    }
  },

  performSearch: function(term){
    $("body").removeClass("search_triggered");

    $("#search_trigger").text("s");

    $('#news_container').hide();
    $('#search_container').empty().show();
    App.searchResults.getFromFeed(this.$('#search_term').val(), App.googleFeed);
    return false;
  },

  closeSearch: function(){
    $('#news_container').show();
    $('#search_container').hide();
  }
});
