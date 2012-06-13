/*
 * Authors:       Jamie Dyer (http://kernowsoul.com), Chris Garrett (http://abstraktion.co.uk)
 * Last changed:  2012-06-11
 */

// setup the applications namespace
window.App = {};

jQuery("document").ready(function(){
  jQuery(window).scroll(function(){
    if(jQuery(this).scrollTop() > 0){
      jQuery("body").addClass("in_scroll");
    }else{
      jQuery("body").removeClass("in_scroll");
    }
  });
});

jQuery(window).load(function(){
  jQuery("#news_container").masonry({ isFitWidth: true });
  setTimeout(function(){ jQuery("body").addClass("news_loaded"); }, 900);
});